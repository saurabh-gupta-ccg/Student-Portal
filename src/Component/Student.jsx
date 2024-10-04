import React, { useEffect, useState, useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import DynamicTable from "./DynamicTable";
import Pagination from "./Pagination";

function Student() {
  const { students, addStudent, deleteStudent, updateStudent } =
  useContext(StudentContext);
  const [showAddOverlay, setShowAddOverlay] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [Branch, setBranch] = useState(false);
  const [Branches, setBranches] = useState([]);

  const Department = JSON.parse(localStorage.getItem("dept"));
  console.log(Department);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    DOB: "",
    department: "",
    branch: "",
    gender: "",
    year: "",
  });
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isDepartmentValid, setIsDepartmentValid] = useState(true);
  const [isBranchValid, setIsBranchValid] = useState(true);


  const validateForm = () => {
    let isValid = true;

    if (formData.name.trim() === "") {
      setIsNameValid(false);
      isValid = false;
    } else {
      setIsNameValid(true);
    }

    if (formData.email.trim() === "") {
      setIsEmailValid(false);
      isValid = false;
    } else {
      setIsEmailValid(true);
    }

    if (formData.department.trim() === "") {
      setIsDepartmentValid(false);
      isValid = false;
    } else {
      setIsDepartmentValid(true);
    }

    if (formData.branch.trim() === "") {
      setIsBranchValid(false);
      isValid = false;
    } else {
      setIsBranchValid(true);
    }


    return isValid;
  };
  const studentField = [
    { label: "id", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email", type: "email" },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
 
  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddStudent = () => {
    const isValid = validateForm();
    if (!isValid)return;
    const id =
      students.length > 0
        ? Math.max(...students.map((student) => student.id)) + 1
        : 1;
    addStudent({ ...formData, id });
    resetForm();
    setShowAddOverlay(false);
  };

  const handleEditStudent = () => {
    const isValid = validateForm();
    if (!isValid)return;
    updateStudent({ ...currentStudent, ...formData });
    resetForm();
    setShowEditOverlay(false);
    setCurrentStudent(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      DOB: "",
      department: "",
      branch: "",
      gender: "",
      year: "",
    });
    setBranch(false);
    setBranches([]);
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
    if (showEditOverlay) {
      setShowEditOverlay(false);
      setCurrentStudent(null);
    }
    setCurrentStudent(
      currentStudent && currentStudent.id === student.id ? null : student
    );
    setFormData(student);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setShowEditOverlay(true);
    setFormData(student);
    if (student.department) {
      handleDepartment({ target: { value: student.department } });
    }
  };

  const handleDepartment = (e) => {
    const selectedDept = e.target.value;
    setFormData({ ...formData, department: selectedDept });
    setBranch(true);
    const selectedDeptData = Department.find(
      (dept) => dept.deptName === selectedDept
    );
    if (selectedDeptData) {
      setBranches(selectedDeptData.branches);
    } else {
      setBranches([]);
    }
  };

  return (
    <div className="m-10">
      <button
        onClick={() => {
          setShowAddOverlay(true);
          resetForm();
        }}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Student
      </button>

      {/* Overlay for Adding Student */}
      {showAddOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add Student</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddStudent();
              }}
            >
              <label
                htmlFor="name"
                className="block text-gray-700 text-lg font-bold mb-2"
              >
                Student Name
              </label>
            
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>setFormData({ ...formData, name: e.target.value })}
               
                // required
                
              />
              {!isNameValid && <p className="text-red-500 text-sm mt-1">Student Name is required</p>}
              <label
                htmlFor="email"
                className="block text-gray-700 text-lg font-bold mb-2 mt-2"
              >
                Email
              </label>{" "}
              
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                // required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {!isEmailValid && <p className="text-red-500 text-sm mt-1"> Email is required</p>}
              <label
                htmlFor="dob"
                className="block text-gray-700 text-lg font-bold mb-2 mt-2"
              >
                DOB
              </label>
              
              <input
                type="date"
                name="DOB"
                id="dob"
                value={formData.DOB}
                onChange={(e) =>
                  setFormData({ ...formData, DOB: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                 <label className="block text-gray-700 text-lg font-bold mb-2 mt-2">
                Gender
              </label>
              <div className="flex items-center mb-4">
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mr-1"
                  />
                  Male
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mr-1"
                  />
                  Female
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mr-1"
                  />
                  Other
                </label>
              </div>
              <label
                htmlFor="dept"
                className="block text-gray-700 text-lg font-bold mb-2 mt-2"
              >
                Department
              </label>{" "}
              <select
                id="dept"
                name="DEPT"
                value={formData.department}
                onChange={handleDepartment}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
                >
                <option value="select">Select Department</option>
                {Department.map((value, index) => (
                  <option key={index} value={value.deptName}>
                    {value.deptName}
                  </option>
                ))}
              </select>
              {!isDepartmentValid && <p className="text-red-500 text-sm mt-1"> Department is required</p>}
              {Branch && (
                <div>
                  <label
                    htmlFor="branch"
                    className="block text-gray-700 text-lg font-bold mb-2 mt-2"
                  >
                    Branch
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={(e) =>
                      setFormData({ ...formData, branch: e.target.value })
                    }
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                    <option value="">Select Branch</option>
                    {Branches.map((branch, index) => (
                      <option key={index} value={branch.branchname}>
                        {branch.branchname}
                      </option>
                    ))}
                  </select>
                  {!isBranchValid && <p className="text-red-500 text-sm mt-1"> Email is required</p>}
                </div>
                
              )}
              <label
                htmlFor="year"
                className="block text-gray-700 text-lg font-bold mt-2 mb-2"
              >
                Year
              </label>{" "}
              <input
                type="text"
                id="year"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={() => setShowAddOverlay(false)}
                className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Overlay for Editing Student */}
      {showEditOverlay && currentStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditStudent();
              }}
            >
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-4"
              >
                Student Name
              </label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

              />
               {!isNameValid && <p className="text-red-500 text-sm mt-1">Student Name is required</p>}
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-4"
              >
                Email
              </label>{" "}
              <br />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                // required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

              />
              {!isEmailValid && <p className="text-red-500 text-sm mt-1"> Email is required</p>}
              <label
                htmlFor="dob"
                className="block text-gray-700 text-sm font-bold mb-4"
              >
                DOB
              </label>{" "}
              <br />
              <input
                type="date"
                name="DOB"
                id="dob"
                value={formData.DOB}
                onChange={(e) =>
                  setFormData({ ...formData, DOB: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <div className="flex items-center mb-4">
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mr-1"
                  />
                  Male
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mr-1"
                  />
                  Female
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mr-1"
                  />
                  Other
                </label>
              </div>
              <label
                htmlFor="dept"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Department
              </label>{" "}
              <br />
              <select
                id="dept"
                name="DEPT"
                value={formData.department}
                onChange={handleDepartment}
                // required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

              >
                <option value="">Select Department</option>
                {Department.map((value, index) => (
                  <option key={index} value={value.deptName}>
                    {value.deptName}
                  </option>
                ))}
              </select>
              {!isDepartmentValid && <p className="text-red-500 text-sm mt-1"> Department is required</p>}
              {Branch && (
                <div>
                  <label
                    htmlFor="branch"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Branch
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={(e) =>
                      setFormData({ ...formData, branch: e.target.value })
                    }
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                  >
                    <option value="">Select Branch</option>
                    {Branches.map((branch, index) => (
                      <option key={index} value={branch.branchname}>
                        {branch.branchname}
                      </option>
                    ))}
                  </select>
                  {!isBranchValid && <p className="text-red-500 text-sm mt-1"> Email is required</p>}
                </div>
              )}
              <label
                htmlFor="year"
                className="block text-gray-700 text-sm font-bold mb-4"
              >
                Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Student
              </button>
              <button
                type="button"
                onClick={() => setShowEditOverlay(false)}
                className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
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
        viewItem={currentStudent}
      />
      {students.length > studentsPerPage && (
        <Pagination
          studentsPerPage={studentsPerPage}
          totalStudents={students.length}
          paginate={paginate}
        />
      )}

      {/* Overlay for Viewing Selected Student */}
      {currentStudent && !showEditOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-violet-200 to-pink-200 shadow-md rounded-lg p-6 w-11/12 md:w-1/3 h-3/5 flex-col justify-evenly">
            <h3 className="text-2xl font-bold">{currentStudent.name}</h3>
            <p className="text-lg text-gray-600">{currentStudent.email}</p>
            <p className="text-lg text-gray-600">DOB: {currentStudent.DOB}</p>
            <p className="text-lg text-gray-600">Gender: {currentStudent.gender}</p>
            <p className="text-lg text-gray-600">
              Department: {currentStudent.department}
            </p>
            <p className="text-lg text-gray-600">
              Branch: {currentStudent.branch}
            </p>
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
// import React, { useEffect, useState, useContext } from "react";
// import { StudentContext } from "../context/StudentContext";
// import DynamicTable from "./DynamicTable";
// import Pagination from "./Pagination";

// function Student() {
//   const { students, addStudent, deleteStudent, updateStudent } =
//     useContext(StudentContext);
//   const [showAddOverlay, setShowAddOverlay] = useState(false);
//   const [showEditOverlay, setShowEditOverlay] = useState(false);
//   const [currentStudent, setCurrentStudent] = useState(null);
//   const [Branch, setBranch] = useState(false);
//   const [Branches, setBranches] = useState([]);

//   const Department = JSON.parse(localStorage.getItem("dept"));
//   console.log(Department);

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     DOB: "",
//     department: "",
//     branch: "",
//     gender: "",
//     year: "",
//   });

//   // State for error messages
//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     department: "",
//     branch: "",
//   });

//   const studentField = [
//     { label: "id", key: "id" },
//     { label: "Name", key: "name" },
//     { label: "Email", key: "email", type: "email" },
//   ];

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 5;

//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const validateForm = () => {
//     const newErrors = {
//       name: "",
//       email: "",
//       department: "",
//       branch: "",
//     };
//     let isValid = true;

//     // Name validation
//     if (!formData.name) {
//       newErrors.name = "Name is required.";
//       isValid = false;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       newErrors.email = "Email is required.";
//       isValid = false;
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Email is invalid.";
//       isValid = false;
//     }

//     // Department validation
//     if (!formData.department) {
//       newErrors.department = "Department is required.";
//       isValid = false;
//     }

//     // Branch validation
//     if (Branch && !formData.branch) {
//       newErrors.branch = "Branch is required.";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleAddStudent = () => {
//     if (!validateForm()) return;

//     const id =
//       students.length > 0
//         ? Math.max(...students.map((student) => student.id)) + 1
//         : 1;
//     addStudent({ ...formData, id });
//     resetForm();
//     setShowAddOverlay(false);
//   };

//   const handleEditStudent = () => {
//     if (!validateForm()) return;

//     updateStudent({ ...currentStudent, ...formData });
//     resetForm();
//     setShowEditOverlay(false);
//     setCurrentStudent(null);
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       DOB: "",
//       department: "",
//       branch: "",
//       gender: "",
//       year: "",
//     });
//     setBranch(false);
//     setBranches([]);
//     setErrors({
//       name: "",
//       email: "",
//       department: "",
//       branch: "",
//     });
//   };

//   useEffect(() => {
//     if (students.length <= studentsPerPage) {
//       setCurrentPage(1);
//     }
//   }, [students.length]);

//   const handleDelete = (id) => {
//     deleteStudent(id);
//   };

//   const handleView = (student) => {
//     if (showEditOverlay) {
//       setShowEditOverlay(false);
//       setCurrentStudent(null);
//     }
//     setCurrentStudent(
//       currentStudent && currentStudent.id === student.id ? null : student
//     );
//     setFormData(student);
//   };

//   const handleEdit = (student) => {
//     setCurrentStudent(student);
//     setShowEditOverlay(true);
//     setFormData(student);
//     if (student.department) {
//       handleDepartment({ target: { value: student.department } });
//     }
//   };

//   const handleDepartment = (e) => {
//     const selectedDept = e.target.value;
//     setFormData({ ...formData, department: selectedDept });
//     setBranch(true);
//     const selectedDeptData = Department.find(
//       (dept) => dept.deptName === selectedDept
//     );
//     if (selectedDeptData) {
//       setBranches(selectedDeptData.branches);
//     } else {
//       setBranches([]);
//     }
//   };

//   return (
//     <div className="m-10">
//       <button
//         onClick={() => {
//           setShowAddOverlay(true);
//           resetForm();
//         }}
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
//       >
//         Add Student
//       </button>

//       {/* Overlay for Adding Student */}
//       {showAddOverlay && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
//             <h2 className="text-xl font-bold mb-4">Add Student</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleAddStudent();
//               }}
//             >
//               <label
//                 htmlFor="name"
//                 className="block text-gray-700 text-sm font-bold mb-4"
//               >
//                 Student Name
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="name"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//               {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 text-sm font-bold mb-4"
//               >
//                 Email
//               </label>{" "}
//               <br />
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//               {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//               <label
//                 htmlFor="dob"
//                 className="block text-gray-700 text-sm font-bold mb-4"
//               >
//                 DOB
//               </label>{" "}
//               <br />
//               <input
//                 type="date"
//                 name="DOB"
//                 id="dob"
//                 value={formData.DOB}
//                 onChange={(e) =>
//                   setFormData({ ...formData, DOB: e.target.value })
//                 }
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Gender
//               </label>
//               <div className="flex items-center mb-4">
//                 <label className="mr-4">
//                   <input
//                     type="radio"
//                     value="Male"
//                     checked={formData.gender === "Male"}
//                     onChange={(e) =>
//                       setFormData({ ...formData, gender: e.target.value })
//                     }
//                     className="mr-1"
//                   />
//                   Male
//                 </label>
//                 <label className="mr-4">
//                   <input
//                     type="radio"
//                     value="Female"
//                     checked={formData.gender === "Female"}
//                     onChange={(e) =>
//                       setFormData({ ...formData, gender: e.target.value })
//                     }
//                     className="mr-1"
//                   />
//                   Female
//                 </label>
//                 <label className="mr-4">
//                   <input
//                     type="radio"
//                     value="Other"
//                     checked={formData.gender === "Other"}
//                     onChange={(e) =>
//                       setFormData({ ...formData, gender: e.target.value })
//                     }
//                     className="mr-1"
//                   />
//                   Other
//                 </label>
//               </div>
//               <label
//                 htmlFor="department"
//                 className="block text-gray-700 text-sm font-bold mb-4"
//               >
//                 Department
//               </label>
//               <select
//                 id="department"
//                 value={formData.department}
//                 onChange={(e) => handleDepartment(e)}
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
//               >
//                 <option value="">Select Department</option>
//                 {Department.map((dept) => (
//                   <option key={dept.id} value={dept.deptName}>
//                     {dept.deptName}
//                   </option>
//                 ))}
//               </select>
//               {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
//               {Branch && (
//                 <>
//                   <label
//                     htmlFor="branch"
//                     className="block text-gray-700 text-sm font-bold mb-4"
//                   >
//                     Branch
//                   </label>
//                   <select
//                     id="branch"
//                     value={formData.branch}
//                     onChange={(e) =>
//                       setFormData({ ...formData, branch: e.target.value })
//                     }
//                     required
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
//                   >
//                     <option value="">Select Branch</option>
//                     {Branches.map((branch) => (
//                       <option key={branch.id} value={branch.branchname}>
//                         {branch.branchname}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.branch && <p className="text-red-500 text-xs">{errors.branch}</p>}
//                 </>
//               )}
//               <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddOverlay(false)}
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Add Student
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Overlay for Editing Student */}
//       {showEditOverlay && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
//             <h2 className="text-xl font-bold mb-4">Edit Student</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleEditStudent();
//               }}
//             >
//               {/* Add same form fields here as in the Add Student overlay */}
//               <label
//                 htmlFor="name"
//                 className="block text-gray-700 text-sm font-bold mb-4"
//               >
//                 Student Name
//               </label>
//               <br />
//               <input
//                 type="text"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="name"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//               {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 text-sm font-bold mb-4"
//               >
//                 Email
//               </label>{" "}
//               <br />
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//               {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//               <label
//                 htmlFor="dob"
//                 className="block text-gray-700 text-sm font-bold mb-4"
//               >
//                 DOB
//               </label>{" "}
//               <br />
//               <input
//                 type="date"
//                 name="DOB"
//                 id="dob"
//                 value={formData.DOB}
//                 onChange={(e) =>
//                   setFormData({ ...formData, DOB: e.target.value })
//                 }
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Gender
//               </label>
//               <div className="flex items-center mb-4">
//                 <label className="mr-4">
//                   <input
//                     type="radio"
//                     value="Male"
//                     checked={formData.gender === "Male"}
//                     onChange={(e) =>
//                       setFormData({ ...formData, gender: e.target.value })
//                     }
//                     className="mr-1"
//                   />
//                   Male
//                 </label>
//                 <label className="mr-4">
//                   <input
//                     type="radio"
//                     value="Female"
//                     checked={formData.gender === "Female"}
//                     onChange={(e) =>
//                       setFormData({ ...formData, gender: e.target.value })
//                     }
//                     className="mr-1"
//                   />
//                   Female
//                 </label>
//                 <label className="mr-4">
//                   <input
//                     type="radio"
//                     value="Other"
//                     checked={formData.gender === "Other"}
//                     onChange={(e) =>
//                       setFormData({ ...formData, gender: e.target.value })
//                     }
//                     className="mr-1"
//                   />
//                   Other
//                 </label>
//               </div>
//               <label
//                 htmlFor="department"
//                 className="block text-gray-700 text-sm font-bold mb-4"
//               >
//                 Department
//               </label>
//               <select
//                 id="department"
//                 value={formData.department}
//                 onChange={(e) => handleDepartment(e)}
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
//               >
//                 <option value="">Select Department</option>
//                 {Department.map((dept) => (
//                   <option key={dept.id} value={dept.deptName}>
//                     {dept.deptName}
//                   </option>
//                 ))}
//               </select>
//               {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
//               {Branch && (
//                 <>
//                   <label
//                     htmlFor="branch"
//                     className="block text-gray-700 text-sm font-bold mb-4"
//                   >
//                     Branch
//                   </label>
//                   <select
//                     id="branch"
//                     value={formData.branch}
//                     onChange={(e) =>
//                       setFormData({ ...formData, branch: e.target.value })
//                     }
//                     required
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
//                   >
//                     <option value="">Select Branch</option>
//                     {Branches.map((branch) => (
//                       <option key={branch.id} value={branch.branchname}>
//                         {branch.branchname}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.branch && <p className="text-red-500 text-xs">{errors.branch}</p>}
//                 </>
//               )}
//               <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditOverlay(false)}
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Update Student
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Dynamic Table */}
//       <DynamicTable
//         columns={studentField}
//         data={currentStudents}
//         handleView={handleView}
//         handleDelete={handleDelete}
//         handleEdit={handleEdit}
//         viewItem={currentStudent}
//       />
//       <Pagination
//         totalStudents={students.length}
//         studentsPerPage={studentsPerPage}
//         paginate={paginate}
//         currentPage={currentPage}
//       />
//     </div>
//   );
// }

// export default Student;
