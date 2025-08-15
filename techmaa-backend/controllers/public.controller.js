const Application = require('../models/application.model');
const Contact = require('../models/contact.model');
const Newsletter = require('../models/newsletter.model');
const { nanoid } = require('nanoid');

// --- Form Handlers ---

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'You are already subscribed!' });
    }
    await new Newsletter({ email }).save();
    res.status(201).json({ message: 'Thank you for subscribing!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};

exports.handleContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    await new Contact(req.body).save();
    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};

// --- Application Handlers ---

exports.createApplication = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required.' });
    }
    const applicationId = `TMAI-${nanoid(4).toUpperCase()}-${nanoid(4).toUpperCase()}`;
    const newApplication = new Application({
      ...req.body,
      resumePath: req.file.path,
      applicationId: applicationId
    });
    await newApplication.save();
    res.status(201).json({ 
      message: 'Application submitted successfully!',
      applicationId: applicationId
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};

exports.getApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findOne({ applicationId: req.params.id.toUpperCase() });
    if (!application) {
      return res.status(404).json({ message: 'Application ID not found.' });
    }
    res.status(200).json({
      status: application.status,
      jobTitle: application.jobRole,
      submissionDate: application.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};


// --- Mock Data for Dynamic Content ---

exports.getJobs = (req, res) => {
  const jobs = [
    { title: 'Senior AI Engineer', location: 'Remote', type: 'Full-time', summary: 'Design and implement machine learning models for enterprise-level applications.' },
    { title: 'Cloud Solutions Architect', location: 'Bengaluru, India', type: 'Full-time', summary: 'Lead the design of robust, scalable, and secure cloud infrastructure.' },
    { title: 'Data Scientist (Generative AI)', location: 'New York, USA', type: 'Hybrid', summary: 'Analyze large, complex data sets to identify trends and provide actionable insights.' },
  ];
  res.status(200).json(jobs);
};

exports.getPosts = (req, res) => {
    const posts = [
        { title: 'The Future of Generative AI in Enterprise', category: 'ARTIFICIAL INTELLIGENCE', excerpt: 'Discover how generative AI is moving beyond chatbots to revolutionize core business functions.', author: 'Jane Doe', publishedAt: '2025-08-14T12:00:00Z' },
        { title: '5 Strategies for Building a Data-Driven Culture', category: 'DATA & ANALYTICS', excerpt: 'A data-driven culture is essential for success. Here are five practical strategies to empower your teams.', author: 'John Smith', publishedAt: '2025-08-10T12:00:00Z' },
        { title: 'Navigating Multi-Cloud Complexity with FinOps', category: 'CLOUD TRANSFORMATION', excerpt: 'As organizations adopt multi-cloud, managing costs becomes critical. Learn how a FinOps approach can help.', author: 'Emily White', publishedAt: '2025-08-05T12:00:00Z' },
    ];
    res.status(200).json(posts);
};