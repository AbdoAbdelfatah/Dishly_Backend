import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"abdofatah410@gmail.com",
        pass:"mwhypmsyhmuggviq"
    },
    tls: {
    // ✅ Allow self-signed certificates if needed
    rejectUnauthorized: false,
  }
});

export async function sendMail({ to, subject, text }) {
  try {
    const info = await transporter.sendMail({
      from:"abdofatah410@gmail.com",
      to,
      subject,
      text
    });
    return info;
  } catch (err) {
    // Log and rethrow so caller can handle (e.g., continue without failing request)
    console.error("Mail send failed:", err);
    throw err;
  }
}