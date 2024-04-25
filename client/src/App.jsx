import {BrowserRouter, Router, Route, Routes} from 'react-router-dom';
import React from 'react'
import EmployeeTable from './pages/EmployeeTable'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<EmployeeTable />} />

    </Routes>
    </BrowserRouter>

  )
}
