import React, { useEffect, useState, useContext } from 'react';
import { TeacherContext } from '../context/TeacherContext';
import DynamicTable from './DynamicTable';
import Pagination from './Pagination';
import DynamicForm from './DynamicForm';

function Teacher() {
  const { teachers, addTeacher, deleteTeacher, updateTeacher } = useContext(TeacherContext);
  const [showAddOverlay, setShowAddOverlay] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;

  // Calculate the index range for the current page
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddTeacher = (newTeacher) => {
    const id = teachers.length > 0 ? Math.max(...teachers.map(teacher => teacher.id)) + 1 : 1;
    addTeacher({ ...newTeacher, id });
    setShowAddOverlay(false);
  };

  const handleEditTeacher = (updatedTeacher) => {
    updateTeacher(updatedTeacher);
    setShowEditOverlay(false);
    setCurrentTeacher(null);
  };

  useEffect(() => {
    if (teachers.length <= teachersPerPage) {
      setCurrentPage(1);
    }
  }, [teachers.length]);

  const handleDelete = (id) => {
    deleteTeacher(id);
  };

  const handleView = (teacher) => {
    // Close the edit overlay if it's open
    if (showEditOverlay) {
      setShowEditOverlay(false);
      setCurrentTeacher(null);
    }
    // Set the current teacher to view or hide the view overlay if the same teacher is clicked
    setCurrentTeacher(currentTeacher && currentTeacher.id === teacher.id ? null : teacher);
  };

  const handleEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setShowEditOverlay(true);
  };

  // Define the fields for the teacher form
  const teacherFields = [
    { label: 'Teachers_Name', key: 'name' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'Dept', key: 'department' },
    { label: 'Contact', key: 'contact',type:'number' },
  ];

  const teacherColumns = [
    { label: 'ID', key: 'id' },
    { label: 'Teachers_Name', key: 'name' },
    { label: 'Dept', key: 'department', type: 'string' },
  ];

  return (
    <div className="m-10">
      <button
        onClick={() => setShowAddOverlay(true)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Teacher
      </button>

      {/* Overlay for Adding Teacher */}
      {showAddOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Teacher</h2>
            <DynamicForm
              fields={teacherFields}
              onSubmit={handleAddTeacher}
              onCancel={() => setShowAddOverlay(false)}
            />
          </div>
        </div>
      )}

      {/* Overlay for Editing Teacher */}
      {showEditOverlay && currentTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Teacher</h2>
            <DynamicForm
              fields={teacherFields}
              onSubmit={handleEditTeacher}
              onCancel={() => setShowEditOverlay(false)}
              initialValues={currentTeacher}
            />
          </div>
        </div>
      )}

      {/* Dynamic Table */}
      <DynamicTable
        columns={teacherColumns}
        data={currentTeachers}
        handleView={handleView}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        viewItem={currentTeacher} // This remains to show the view overlay
      />
      {teachers.length > 5 && (
        <Pagination
          studentsPerPage={teachersPerPage}
          totalStudents={teachers.length}
          paginate={paginate}
        />
      )}

      {/* Overlay for Viewing Selected Teacher */}
      {currentTeacher && !showEditOverlay && ( // Check if not in edit mode
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-violet-200 to-pink-200 shadow-md rounded-lg p-6 w-11/12 md:w-1/4 h-2/4 flex-col justify-evenly">
            <h3 className="text-2xl font-bold">{currentTeacher.name}</h3>
            <p className="text-lg text-gray-600">{currentTeacher.email}</p>
            <p className="text-lg text-gray-600">Department: {currentTeacher.department}</p>
            <p className="text-lg text-gray-600">Contact Number: {currentTeacher.contact}</p>
            <button
              onClick={() => setCurrentTeacher(null)}
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

export default Teacher;
