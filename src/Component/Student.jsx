import React, { useEffect, useState, useContext } from 'react';
import { StudentContext } from '../context/StudentContext';
import DynamicTable from './DynamicTable';
import Pagination from './Pagination';
import DynamicForm from './DynamicForm';

function Student() {
  const { students, addStudent, deleteStudent, updateStudent } = useContext(StudentContext);
  const [showAddOverlay, setShowAddOverlay] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Calculate the index range for the current page
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddStudent = (newStudent) => {
    const id = students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 1;
    addStudent({ ...newStudent, id });
    setShowAddOverlay(false);
  };

  const handleEditStudent = (updatedStudent) => {
    updateStudent(updatedStudent);
    setShowEditOverlay(false);
    setCurrentStudent(null);
  };

  useEffect(() => {
    if (students.length <= studentsPerPage) {
      setCurrentPage(1);
    }
  }, [students.length]);

  const handleDelete = (id) => {
    deleteStudent(id);
  };

  const handleView = (student) => {
    // Close the edit overlay if it's open
    if (showEditOverlay) {
      setShowEditOverlay(false);
      setCurrentStudent(null);
    }
    // Set the current student to view or hide the view overlay if the same student is clicked
    setCurrentStudent(currentStudent && currentStudent.id === student.id ? null : student);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setShowEditOverlay(true);
  };

  const studentFields = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'DOB', key: 'DOB', type: 'date' },
    { label: 'Course', key: 'course' },
    { label: 'Branch', key: 'branch' },
    { label: 'Year', key: 'year' },
  ];
  const studentField = [
    {label: 'id', key: `id`},
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email', type: 'email' },
  
  ];

  return (
    <div className="m-10">
      <button
        onClick={() => setShowAddOverlay(true)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Student
      </button>

      {/* Overlay for Adding Student */}
      {showAddOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Student</h2>
            <DynamicForm
              fields={studentFields}
              onSubmit={handleAddStudent}
              onCancel={() => setShowAddOverlay(false)}
            />
          </div>
        </div>
      )}

      {/* Overlay for Editing Student */}
      {showEditOverlay && currentStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>
            <DynamicForm
              fields={studentFields}
              onSubmit={handleEditStudent}
              onCancel={() => setShowEditOverlay(false)}
              initialValues={currentStudent}
            />
          </div>
        </div>
      )}

      {/* Dynamic Table */}
      <DynamicTable
        columns={studentField}
        data={currentStudents}
        handleView={handleView}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        viewItem={currentStudent} // This remains to show the view overlay
      />
      {students.length > 5 && (
        <Pagination
          studentsPerPage={studentsPerPage}
          totalStudents={students.length}
          paginate={paginate}
        />
      )}

      {/* Overlay for Viewing Selected Student */}
      {currentStudent && !showEditOverlay && ( // Check if not in edit mode
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-violet-200 to-pink-200 shadow-md rounded-lg p-6 w-11/12 md:w-1/4 h-2/4 flex-col justify-evenly">
            <h3 className="text-2xl font-bold">{currentStudent.name}</h3>
            <p className="text-lg text-gray-600">{currentStudent.email}</p>
            <p className="text-lg text-gray-600">DOB: {currentStudent.DOB}</p>
            <p className="text-lg text-green-600">{currentStudent.status}</p>
            <p className="text-lg text-gray-600">Course: {currentStudent.course}</p>
            <p className="text-lg text-gray-600">Branch: {currentStudent.branch}</p>
            <p className="text-lg text-gray-600">Year: {currentStudent.year}</p>
            <button
              onClick={() => setCurrentStudent(null)}
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

