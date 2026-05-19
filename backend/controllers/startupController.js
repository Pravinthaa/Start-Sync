const mongoose = require('mongoose');
const Startup = require('../models/Startup');

// Local in-memory DB fallback when MongoDB is offline
const MEMORY_STARTUPS = [
  {
    _id: "1",
    id: 1,
    name: "NeuralCart",
    logo: "🛒",
    tagline: "AI-Powered Smart E-Commerce Checkout",
    category: "Developer",
    stage: "Seed",
    description: "NeuralCart uses hyper-personalized ML modules to optimize retail shopping funnels and increase average cart values by 35%.",
    about: "NeuralCart is an e-commerce intelligence tool designed to sit directly in modern React web applications, integrating real-time recommendation matrices on-device.",
    roles: ["React Developer", "ML Engineer", "UI Designer"],
    skills: ["React", "Node.js", "ML Models"],
    compensation: "Equity + Stipend",
    workType: "Remote",
    applications: 18,
    founder: { name: "Arjun Sharma", avatar: "AS" }
  },
  {
    _id: "2",
    id: 2,
    name: "Solara",
    logo: "☀️",
    tagline: "Decentralized Green Energy Trading Platform",
    category: "Business",
    stage: "Pre-seed",
    description: "Solara enables microgrid owners to trade clean solar energy peer-to-peer using dynamic, decentralized smart contracts.",
    about: "Solara builds low-latency smart contracts connecting community microgrids to solar panel owners to streamline distributed energy production.",
    roles: ["Smart Contract Dev", "Solidity Architect", "Community Manager"],
    skills: ["Solidity", "Smart Contracts", "Marketing"],
    compensation: "Equity Only",
    workType: "Hybrid",
    applications: 7,
    founder: { name: "Arjun Sharma", avatar: "AS" }
  }
];

exports.createStartup = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      const newStartup = {
        _id: 'mock-sid-' + Math.random().toString(36).substring(2, 9),
        id: Math.floor(Math.random() * 1000) + 10,
        ...req.body,
        roles: req.body.roles || ["React Developer", "ML Engineer", "UI Designer"],
        skills: req.body.skills || ["React", "Node.js", "JavaScript"],
        logo: req.body.logo || "🚀",
        founder: req.user.id === 'mock-founder-id' ? { name: "Arjun Sharma", avatar: "AS" } : { name: req.user.name || "Arjun Sharma", avatar: "AS" },
        applicationsCount: 0,
        applications: 0
      };
      MEMORY_STARTUPS.push(newStartup);
      return res.status(201).json(newStartup);
    }

    const startup = new Startup({
      ...req.body,
      roles: req.body.roles || ["React Developer", "ML Engineer", "UI Designer"],
      skills: req.body.skills || ["React", "Node.js", "JavaScript"],
      logo: req.body.logo || "🚀",
      founder: req.user.id
    });
    const savedStartup = await startup.save();
    res.status(201).json(savedStartup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStartups = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      let filtered = [...MEMORY_STARTUPS];
      if (req.query.category && req.query.category !== 'All') {
        filtered = filtered.filter(s => s.category.toLowerCase().includes(req.query.category.toLowerCase()));
      }
      if (req.query.stage && req.query.stage !== 'All') {
        filtered = filtered.filter(s => s.stage === req.query.stage);
      }
      if (req.query.workType && req.query.workType !== 'All') {
        filtered = filtered.filter(s => s.workType === req.query.workType);
      }
      if (req.query.compensation && req.query.compensation !== 'All') {
        filtered = filtered.filter(s => s.compensation === req.query.compensation);
      }
      if (req.query.search) {
        const s = req.query.search.toLowerCase();
        filtered = filtered.filter(item => item.name.toLowerCase().includes(s) || item.description.toLowerCase().includes(s));
      }
      return res.json(filtered);
    }

    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.stage) query.stage = req.query.stage;
    if (req.query.workType) query.workType = req.query.workType;
    if (req.query.compensation) query.compensation = req.query.compensation;
    
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const startups = await Startup.find(query).populate('founder', 'name avatar');
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStartupById = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      const startup = MEMORY_STARTUPS.find(s => s._id === req.params.id || String(s.id) === req.params.id);
      if (!startup) return res.status(404).json({ message: 'Startup not found' });
      return res.json(startup);
    }

    const startup = await Startup.findById(req.params.id).populate('founder', 'name avatar');
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
