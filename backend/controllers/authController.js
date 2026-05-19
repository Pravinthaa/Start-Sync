const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// Local in-memory DB fallback when MongoDB is offline
const MEMORY_USERS = [
  {
    _id: "mock-founder-id",
    name: "Arjun Sharma",
    email: "founder@startsync.io",
    password: "", // Handled specially in login
    role: "Founder",
    bio: "SaaS founder & serial entrepreneur building next-gen developer productivity tools.",
    location: "Mumbai, India",
    linkedin: "linkedin.com/in/arjunsharma",
  },
  {
    _id: "mock-collab-id",
    name: "Alex Johnson",
    email: "collaborator@startsync.io",
    password: "",
    role: "Collaborator",
    bio: "Full-stack developer with 4 years of experience. Passionate about building products that solve real problems.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    github: "github.com/alexj",
    linkedin: "linkedin.com/in/alexj",
    portfolio: "alexj.dev",
    location: "Bangalore, India",
    availability: "20 hrs/week",
  }
];

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      const userExists = MEMORY_USERS.find(u => u.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: 'mock-uid-' + Math.random().toString(36).substring(2, 9),
        name,
        email,
        password: hashedPassword,
        phone,
        role,
        bio: "Full-stack developer. Passionate about building products that solve real problems.",
        skills: ["React", "Node.js", "TypeScript", "MongoDB"],
        github: "github.com/alexj",
        linkedin: "linkedin.com/in/alexj",
        portfolio: "alexj.dev",
        location: "Bangalore, India",
        availability: "20 hrs/week"
      };
      MEMORY_USERS.push(newUser);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id, newUser.role),
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name, email, password: hashedPassword, phone, role
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      const user = MEMORY_USERS.find(u => u.email === email);
      if (user) {
        // Special case for pre-seeded mocks with empty password
        if (user.password === "" || (await bcrypt.compare(password, user.password))) {
          return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
          });
        }
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      const user = MEMORY_USERS.find(u => u._id === req.user.id);
      if (user) {
        return res.json(user);
      }
      // If mock token was generic, grab the first user matching role or random
      const defaultUser = MEMORY_USERS.find(u => u.role === req.user.role) || MEMORY_USERS[0];
      return res.json(defaultUser);
    }

    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      const user = MEMORY_USERS.find(u => u._id === req.user.id) || MEMORY_USERS[0];
      if (user) {
        user.name = req.body.name || user.name;
        user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
        user.skills = req.body.skills !== undefined ? (typeof req.body.skills === 'string' ? req.body.skills.split(',').map(s => s.trim()) : req.body.skills) : user.skills;
        user.github = req.body.github !== undefined ? req.body.github : user.github;
        user.linkedin = req.body.linkedin !== undefined ? req.body.linkedin : user.linkedin;
        user.portfolio = req.body.portfolio !== undefined ? req.body.portfolio : user.portfolio;
        user.location = req.body.location !== undefined ? req.body.location : user.location;
        user.availability = req.body.availability !== undefined ? req.body.availability : user.availability;
        user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;

        return res.json(user);
      }
      return res.status(404).json({ message: 'User not found' });
    }

    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.skills = req.body.skills !== undefined ? (typeof req.body.skills === 'string' ? req.body.skills.split(',').map(s => s.trim()) : req.body.skills) : user.skills;
      user.github = req.body.github !== undefined ? req.body.github : user.github;
      user.linkedin = req.body.linkedin !== undefined ? req.body.linkedin : user.linkedin;
      user.portfolio = req.body.portfolio !== undefined ? req.body.portfolio : user.portfolio;
      user.location = req.body.location !== undefined ? req.body.location : user.location;
      user.availability = req.body.availability !== undefined ? req.body.availability : user.availability;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
