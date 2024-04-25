import { Employee, ProjectAssignment, Project } from "../models/models.js";
// get tabele data
export const getEmployees = async (req, res) => {
    try {
        // Perform aggregation
        let aggregatedData = await ProjectAssignment.aggregate([
            {
                $lookup: {
                    from: "employees",
                    localField: "employee_id",
                    foreignField: "employee_id",
                    as: "employee"
                }
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "project_code",
                    foreignField: "project_code",
                    as: "project"
                }
            },
            {
                $unwind: "$employee"
            },
            {
                $unwind: "$project"
            },
            {
                $project: {
                    Employee_ID: "$employee.employee_id",
                    Employee_name: "$employee.full_name",
                    Project_name: "$project.project_name",
                    Start_date: "$start_date"
                }
            }
        ]);

        // Send the aggregated data as JSON response
        res.json(aggregatedData);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};



// Add a new employee
export const addEmployee = async (req, res) => {
    console.log(req.body, "req.body");
    try {
        // Create a new employee document
        const newEmployee = new Employee(req.body);
        await newEmployee.save();// Save the new employee document
        console.log(newEmployee, "newEmployee");
        res.status(201).json(newEmployee);
        
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Add a new addProjectAssignment
export const addProjectAssignment = async (req, res) => {
    try {
        // Create a new project document
        const newProject = new ProjectAssignment(req.body);
        await newProject.save();// Save the new project document
        res.status(201).json(newProject);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// addProject 
export const addProject = async (req, res) => {
    try {
        // Create a new project document
        const newProject = new Project(req.body);
        await newProject.save();// Save the new project document
        res.status(201).json(newProject);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}