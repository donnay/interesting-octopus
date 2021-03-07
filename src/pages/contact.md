---
title: Contact Us
subtitle: We are happy to hear what you think. Please let us know.
image: images/5.jpg
seo:
  title: Contact Us
  description: We are happy to hear what you think. Please let us know.
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Theme Style Guide
      keyName: property
    - name: 'og:description'
      value: We are happy to hear what you think. Please let us know.
      keyName: property
    - name: 'og:image'
      value: images/5.jpg
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Theme Style Guide
    - name: 'twitter:description'
      value: We are happy to hear what you think. Please let us know.
    - name: 'twitter:image'
      value: images/5.jpg
      relativeUrl: true
template: page
---

<form name="contact" method="post" data-netlify="true"  action="/success">
  <input type="hidden" name="form-name" value="contact" />

  <p>
    <label>Your Name: <input type="text" name="name" /></label>   
  </p>
  <p>
    <label>Your Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
