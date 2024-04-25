import mongoose from 'mongoose';

// Define schemas for Employee, Project Assignment, and Project collections
const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, unique: true },
  full_name: { type: String },
  email: { type: String },
  hashed_password: { type: String } 
});

const projectAssignmentSchema = new mongoose.Schema({
  employee_id: { type: String },
  project_code: { type: String },
  start_date: { type: Date }
});

const projectSchema = new mongoose.Schema({
  project_code: { type: String, unique: true },
  project_name: { type: String },
  project_description: { type: String }
}
  
);

// Create models from schemas
const Employee = mongoose.model('Employee', employeeSchema);
const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema);
const Project = mongoose.model('Project', projectSchema);
export { Employee, ProjectAssignment, Project };
