const Project = require('../models/Project');
const Parcel = require('../models/Parcel');
const Joi = require('joi');

const projectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow(''),
  parcelId: Joi.string().optional(),
  fundingNeeded: Joi.number().min(0).required()
});

exports.createProject = async (req, res, next) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const { title, description, parcelId, fundingNeeded } = value;
    let parcel = null;
    if (parcelId) {
      parcel = await Parcel.findById(parcelId);
      if (!parcel) return res.status(400).json({ message: 'Parcel not found' });
    }
    const project = new Project({ title, description, parcel: parcel?._id, owner: req.user.id, fundingNeeded });
    await project.save();
    res.json(project);
  } catch (err) { next(err); }
};

exports.listProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('parcel').populate('owner','name');
    res.json(projects);
  } catch (err) { next(err); }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('parcel').populate('owner','name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { next(err); }
};

exports.getMyProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).populate('parcel');
    res.json(projects);
  } catch (err) { next(err); }
};

exports.fundProject = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid funding amount' });
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.status !== 'open') return res.status(400).json({ message: 'Project not open for funding' });
    project.fundingRaised += amount;
    if (project.fundingRaised >= project.fundingNeeded) {
      project.status = 'funded';
    }
    await project.save();
    res.json(project);
  } catch (err) { next(err); }
};

exports.closeProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    project.status = 'closed';
    await project.save();
    res.json(project);
  } catch (err) { next(err); }
};  
// updateProject, deleteProject
    exports.updateProject = async (req, res, next) => {
      try {
        const { title, description, fundingNeeded } = req.body;
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        if (project.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
        if (title) project.title = title;
        if (description) project.description = description;
        if (fundingNeeded && fundingNeeded >= project.fundingRaised) project.fundingNeeded = fundingNeeded;
        await project.save();
        res.json(project);
      }      
        catch (err) { next(err); }                          
    };  
    exports.deleteProject = async (req, res, next) => {
      try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        if (project.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
        await project.remove();
        res.json({ message: 'Project deleted' });
      } catch (err) { next(err); }
    };  
// Additional functions like updateProject, deleteProject can be added similarly