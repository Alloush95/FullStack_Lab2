import React, { useState, useEffect } from 'react';

// EmployeeTable component to display the last 5 employees in a table
export default function EmployeeTable() {

    // State variables to store the employees, sort column and sort order
    const [employees, setEmployees] = useState([]);
    const [sortBy, setSortBy] = useState('Employee_ID');
    const [sortOrder, setSortOrder] = useState('asc');

    // Fetch data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const lastFiveEmployees = data.slice(-5); // Get the last 5 employees 
                setEmployees(lastFiveEmployees);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set interval to fetch data every minute
        const intervalId = setInterval(fetchData, 60000); // 60000 milliseconds = 1 minute

        // Clean up function to clear the interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Function to sort the employees by a column

    const sortByColumn = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };
// Sort the employees based on the sort column and order
    const sortedEmployees = [...employees].sort((a, b) => {
        const columnA = a[sortBy];
        const columnB = b[sortBy];
        let comparison = 0;
        if (columnA > columnB) {
            comparison = 1;
        } else if (columnA < columnB) {
            comparison = -1;
        }
        return sortOrder === 'asc' ? comparison : -comparison; // Reverse the comparison for descending order
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className='bg-gray-50'>
                        <tr className='text-red-600'>
                            <th className="border px-4 py-2" onClick={() => sortByColumn('Employee_ID')}>
                                Employee ID {sortBy === 'Employee_ID' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="border px-4 py-2" onClick={() => sortByColumn('Employee_name')}>
                                Employee Name {sortBy === 'Employee_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="border px-4 py-2" onClick={() => sortByColumn('Project_name')}>
                                Project Name {sortBy === 'Project_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="border px-4 py-2" onClick={() => sortByColumn('Start_date')}>
                                Start Date {sortBy === 'Start_date' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployees.map((data) => {
                            return (
                                <tr key={data.Employee_ID}>
                                    <td className="border px-4 py-2">{data.Employee_ID}</td>
                                    <td className="border px-4 py-2">{data.Employee_name}</td>
                                    <td className="border px-4 py-2">{data.Project_name}</td>
                                    <td className="border px-4 py-2">{data.Start_date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
