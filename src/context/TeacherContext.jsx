import React, { createContext, useState, useEffect } from 'react';
export const TeacherContext = createContext();


export const TeacherProvider = ({ children }) => {
  const initialData = JSON.parse(localStorage.getItem('teachers')) || [];
  const [teachers, setTeachers] = useState(initialData);

  useEffect(() => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }, [teachers]);

  const addTeacher = (teacher) => {
    setTeachers((prevTeachers) => [...prevTeachers, teacher]);
  };

 
  const deleteTeacher = (id) => {
    setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== id));
  };

  const updateTeacher = (updatedTeacher) => {
    setTeachers(teachers.map((teacher) => 
      (teacher.id === updatedTeacher.id ? updatedTeacher : teacher)
    ));
  };

  return (
    <TeacherContext.Provider value={{ teachers, addTeacher, deleteTeacher, updateTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
};
