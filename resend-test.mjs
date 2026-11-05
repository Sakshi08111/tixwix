
import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: "Heyeve <onboarding@resend.dev>",
  to: ["clickifymedia111@gmail.com"],
  subject: "Heyeve - Email Delivery Test",
  html: `
    <h2>Welcome to Heyeve!</h2>
    <p>Our email service is working.</p>
  `,
});

if (error) {
  console.error("Email failed:", error);
} else {
  console.log("Email accepted:", data);
}
