const express = require('express');
const router = express.Router();
const rolesMiddleware = require('../middleware/roles');

// Protect this route so only "admin" role can access
router.get('/dashboard', rolesMiddleware(['admin']), (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}!` });
});

module.exports = router;
