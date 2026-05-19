require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const startupRoutes = require('./routes/startupRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.io for Real-Time Messaging and Notifications
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('sendMessage', (data) => {
    io.to(data.receiverId).emit('newMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/startsync';

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 1500 })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error. Starting in offline/local mock fallback mode:', err.message);
  });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
