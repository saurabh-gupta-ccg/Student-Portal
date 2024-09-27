import React, { createContext, useState, useEffect } from 'react';
export const StudentContext = createContext();
export const StudentProvider = ({ children }) => {
  const initialData = JSON.parse(localStorage.getItem('students')) || [];
  const [students, setStudents] = useState(initialData);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    setStudents((prevStudents) => [...prevStudents, student]);
  };

  const deleteStudent = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
