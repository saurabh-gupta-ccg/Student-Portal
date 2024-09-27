import React, { useState, useContext } from 'react';
import { StudentContext } from '../context/StudentContext';

function Student() {
  const { students, addStudent, deleteStudent } = useContext(StudentContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Active');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [DOB, setDOB] = useState('');
  const [showAddOverlay, setShowAddOverlay] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (name && email && DOB && status && course && branch && year) {
      const newStudent = {
        id: students.length + 1,
        name,
        email,
        DOB,
        status,
        course,
        branch,
        year,
      };
      addStudent(newStudent);
      setName('');
      setEmail('');
      setStatus('Active');
      setCourse('');
      setBranch('');
      setYear('');
      setDOB('');
      setShowAddOverlay(false); // Close overlay after adding student
    }
  };

  const handleDelete = (id) => {
    deleteStudent(id);
    if (viewStudent && viewStudent.id === id) {
      setViewStudent(null);
    }
  };

  const handleView = (student) => {
    setViewStudent(viewStudent && viewStudent.id === student.id ? null : student);
  };

  return (
    <div className="m-10">
      {/* Button to toggle Add Student Overlay */}
      <button
        onClick={() => setShowAddOverlay(true)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Student
      </button>

      {/* Overlay for Adding Student */}
      {showAddOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Add Student</h2>
            <form onSubmit={handleAdd}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter student name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter student email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">DOB</label>
                <input
                  type="date"
                  value={DOB}
                  onChange={(e) => setDOB(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Course</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter course"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter branch"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter year"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Student
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddOverlay(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table View */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">Name</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">Email</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">Status</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-2 border-b border-gray-300">{student.name}</td>
                <td className="px-4 py-2 border-b border-gray-300">{student.email}</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{student.status}</span>
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                    onClick={() => handleView(student)}
                  >
                    {viewStudent && viewStudent.id === student.id ? 'Hide' : 'View'}
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs ml-1"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay for Viewing Selected Student */}
      {viewStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
            <h3 className="text-lg font-bold">{viewStudent.name}</h3>
            <p className="text-sm text-gray-600">{viewStudent.email}</p>
            <p className="text-sm text-gray-600">DOB: {viewStudent.DOB}</p>
            <p className="text-sm text-green-600">{viewStudent.status}</p>
            <p className="text-sm text-gray-600">Course: {viewStudent.course}</p>
            <p className="text-sm text-gray-600">Branch: {viewStudent.branch}</p>
            <p className="text-sm text-gray-600">Year: {viewStudent.year}</p>
            <button
              onClick={() => setViewStudent(null)}
              className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;
