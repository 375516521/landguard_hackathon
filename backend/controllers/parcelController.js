const Parcel = require('../models/Parcel');
const axios = require('axios');
const Joi = require('joi');

const parcelSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().allow(''),
  geojson: Joi.object().required(),
  country: Joi.string().optional(),
  areaHectares: Joi.number().optional()
});

exports.createParcel = async (req, res, next) => {
  try {
    const { error, value } = parcelSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const { name, description, geojson, country, areaHectares } = value;
    const parcel = new Parcel({ owner: req.user.id, name, description, geojson, country, areaHectares });
    await parcel.save();
    // trigger AI analysis asynchronously; if AI service unavailable, ignore error
    try {
      axios.post(process.env.AI_SERVICE_URL || 'http://localhost:5001/analyze', { parcelId: parcel._id, geojson }, { timeout: 20000 })
        .then(async (resp)=>{
          if (resp.data && resp.data.result){
            parcel.analysisHistory.push(resp.data.result);
            parcel.riskScore = resp.data.result.riskScore || parcel.riskScore;
            parcel.degradationTypes = resp.data.result.degradationTypes || parcel.degradationTypes;
            await parcel.save();
          }
        }).catch(err => console.warn('AI analysis call failed', err.message));
    } catch(e){ console.warn('AI trigger failed', e.message); }
    res.json(parcel);
  } catch (err) { next(err); }
};

exports.getMyParcels = async (req, res, next) => {
  try {
    const parcels = await Parcel.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(parcels);
  } catch (err) { next(err); }
};

exports.getParcel = async (req, res, next) => {
  try {
    const parcel = await Parcel.findById(req.params.id).populate('owner','name email');
    if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
    res.json(parcel);
  } catch (err) { next(err); }
};

exports.listParcels = async (req, res, next) => {
  try {
    // public list for marketplace/browse
    const { country, minRisk } = req.query;
    const q = {};
    if (country) q.country = country;
    if (minRisk) q.riskScore = { $gte: Number(minRisk) };
    const parcels = await Parcel.find(q).limit(100).sort({ riskScore: -1 });
    res.json(parcels);
  } catch (err) { next(err); }
};
 exports.deleteParcel = async (req, res, next) => {
   try {
     const parcel = await Parcel.findById(req.params.id);
     if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
     if (parcel.owner.toString() !== req.user.id && req.user.role !== 'admin') {
       return res.status(403).json({ message: 'Not authorized to delete this parcel' });
     }
     await parcel.remove();
     res.json({ message: 'Parcel deleted' });
   } catch (err) { next(err); }
 };

// Admin: list all parcels
exports.adminListParcels = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    const parcels = await Parcel.find().populate('owner','name email').sort({ createdAt: -1 }).limit(500);
    res.json(parcels);
  } catch (err) { next(err); }
};      
// Admin: update any parcel
exports.adminUpdateParcel = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    const { name, description, country, areaHectares } = req.body;
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
    if (name) parcel.name = name;
    if (description) parcel.description = description;
    if (country) parcel.country = country;
    if (areaHectares) parcel.areaHectares = areaHectares;
    await parcel.save();
    res.json(parcel);
  } catch (err) { next(err); }
};      
// Admin: trigger re-analysis of parcel
exports.adminReanalyzeParcel = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
    // trigger AI analysis
    try {
      const resp = await axios.post(process.env.AI_SERVICE_URL || 'http://localhost:5001/analyze', { parcelId: parcel._id, geojson: parcel.geojson }, { timeout: 20000 });
      if (resp.data && resp.data.result){
        parcel.analysisHistory.push(resp.data.result);
        parcel.riskScore = resp.data.result.riskScore || parcel.riskScore;
        parcel.degradationTypes = resp.data.result.degradationTypes || parcel.degradationTypes;
        await parcel.save();
        return res.json(parcel);
      } else {
        return res.status(500).json({ message: 'AI service returned no result' });
      }
    } catch(e){ 
      console.warn('AI re-analysis call failed', e.message); 
      return res.status(500).json({ message: 'AI re-analysis failed: ' + e.message });
    }
  } catch (err) { next(err); }
};  
// updateParcel - for owner to update name/description
exports.updateParcel = async (req, res, next) => {
  try {
    const { name, description, country, areaHectares } = req.body;
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
    if (parcel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this parcel' });
    }
    if (name) parcel.name = name;
    if (description) parcel.description = description;
    if (country) parcel.country = country;
    if (areaHectares) parcel.areaHectares = areaHectares;
    await parcel.save();
    res.json(parcel);
  } catch (err) { next(err); }
};  
// deleteParcel - for owner or admin to delete      
   exports.deleteParcel = async (req, res, next) => {
     try {
       const parcel = await Parcel.findById(req.params.id);
       if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
       if (parcel.owner.toString() !== req.user.id && req.user.role !== 'admin') {
         return res.status(403).json({ message: 'Not authorized to delete this parcel' });
       }
       await parcel.remove();
       res.json({ message: 'Parcel deleted' });
     } catch (err) { next(err); }
   };   
   