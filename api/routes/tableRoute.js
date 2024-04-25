import express from 'express';
import {addEmployee, getEmployees, addProjectAssignment, addProject} from  '../controller/page.controller.js';



const router = express.Router();
// display all table data
router.get('/data', getEmployees);
// add new employee
router.post('/employees', addEmployee);
// add new project assignment
router.post('/project_assignments', addProjectAssignment);
// add new project
router.post('/project', addProject);

export default router;