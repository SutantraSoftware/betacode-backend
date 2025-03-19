const nodemailer = require("nodemailer");
const Contactform = require("../models/Contactform.js");
const dotenv = require("dotenv");
dotenv.config();

const Mailgen = require("mailgen");
const moment = require("moment-timezone"); // Import moment-timezone

exports.sendEmail = async (req, res) => {
  const { name, email, phone, service } = req.body;

  // Create a new contact form entry with local time for 'createdAt'
  const newMessage = new Contactform({
    name,
    email,
    phone,
    service,
  });

  try {
    await newMessage.save(); // Save the contact form with the current local time
  } catch (err) {
    return res.status(500).send("Error saving to database: " + err.message);
  }

  let config = {
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true,
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenenrator = new Mailgen({
    theme: "cerberus",
    product: {
      name: "Betacode",
      link: "http://betacode.com,",
    },
  });

  let response = {
    body: {
      name: "Boss",
      intro: "Details",
      table: {
        data: [
          { item: "Mr/Mrs.", description: name },
          { item: "Mail", description: email },
          { item: "Number", description: phone },
          { item: "Service", description: service },
          {
            item: "Submission Time",
            description: moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"), // Format the local time for email
          },
        ],
      },
    },
  };

  let mail = MailGenenrator.generate(response);

  let information = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: "New Form Submission",
    html: mail,
  };

  try {
    await transporter.sendMail(information);
    return res.status(201).json({
      msg: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ error: "Error sending email: " + error.message });
  }
};


exports.getAllContactForms = async (req, res) => {
  try {
    const contactForms = await Contactform.find(); 
    if (contactForms.length === 0) {
      return res.status(404).json({ message: "No contact form submissions found." });
    }
    return res.status(200).json(contactForms);
  } catch (err) {
    console.error("Error fetching contact forms:", err);
    return res.status(500).json({ error: "Error fetching contact forms: " + err.message });
  }
};