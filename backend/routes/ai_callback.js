const express = require('express');
const router = express.Router();
const Parcel = require('../models/Parcel');

// AI microservice can POST results here to persist analysis
router.post('/callback', async (req, res) => {
  try {
    const { parcelId, result } = req.body;
    if (!parcelId || !result) return res.status(400).json({ message:'Missing parcelId or result' });
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) return res.status(404).json({ message:'Parcel not found' });
    parcel.analysisHistory.push(result);
    parcel.riskScore = result.riskScore || parcel.riskScore;
    parcel.degradationTypes = result.degradationTypes || parcel.degradationTypes;
    await parcel.save();
    res.json({ success:true });
  } catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
