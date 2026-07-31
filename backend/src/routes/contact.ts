/**
 * backend/src/routes/contact.ts
 *
 * POST /api/contact — handles contact form submissions from the frontend.
 *
 * Current behaviour:
 *   - Validates required fields (name, email, message)
 *   - Logs the submission to the console
 *   - Returns a 200 JSON response on success
 *
 * When you're ready to go live, replace the console.log with:
 *   Option A: Nodemailer — send an email notification
 *   Option B: Save to a database (MongoDB, PostgreSQL, etc.)
 *   Option C: Push to a CRM (HubSpot, Pipedrive, etc.) via their API
 *   Option D: Send to a Slack / Discord webhook for instant notifications
 *
 * Each option is outlined in a comment below.
 */

import { Router, Request, Response } from "express";

const router = Router();

// ---------------------------------------------------------------------------
// Type: Expected request body shape from the contact form
// ---------------------------------------------------------------------------
interface ContactBody {
  name:    string;
  email:   string;
  company: string;
  message: string;
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
router.post("/", async (req: Request, res: Response) => {
  const { name, email, company, message } = req.body as ContactBody;

  // ---- Validation ----
  if (!name?.trim()) {
    res.status(400).json({ message: "Name is required." });
    return;
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ message: "A valid email address is required." });
    return;
  }
  if (!message?.trim()) {
    res.status(400).json({ message: "Message is required." });
    return;
  }

  // ---- Log the submission (replace this section later) ----
  console.log("\n📬 New Contact Form Submission");
  console.log("─────────────────────────────");
  console.log(`Name   : ${name}`);
  console.log(`Email  : ${email}`);
  console.log(`Company: ${company || "—"}`);
  console.log(`Message: ${message}`);
  console.log("─────────────────────────────\n");

  /*
  ┌─────────────────────────────────────────────────────────────────────┐
  │  OPTION A — Nodemailer (send email)                                 │
  │  Install: npm install nodemailer @types/nodemailer                  │
  ├─────────────────────────────────────────────────────────────────────┤
  │                                                                     │
  │  import nodemailer from "nodemailer";                               │
  │                                                                     │
  │  const transporter = nodemailer.createTransport({                   │
  │    service: "gmail",  // or use SMTP config                         │
  │    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }│
  │  });                                                                │
  │                                                                     │
  │  await transporter.sendMail({                                       │
  │    from:    `"Vnertia Website" <${process.env.MAIL_USER}>`,         │
  │    to:      "hello@vnertia.com",                                    │
  │    subject: `New enquiry from ${name}`,                             │
  │    text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,         │
  │  });                                                                │
  │                                                                     │
  └─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────┐
  │  OPTION B — Save to MongoDB                                         │
  │  Install: npm install mongoose                                      │
  ├─────────────────────────────────────────────────────────────────────┤
  │                                                                     │
  │  await ContactModel.create({ name, email, company, message });      │
  │                                                                     │
  └─────────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────┐
  │  OPTION C — Slack webhook notification                              │
  ├─────────────────────────────────────────────────────────────────────┤
  │                                                                     │
  │  await fetch(process.env.SLACK_WEBHOOK_URL!, {                      │
  │    method: "POST",                                                  │
  │    body: JSON.stringify({ text: `New lead: ${name} (${email})` }),  │
  │  });                                                                │
  │                                                                     │
  └─────────────────────────────────────────────────────────────────────┘
  */

  // Return success response to the frontend
  res.status(200).json({
    success: true,
    message: "Message received! We'll be in touch within 24 hours.",
  });
});

export default router;
