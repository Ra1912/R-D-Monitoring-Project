import nodemailer from "nodemailer";

export function checkDiscrepancies(expected, actual) {
  let diffs = [];
  for (let key in expected) {
    if (expected[key] !== actual[key]) {
      diffs.push({ field: key, expected: expected[key], actual: actual[key] });
    }
  }
  return diffs;
}

export async function sendEmailAlert(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  });
}
