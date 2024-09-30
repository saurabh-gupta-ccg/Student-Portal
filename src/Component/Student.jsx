// // // import React, { useState, useContext } from "react";
// // import { StudentContext } from "../context/StudentContext";
// // import Pagination from "./pagination";
// // import DynamicTable from "./DynamicTable"; // Import DynamicTable

// // function Student() {
// //   const { students, addStudent, deleteStudent } = useContext(StudentContext);
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [status, setStatus] = useState("Active");
// //   const [course, setCourse] = useState("");
// //   const [branch, setBranch] = useState("");
// //   const [gender, setGender] = useState("");
// //   const [year, setYear] = useState("");
// //   const [DOB, setDOB] = useState("");
// //   const [phone, setPhone] = useState(""); // Added phone state
// //   const [age, setAge] = useState(""); // Added age state
// //   const [showAddOverlay, setShowAddOverlay] = useState(false);
// //   const [viewStudent, setViewStudent] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const studentsPerPage = 5;

// //   const indexOfLastStudent = currentPage * studentsPerPage;
// //   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
// //   const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   const handleAdd = (e) => {
// //     e.preventDefault();
// //     if (name && email && DOB && status && course && branch && year && phone && age && gender) {
// //       const newStudent = {
// //         id: students.length + 1,
// //         name,
// //         email,
// //         DOB,
// //         status,
// //         course,
// //         branch,
// //         year,
// //         phone,
// //         age,
// //         gender,
// //       };
// //       addStudent(newStudent);
// //       // Reset form fields
// //       setName("");
// //       setEmail("");
// //       setDOB("");
// //       setStatus("Active");
// //       setCourse("");
// //       setBranch("");
// //       setYear("");
// //       setPhone(""); // Reset phone
// //       setAge(""); // Reset age
// //       setGender(""); // Reset gender
// //       setShowAddOverlay(false);
// //     }
// //   };

// //   const handleDelete = (id) => {
// //     deleteStudent(id);
// //     if (viewStudent && viewStudent.id === id) {
// //       setViewStudent(null);
// //     }
// //   };

// //   const handleView = (student) => {
// //     setViewStudent(viewStudent && viewStudent.id === student.id ? null : student);
// //   };

// //   const pageNumbers = [];
// //   for (let i = 1; i <= Math.ceil(students.length / studentsPerPage); i++) {
// //     pageNumbers.push(i);
// //   }

// //   return (
// //     <div className="m-10">
// //       <button
// //         onClick={() => setShowAddOverlay(true)}
// //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
// //       >
// //         Add Student
// //       </button>

// //       {showAddOverlay && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// //           <div className="bg-white shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
// //             <h2 className="text-lg font-bold mb-4">Add Student</h2>
// //             <form onSubmit={handleAdd}>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
// //                 <input
// //                   type="text"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                   placeholder="Enter student name"
// //                   required // Ensure the field is required
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                   placeholder="Enter student email"
// //                   required // Ensure the field is required
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">DOB</label>
// //                 <input
// //                   type="date"
// //                   value={DOB}
// //                   onChange={(e) => setDOB(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                   required // Ensure the field is required
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
// //                 <select
// //                   value={status}
// //                   onChange={(e) => setStatus(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                 >
// //                   <option value="Active">Active</option>
// //                   <option value="Inactive">Inactive</option>
// //                 </select>
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
// //                 <input
// //                   type="text"
// //                   value={gender}
// //                   onChange={(e) => setGender(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                   placeholder="Enter gender"
// //                   required // Ensure the field is required
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">Course</label>
// //                 <input
// //                   type="text"
// //                   value={course}
// //                   onChange={(e) => setCourse(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                   placeholder="Enter course"
// //                   required // Ensure the field is required
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
// //                 <input
// //                   type="text"
// //                   value={branch}
// //                   onChange={(e) => setBranch(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                   placeholder="Enter branch"
// //                   required // Ensure the field is required
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
// //                 <input
// //                   type="text"
// //                   value={year}
// //                   onChange={(e) => setYear(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                   placeholder="Enter year"
// //                   required // Ensure the field is required
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
// //                 <input
// //                   type="text"
// //                   value={phone}
// //                   onChange={(e) => setPhone(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                   placeholder="Enter phone number"
// //                   required // Ensure the field is required
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
// //                 <input
// //                   type="number"
// //                   value={age}
// //                   onChange={(e) => setAge(e.target.value)}
// //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //                   placeholder="Enter age"
// //                   required // Ensure the field is required
// //                 />
// //               </div>
// //               <div className="flex justify-between">
// //                 <button
// //                   type="submit"
// //                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
// //                 >
// //                   Add Student
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowAddOverlay(false)}
// //                   className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       <DynamicTable
// //         students={currentStudents}
// //         onDelete={handleDelete}
// //         onView={handleView}
// //       />

// //       <Pagination
// //         studentsPerPage={studentsPerPage}
// //         totalStudents={students.length}
// //         paginate={paginate}
// //       />
// //     </div>
// //   );
// // }

// // export default Student;
// import React, { useState, useContext } from "react";
// import { StudentContext } from "../context/StudentContext";
// import Pagination from "./pagination";
// import DynamicTable from "./DynamicTable"; // Import DynamicTable

