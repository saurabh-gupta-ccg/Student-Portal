import React from 'react';

function DynamicTable({ columns, data, handleView, handleDelete, handleEdit, viewItem }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 border-b border-gray-300">
                  {item[col.key]}
                </td>
              ))}
              <td className="px-4 py-2 border-b border-gray-300">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                  onClick={() => handleView(item)}
                >
                  {viewItem && viewItem.id === item.id ? 'Hide' : 'View'}
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-xs ml-1"
                  onClick={() => handleEdit(item)} 
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs ml-1"
                  onClick={() => handleDelete(item.id)}
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

