const nodemailer = require("nodemailer");

let transporter;
let warnedMissingConfig = false;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return null;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    // Some hosts (e.g. Render) resolve smtp.gmail.com to an IPv6 address but
    // have no outbound IPv6 route, failing with ENETUNREACH - force IPv4.
    family: 4,
  });
  return transporter;
}

// Fire-and-forget: never throws, never blocks the caller. A missing config or
// a failed send just gets logged, so email notifications can't break the
// actual submission flow they're attached to.
function notifyAdmin(subject, text) {
  const t = getTransporter();
  if (!t) {
    if (!warnedMissingConfig) {
      console.warn("[emailService] GMAIL_USER/GMAIL_APP_PASSWORD not set - skipping admin email notifications");
      warnedMissingConfig = true;
    }
    return;
  }

  const to = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.GMAIL_USER;
  t.sendMail({
    from: `"IE for Students" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
  })
    .then((info) => {
      console.log(`[emailService] Notification sent to ${to}: ${info.response}`);
    })
    .catch((err) => {
      console.error("[emailService] Failed to send notification:", err.message);
    });
}

module.exports = { notifyAdmin };
