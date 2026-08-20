/**
 * backend/src/routes/register.ts
 *
 * POST /api/register — handles overview registration form submissions.
 *
 * Validates fields: name, email, phone, program, status
 * Logs details to the console on success.
 */

import { Router, Request, Response } from "express";

const router = Router();

interface RegisterBody {
  name:    string;
  email:   string;
  phone:   string;
  program: string;
  status:  string;
}

// POST /api/register
router.post("/", async (req: Request, res: Response) => {
  const { name, email, phone, program, status } = req.body as RegisterBody;

  // ---- Validation ----
  if (!name?.trim()) {
    res.status(400).json({ message: "Name is required." });
    return;
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ message: "A valid email address is required." });
    return;
  }
  if (!phone?.trim()) {
    res.status(400).json({ message: "Phone number is required." });
    return;
  }
  if (!program?.trim()) {
    res.status(400).json({ message: "Program of interest is required." });
    return;
  }
  if (!status?.trim()) {
    res.status(400).json({ message: "Current status is required." });
    return;
  }

  // ---- Log submission ----
  console.log("\n🎓 New Education Program Registration");
  console.log("─────────────────────────────────────");
  console.log(`Name    : ${name}`);
  console.log(`Email   : ${email}`);
  console.log(`Phone   : ${phone}`);
  console.log(`Program : ${program}`);
  console.log(`Status  : ${status}`);
  console.log("─────────────────────────────────────\n");

  // Return success response to the client
  res.status(200).json({
    success: true,
    message: "Registration captured! We'll reach out with batch schedules soon.",
  });
});

export default router;
