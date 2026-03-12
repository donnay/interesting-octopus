const functions = require("firebase-functions");
const admin = require("firebase-admin");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

admin.initializeApp();

const mailgun = new Mailgun(formData);

exports.sendContactEmail = functions
  .runWith({ secrets: ["MAILGUN_API_KEY", "MAILGUN_DOMAIN"] })
  .https.onCall(async (data, context) => {
  const { name, email, message } = data;

  // Basic validation
  if (!name || !email || !message) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required fields."
    );
  }

  // Retrieve Mailgun credentials from secrets
  // We'll configure these using firebase functions:secrets:set
  const mgKey = process.env.MAILGUN_API_KEY;
  const mgDomain = process.env.MAILGUN_DOMAIN;

  if (!mgKey || !mgDomain) {
    console.error("Mailgun secrets not configured!");
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Email service is not properly configured."
    );
  }

  const client = mailgun.client({
    username: "api",
    key: mgKey,
  });

  const messageData = {
    from: `Genesis Contact Form <noreply@${mgDomain}>`,
    to: ["kevindclarke@gmail.com"], // Hardcoded recipient as requested previously
    subject: "New Message from Genesis Contact Form",
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    "h:Reply-To": email
  };

  try {
    await client.messages.create(mgDomain, messageData);
    return { success: true };
  } catch (error) {
    console.error("Mailgun Error:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to send email."
    );
  }
});
