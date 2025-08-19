// import "./TodoList.css";
// import { API } from '../api';  

// const TodoList = ({ todos, selectedTodo, setSelectedTodo, fetchTodos }) => {
//   const deleteTodo = async (id) => {
//   if (window.confirm('Are you sure?')) {
//     try {
//       await API.delete(`/deleteTodo/${id}`);
//       fetchTodos(); //  refresh list after delete
//     } catch (err) {
//       console.error('Delete failed:', err);
//       alert('Delete failed');
//     }
//   }
// };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Serial</th>
//           <th>Title</th>
//           <th>Description</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {todos.length === 0 ? (
//           <tr>
//             <td colSpan="4" style={{ textAlign: 'center', color: 'gray' }}>No todos</td>
//           </tr>
//         ) : (
//           todos.map((todo, index) => (
//             <tr key={todo._id}>
//               <td>{index + 1}</td>
//               <td>{todo.title}</td>
//               <td>{todo.description}</td>
//               <td>
//                 <button className="action-btn edit-btn" onClick={() => setSelectedTodo(todo)}>Edit</button>
//                 <button className="action-btn delete-btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default TodoList;




// import "./TodoList.css";
// import { useState,useEffect } from "react";
// import { API } from "../api";

// const TodoList = ({ todos, selectedTodo, setSelectedTodo, fetchTodos }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const todosPerPage = 5;

//   const deleteTodo = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       try {
//         await API.delete(`/deleteTodo/${id}`);
//         fetchTodos();
//       } catch (err) {
//         console.error("Delete failed:", err);
//         alert("Delete failed");
//       }
//     }
//   };

//     // Adjust current page if todos length changes and current page is now invalid
//   useEffect(() => {
//     const totalPages = Math.ceil(todos.length / todosPerPage);
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages || 1); // agar 0 page bache to 1 pe le jao
//     }
//   }, [todos]); 


//   // Calculate pagination logic
//   const indexOfLastTodo = currentPage * todosPerPage;
//   const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//   const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
//   const totalPages = Math.ceil(todos.length / todosPerPage);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>Serial</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentTodos.length === 0 ? (
//             <tr>
//               <td colSpan="4" style={{ textAlign: "center", color: "gray" }}>
//                 No todos
//               </td>
//             </tr>
//           ) : (
//             currentTodos.map((todo, index) => (
//               <tr key={todo._id}>
//                 <td>{indexOfFirstTodo + index + 1}</td>
//                 <td>{todo.title}</td>
//                 <td>{todo.description}</td>
//                 <td>
//                   <button
//                     className="action-btn edit-btn"
//                     onClick={() => setSelectedTodo(todo)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="action-btn delete-btn"
//                     onClick={() => deleteTodo(todo._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="pagination">
//           <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goToPage(i + 1)}
//               className={currentPage === i + 1 ? "active" : ""}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default TodoList;



import "./TodoList.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { API } from "../api";

const TodoList = ({ todos, selectedTodo, setSelectedTodo, fetchTodos }) => {
  const [currentPage, setCurrentPage] = useState(0); // Note: 0-based index
  const todosPerPage = 5;

  const deleteTodo = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await API.delete(`/deleteTodo/${id}`);
        fetchTodos();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Delete failed");
      }
    }
  };

  useEffect(() => {
    const totalPages = Math.ceil(todos.length / todosPerPage);
    if (currentPage >= totalPages) {
      setCurrentPage(totalPages - 1 >= 0 ? totalPages - 1 : 0);
    }
  }, [todos]);

  const pageCount = Math.ceil(todos.length / todosPerPage);
  const offset = currentPage * todosPerPage;
  const currentTodos = todos.slice(offset, offset + todosPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTodos.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "gray" }}>
                No todos
              </td>
            </tr>
          ) : (
            currentTodos.map((todo, index) => (
              <tr key={todo._id}>
                <td>{offset + index + 1}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => setSelectedTodo(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"page-btn"}
          nextClassName={"page-btn"}
          pageClassName={"page-btn"}
          breakLabel={"..."}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
        />
      )}
    </>
  );
};

export default TodoList;
