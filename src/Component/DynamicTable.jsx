import React from 'react';

function DynamicTable({ currentStudents, handleView, handleDelete, viewStudent }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
          <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
              Id
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
              Name
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
              Email
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
              Status
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td className="px-4 py-2 border-b border-gray-300">{student.id}</td>
              <td className="px-4 py-2 border-b border-gray-300">{student.name}</td>
              <td className="px-4 py-2 border-b border-gray-300">{student.email}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {student.status}
                </span>
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
  );
}

export default DynamicTable;
