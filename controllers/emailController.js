const nodemailer = require("nodemailer");
const Contactform = require("../models/Contactform.js");
const dotenv = require("dotenv");
const moment = require("moment-timezone");
dotenv.config();

const Mailgen = require("mailgen");

const formatIST = (date) =>
  moment(date).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

exports.sendEmail = async (req, res) => {
  const { name, email, phone, service } = req.body;

  const newMessage = new Contactform({
    name,
    email,
    phone,
    service,
    createdAt: moment().tz("Asia/Kolkata").toDate(),
  });

  try {
    await newMessage.save();
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
          { item: "Service", description: service },
          {
            item: "Submission Time",
            description: formatIST(newMessage.createdAt),
          },
        ],
      },
    },
  };

  let mail = MailGenerator.generate(response);

  let information = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: "New Form Submission",
    html: mail,
  };

  try {
    await transporter.sendMail(information);
    return res.status(201).json({
      msg: "Enquiry form submitted successfully",
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
      return res
        .status(404)
        .json({ message: "No Enquiry form submissions found." });
    }

    const formattedForms = contactForms.map((form) => ({
      ...form._doc,
      createdAt: moment(form.createdAt)
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD hh:mm A"),
    }));

    return res.status(200).json(formattedForms);
  } catch (err) {
    console.error("Error fetching Enquiry forms:", err);
    return res
      .status(500)
      .json({ error: "Error fetching Enquiry forms: " + err.message });
  }
};
