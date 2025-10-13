const User = require('../models/User');
const Parcel = require('../models/Parcel');

exports.stats = async (req, res, next) => {
  try {
    const users = await User.countDocuments();
    const parcels = await Parcel.countDocuments();
    const avgRisk = await Parcel.aggregate([ { $group: { _id: null, avg: { $avg: '$riskScore' } } }]);
    res.json({ users, parcels, avgRisk: avgRisk[0]?.avg || 0 });
  } catch (err) { next(err); }
};
// Admin: list all users
exports.listUsers = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    const users = await User.find().select('-password').sort({ createdAt: -1 }).limit(500);
    res.json(users);
  } catch (err) { next(err); }
};  
// Admin: update any user
exports.updateUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    const { name, role, country, organization } = req.body;     
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (name) user.name = name;
    if (role) user.role = role;
    if (country) user.country = country;
    if (organization) user.organization = organization;
    await user.save();
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role, country: user.country, organization: user.organization });
  } catch (err) { next(err); }
};      

// Admin: delete any user
exports.deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
};  
// Admin: get any user
exports.getUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};      
        