const functions = require("firebase-functions");
const admin = require("firebase-admin");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

admin.initializeApp();

const mailgun = new Mailgun(formData);

exports.sendContactEmail = functions
  .runWith({ secrets: ["MAILGUN_API_KEY", "MAILGUN_DOMAIN", "MAILGUN_REGION"] })
  .https.onCall(async (data, context) => {
  const { name, email, message } = data;

  // Basic validation
  if (!name || !email || !message) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required fields."
    );
  }

  const mgKey = (process.env.MAILGUN_API_KEY || "").trim();
  const mgDomain = (process.env.MAILGUN_DOMAIN || "").trim();
  const mgRegion = (process.env.MAILGUN_REGION || "US").trim();

  if (!mgKey || !mgDomain) {
    console.error("Missing Mailgun secrets: KEY=" + (mgKey ? "set" : "MISSING") + ", DOMAIN=" + (mgDomain ? "set" : "MISSING"));
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Email service is not properly configured."
    );
  }

  const client = mailgun.client({
    username: "api",
    key: mgKey,
    url: mgRegion === "EU" ? "https://api.eu.mailgun.net" : "https://api.mailgun.net"
  });

  console.log(`Sending email via ${mgDomain} (Region: ${mgRegion})`);

  const messageData = {
    from: `Genesis Contact Form <noreply@${mgDomain}>`,
    to: ["kevindclarke@gmail.com"],
    subject: "New Message from Genesis Contact Form",
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    "h:Reply-To": email
  };

  try {
    const result = await client.messages.create(mgDomain, messageData);
    console.log("Mailgun Success:", result);
    return { success: true };
  } catch (error) {
    console.error("Mailgun Detailed Error:", {
      status: error.status,
      message: error.message,
      details: error.details,
      domain: mgDomain,
      region: mgRegion
    });
    throw new functions.https.HttpsError(
      "internal",
      `Mailgun error: ${error.message} (${error.status})`
    );
  }
});
