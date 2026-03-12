require 'nokogiri'
require 'json'
require 'find'

PUBLIC_DIR = 'public'
DOCS_DIRS = ['public/docs', 'public/blog']
OUTPUT_FILE = 'public/search-index.json'

index = []

DOCS_DIRS.each do |dir|
  next unless Dir.exist?(dir)
  
  Find.find(dir) do |path|
    next unless path =~ /\.html$/
    next if path =~ /404\.html$/ # Skip 404 page
    
    begin
      doc = Nokogiri::HTML(File.read(path))
      
      # Extract data
      title = doc.at_css('title')&.text || doc.at_css('h1')&.text || File.basename(path)
      description = doc.at_css('meta[name="description"]')&.[]('content') || ""
      
      # Clean up title
      title = title.gsub(/\s+/, ' ').strip
      
      # Get main content text (excluding nav, footer, scripts)
      content_node = doc.at_css('main') || doc.at_css('article') || doc.at_css('body')
      if content_node
        # Remove unwanted elements before extracting text
        clone = content_node.dup
        clone.css('script, style, nav, footer, .docs-nav').remove
        text_content = clone.text.gsub(/\s+/, ' ').strip[0..2000] # Cap size
      else
        text_content = ""
      end
      
      # Create relative URL
      url = path.sub(/^public/, '')
      
      index << {
        title: title,
        description: description,
        url: url,
        content: text_content
      }
      
      puts "Indexed: #{url}"
    rescue => e
      puts "Error indexing #{path}: #{e.message}"
    end
  end
end

File.write(OUTPUT_FILE, JSON.pretty_generate(index))
puts "\nSuccess! Indexed #{index.size} pages to #{OUTPUT_FILE}"
