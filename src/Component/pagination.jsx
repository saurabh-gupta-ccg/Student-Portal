// import React from 'react';

// function Pagination({ pageNumbers, paginate, currentPage }) {
//   return (
//     <div className="flex justify-center">
//       <nav>
//         <ul className="flex">
//           {pageNumbers.map((number) => (
//             <li key={number} className="mx-1">
//               <button
//                 onClick={() => paginate(number)}
//                 className={`px-3 py-1 border rounded ${
//                   number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                 }`}
//               >
//                 {number}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Pagination;
import React from "react";

const Pagination = ({ studentsPerPage, totalStudents, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
