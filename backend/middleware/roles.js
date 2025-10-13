const jwt = require('jsonwebtoken');

module.exports = function (allowedRoles = []) {
  return function (req, res, next) {
    //  Step 1: Verify JWT
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    //  Step 2: Check role
    const role = req.user?.role;
    if (!role) {
      return res.status(403).json({ message: 'No role found' });
    }

    if (allowedRoles.length && !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};
