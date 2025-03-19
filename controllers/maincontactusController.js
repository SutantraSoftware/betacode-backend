const nodemailer = require("nodemailer");
const Maincontactus = require("../models/Maincontactus.js");
const dotenv = require("dotenv");
const moment = require("moment-timezone"); // Import moment-timezone
dotenv.config();

const Mailgen = require("mailgen");

// Function to format date-time in IST (12-hour format)
const formatIST = (date) =>
  moment(date).tz("Asia/Kolkata").format("YYYY-MM-DD hh:mm A");

exports.sendEmail = async (req, res) => {
  const { name, email, phone, project, subject, message } = req.body;

  // Create a new contact form entry with local IST time
  const newMessage = new Maincontactus({
    name,
    email,
    phone,
    project,
    subject,
    message,
    createdAt: moment().tz("Asia/Kolkata").toDate(), // Store IST time
  });

  try {
    await newMessage.save(); // Save the contact form with IST timestamp
  } catch (err) {
    return res.status(500).send("Error saving to database: " + err.message);
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let MailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
      name: "Betacode",
      link: "http://betacode.com",
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
          { item: "Project", description: project },
          { item: "Subject", description: subject },
          { item: "Message", description: message },
          {
            item: "Submission Time",
            description: formatIST(newMessage.createdAt), // Format IST time in 12-hour format
          },
        ],
      },
    },
  };

  let mail = MailGenerator.generate(response);

  let information = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: "New Contact Form Submission",
    html: mail,
  };

  try {
    await transporter.sendMail(information);
    return res.status(201).json({
      msg: "Contact form submitted successfully",
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
    const MaincontactusForms = await Maincontactus.find();
    if (MaincontactusForms.length === 0) {
      return res
        .status(404)
        .json({ message: "No contact form submissions found." });
    }

    // Convert `createdAt` to IST (12-hour format)
    const formattedForms = MaincontactusForms.map((form) => ({
      ...form._doc,
      createdAt: formatIST(form.createdAt), // Format IST time in API response
    }));

    return res.status(200).json(formattedForms);
  } catch (err) {
    console.error("Error fetching contact forms:", err);
    return res
      .status(500)
      .json({ error: "Error fetching contact forms: " + err.message });
  }
};