// function Student() {
//   const { students, addStudent, deleteStudent } = useContext(StudentContext);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState("Active");
//   const [course, setCourse] = useState("");
//   const [branch, setBranch] = useState("");
//   const [gender, setGender] = useState("");
//   const [year, setYear] = useState("");
//   const [DOB, setDOB] = useState("");
//   const [phone, setPhone] = useState(""); // Added phone state
//   const [age, setAge] = useState(""); // Added age state
//   const [showAddOverlay, setShowAddOverlay] = useState(false);
//   const [viewStudent, setViewStudent] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 5;

//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleAdd = (e) => {
//     e.preventDefault();
//     if (name && email && DOB && status && course && branch && year && phone && age && gender) {
//       const newStudent = {
//         id: students.length + 1,
//         name,
//         email,
//         DOB,
//         status,
//         course,
//         branch,
//         year,
//         phone,
//         age,
//         gender,
//       };
//       addStudent(newStudent);
//       // Reset form fields
//       setName("");
//       setEmail("");
//       setDOB("");
//       setStatus("Active");
//       setCourse("");
//       setBranch("");
//       setYear("");
//       setPhone(""); // Reset phone
//       setAge(""); // Reset age
//       setGender(""); // Reset gender
//       setShowAddOverlay(false);
//     }
//   };

//   const handleDelete = (id) => {
//     deleteStudent(id);
//     if (viewStudent && viewStudent.id === id) {
//       setViewStudent(null);
//     }
//   };

//   const handleView = (student) => {
//     setViewStudent(viewStudent && viewStudent.id === student.id ? null : student);
//   };

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(students.length / studentsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="m-10">
//       <button
//         onClick={() => setShowAddOverlay(true)}
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
//       >
//         Add Student
//       </button>

//       {showAddOverlay && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
//             <h2 className="text-lg font-bold mb-4">Add Student</h2>
//             <form onSubmit={handleAdd}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter student name"
//                   required // Ensure the field is required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter student email"
//                   required // Ensure the field is required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">DOB</label>
//                 <input
//                   type="date"
//                   value={DOB}
//                   onChange={(e) => setDOB(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   required // Ensure the field is required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
//                 <select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
//                 <input
//                   type="text"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter gender"
//                   required // Ensure the field is required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Course</label>
//                 <input
//                   type="text"
//                   value={course}
//                   onChange={(e) => setCourse(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter course"
//                   required // Ensure the field is required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
//                 <input
//                   type="text"
//                   value={branch}
//                   onChange={(e) => setBranch(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter branch"
//                   required // Ensure the field is required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
//                 <input
//                   type="text"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter year"
//                   required // Ensure the field is required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter phone number"
//                   required // Ensure the field is required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
//                 <input
//                   type="number"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="Enter age"
//                   required // Ensure the field is required
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   type="submit"
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Add Student
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowAddOverlay(false)}
//                   className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <DynamicTable
//         students={currentStudents}
//         onDelete={handleDelete}
//         onView={handleView}
//       />

//       <Pagination
//         studentsPerPage={studentsPerPage}
//         totalStudents={students.length}
//         paginate={paginate}
//       />
//     </div>
//   );
// }

// export default Student;
import React, { useState, useContext } from 'react';
import { StudentContext } from '../context/StudentContext';
import DynamicTable from './DynamicTable';
import Pagination from './pagination';

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; // Number of students to show per page

  // Calculate the index range for the current page
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Logic for handling page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAdd = (e) => {

    e.preventDefault();
    const id = students.length + 1;
    if (id && name && email && DOB && status && course && branch && year) {
      const newStudent = {
        id,
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
      setShowAddOverlay(false);
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

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(students.length / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

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
              {/* Form inputs */}
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
              {/* Other form inputs */}
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
                  placeholder="Enter student DOB"
               />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Course</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Course Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Branch Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   placeholder="Enter Course Year"
                />
              </div>
              {/* Other inputs... */}
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

      {/* Dynamic Table */}
      <DynamicTable
        currentStudents={currentStudents}
        handleView={handleView}
        handleDelete={handleDelete}
        viewStudent={viewStudent}
      />
      { students.length>5 &&
      
      <Pagination
        // pageNumbers={pageNumbers}
        studentsPerPage={studentsPerPage}
        totalStudents={students.length}
        paginate={paginate}
        // currentPage={currentPage}
      />
}

      {/* Overlay for Viewing Selected Student */}
      {viewStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-md rounded-lg p-6 w-11/12 md:w-1/3 h-2/4 flex-col">
            <h3 className="text-2xl font-bold">{viewStudent.name}</h3>
            <h5 className="text-2xl font-bold">{viewStudent.Id}</h5>
            <p className="text-md text-gray-600">{viewStudent.email}</p>
            <p className="text-md text-gray-600">DOB: {viewStudent.DOB}</p>
            <p className="text-md text-green-600">{viewStudent.status}</p>
            <p className="text-md text-gray-600">Course: {viewStudent.course}</p>
            <p className="text-md text-gray-600">Branch: {viewStudent.branch}</p>
            <p className="text-md text-gray-600">Year: {viewStudent.year}</p>
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
