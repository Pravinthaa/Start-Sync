const mongoose = require('mongoose');
const Application = require('../models/Application');
const Startup = require('../models/Startup');

// Local in-memory DB fallback when MongoDB is offline
const MEMORY_APPLICATIONS = [
  {
    _id: "app-1",
    startup: { _id: "1", name: "NeuralCart", logo: "🛒", tagline: "AI-Powered Smart E-Commerce Checkout", category: "Developer" },
    applicant: { _id: "mock-collab-id", name: "Alex Johnson", email: "collaborator@startsync.io", skills: ["React", "Node.js", "TypeScript", "MongoDB"], avatar: "AJ" },
    founder: { _id: "mock-founder-id", name: "Arjun Sharma", avatar: "AS" },
    role: "React Developer",
    coverMessage: "I would love to help you build the NeuralCart smart checkout. I have 3 years of React experience.",
    status: "pending",
    createdAt: new Date().toISOString()
  }
];

exports.applyToStartup = async (req, res) => {
  try {
    const { startupId, role, coverMessage, portfolioLinks, resumeLink, optionalNote } = req.body;

    const isDbConnected = mongoose.connection.readyState === 1;
    const isMock = !isDbConnected || (req.user && req.user.isMock) || !mongoose.Types.ObjectId.isValid(req.user.id) || !mongoose.Types.ObjectId.isValid(startupId);
    if (isMock) {
      const newApp = {
        _id: 'mock-appid-' + Math.random().toString(36).substring(2, 9),
        startup: startupId,
        applicant: req.user.id,
        founder: "mock-founder-id",
        role,
        coverMessage,
        portfolioLinks,
        resumeLink,
        optionalNote,
        status: "pending",
        createdAt: new Date().toISOString()
      };
      MEMORY_APPLICATIONS.push(newApp);
      try {
        const { createNotificationInternal } = require('./notificationController');
        await createNotificationInternal(
          "mock-founder-id",
          'application',
          'New Application Received',
          `${req.user.name || 'Alex Johnson'} applied for the ${role} role.`
        );
      } catch (e) {}
      return res.status(201).json(newApp);
    }

    const startup = await Startup.findById(startupId);
    if (!startup) return res.status(404).json({ message: 'Startup not found' });

    const application = new Application({
      startup: startupId,
      applicant: req.user.id,
      founder: startup.founder,
      role,
      coverMessage,
      portfolioLinks,
      resumeLink,
      optionalNote
    });

    await application.save();
    startup.applicationsCount += 1;
    await startup.save();

    try {
      const { createNotificationInternal } = require('./notificationController');
      await createNotificationInternal(
        startup.founder,
        'application',
        'New Application Received',
        `${req.user.name || 'A collaborator'} applied for the ${role} role at ${startup.name}.`
      );
    } catch (notifErr) {
      console.warn("Failed to create application notification:", notifErr.message);
    }

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    const isMock = !isDbConnected || (req.user && req.user.isMock) || !mongoose.Types.ObjectId.isValid(req.user.id);
    if (isMock) {
      // Return memory apps populated with mock structures
      return res.json(MEMORY_APPLICATIONS.map(app => ({
        ...app,
        startup: typeof app.startup === 'object' ? app.startup : { _id: app.startup, name: "NeuralCart", logo: "🛒", tagline: "AI Smart Checkout", category: "Developer" },
        founder: typeof app.founder === 'object' ? app.founder : { _id: app.founder, name: "Arjun Sharma", avatar: "AS" }
      })));
    }

    const applications = await Application.find({ applicant: req.user.id })
      .populate('startup', 'name logo tagline category')
      .populate('founder', 'name avatar');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStartupApplications = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    const isMock = !isDbConnected || (req.user && req.user.isMock) || !mongoose.Types.ObjectId.isValid(req.user.id);
    if (isMock) {
      return res.json(MEMORY_APPLICATIONS.map(app => ({
        ...app,
        applicant: typeof app.applicant === 'object' ? app.applicant : { _id: app.applicant, name: "Alex Johnson", email: "collaborator@startsync.io", skills: ["React", "Node.js"], avatar: "AJ" },
        startup: typeof app.startup === 'object' ? app.startup : { _id: app.startup, name: "NeuralCart" }
      })));
    }

    const applications = await Application.find({ founder: req.user.id })
      .populate('applicant', 'name email skills avatar portfolio')
      .populate('startup', 'name');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const isDbConnected = mongoose.connection.readyState === 1;
    const isMock = !isDbConnected || (req.user && req.user.isMock) || !mongoose.Types.ObjectId.isValid(req.user.id);
    if (isMock) {
      const application = MEMORY_APPLICATIONS.find(app => app._id === req.params.id);
      if (!application) return res.status(404).json({ message: 'Application not found' });
      application.status = status;
      try {
        const { createNotificationInternal } = require('./notificationController');
        createNotificationInternal(
          application.applicant?._id || application.applicant,
          'application',
          `Application ${status.charAt(0).toUpperCase() + status.slice(1)}`,
          `NeuralCart has ${status} your application for the ${application.role || 'Collaborator'} role.`
        );
      } catch (e) {}
      return res.json(application);
    }

    const application = await Application.findById(req.params.id).populate('startup');
    
    if (!application) return res.status(404).json({ message: 'Application not found' });
    if (application.founder.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    application.status = status;
    await application.save();

    try {
      const { createNotificationInternal } = require('./notificationController');
      const startupName = application.startup?.name || 'a startup';
      await createNotificationInternal(
        application.applicant,
        'application',
        `Application ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        `${startupName} has ${status} your application for the ${application.role} role.`
      );
    } catch (notifErr) {
      console.warn("Failed to create application status notification:", notifErr.message);
    }

    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
