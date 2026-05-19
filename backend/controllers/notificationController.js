const mongoose = require('mongoose');
const Notification = require('../models/Notification');

// Mock in-memory notifications for offline testing
const MEMORY_NOTIFICATIONS = [
  { _id: 'notif-1', type: 'application', title: 'Application Shortlisted', body: 'NeuralCart shortlisted your application for React Dev role', read: false, createdAt: new Date(Date.now() - 120000).toISOString() },
  { _id: 'notif-2', type: 'message', title: 'New Message', body: 'Lena Weber sent you a message about GreenTrack', read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: 'notif-3', type: 'startup', title: 'New Match Found', body: '3 new startups match your skills in React & TypeScript', read: true, createdAt: new Date(Date.now() - 10800000).toISOString() },
];

exports.getNotifications = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    const isMock = !isDbConnected || (req.user && req.user.isMock) || !mongoose.Types.ObjectId.isValid(req.user.id);
    if (isMock) {
      return res.json(MEMORY_NOTIFICATIONS);
    }

    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    const isMock = !isDbConnected || (req.user && req.user.isMock) || !mongoose.Types.ObjectId.isValid(req.user.id);
    if (isMock) {
      const notif = MEMORY_NOTIFICATIONS.find(n => n._id === req.params.id);
      if (notif) notif.read = true;
      return res.json(notif || { message: 'Notification not found' });
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { read: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    const isMock = !isDbConnected || (req.user && req.user.isMock) || !mongoose.Types.ObjectId.isValid(req.user.id);
    if (isMock) {
      MEMORY_NOTIFICATIONS.forEach(n => n.read = true);
      return res.json({ message: 'All marked as read', success: true });
    }

    await Notification.updateMany({ user: req.user.id, read: false }, { read: true });
    res.json({ message: 'All notifications marked as read', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to create notification in controllers
exports.createNotificationInternal = async (userId, type, title, body) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    const isMock = !isDbConnected || !mongoose.Types.ObjectId.isValid(userId);
    if (isMock) {
      MEMORY_NOTIFICATIONS.unshift({
        _id: 'notif-' + Math.random().toString(36).substring(2, 9),
        type,
        title,
        body,
        read: false,
        createdAt: new Date().toISOString()
      });
      return;
    }

    const notification = new Notification({ user: userId, type, title, body });
    await notification.save();
  } catch (err) {
    console.error('Failed to create notification internally:', err.message);
  }
};
