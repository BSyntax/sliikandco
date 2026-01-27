import asyncHandler from "express-async-handler";
import Contact from "../models/Contact.js";
import { sendContactEmail } from "../utils/emailService.js";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Create contact record in database
  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
  });

  if (contact) {
    // Attempt to send email notification (non-blocking for response)
    sendContactEmail({ name, email, phone, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } else {
    res.status(400);
    throw new Error("Invalid contact data");
  }
});
