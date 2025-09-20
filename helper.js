import nodemailer from "nodemailer";

// Compare submitted vs extracted values
export function checkDiscrepancies(submission, extracted) {
  const diffs = [];
  if (!submission || !extracted) return diffs;

  if (submission.progress_percentage &&
      extracted.progress_percentage &&
      Math.abs(submission.progress_percentage - extracted.progress_percentage) > 5) {
    diffs.push("Progress % mismatch");
  }

  return diffs;
}

// Email alert for discrepancies
export async function sendDiscrepancyAlert(projectId, diffs) {
  if (!process.env.EMAIL_USER) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Discrepancy Alert for Project ${projectId}`,
    text: `The following issues were found:\n${diffs.join("\n")}`,
  });
}

// Email alert for deadlines
export async function sendDeadlineAlert(projectId) {
  if (!process.env.EMAIL_USER) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Deadline Alert for Project ${projectId}`,
    text: `Project ${projectId} is past its deadline or due soon.`,
  });
}
