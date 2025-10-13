const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

// middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '15mb' }));

// routes
const authRoutes = require('./routes/auth');
const parcelRoutes = require('./routes/parcels');
const marketplaceRoutes = require('./routes/marketplace');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');
//const aiCallback = require('./routes/ai_callback');

app.use('/api/auth', authRoutes);
app.use('/api/parcels', parcelRoutes);
//app.use('/api/parcels', aiCallback); // callback from AI service
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// global error handlerm
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/landguard';

mongoose.connect(MONGO)
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log('Server running on', PORT));
  })
  .catch(err => { console.error('Mongo error', err); process.exit(1); });