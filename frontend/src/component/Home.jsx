// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Home() {
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [newtodo, setnewTodo] = useState("");

//   useEffect(() => {
//     const fetchtodos = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:4001/todo/fetch", {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         console.log(response.data.todos);
//         setTodos(response.data.todos);
//         setError(null);
//       } catch (error) {
//         setError("faild to fetch todos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchtodos();
//   }, []);

//   const todoCreate = async () => {
//     if (!newtodo) return;
//     try {
//       const response = await axios.post(
//         "http://localhost:4001/todo/create",
//         {
//           text: newtodo,
//           completed: false,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       // const createdTodo = response.data.newtodo || response.data;

//       console.log(response.data.newtodo);
//       setTodos([...todos, response.data.newtodo]);
//       setnewTodo("");
//     } catch (error) {
//       setError("faild to cretae todos");
//     }
//   };

//   const todoStatus = async (id) => {
//     const todo = todos.find((t) => t._id === id);
//     try {
//       const response = await axios.put(
//         `http://localhost:4001/todo/update/${id}`,
//         {
//           ...todo,
//           completed: !todo.completed,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       console.log(response.data.todo);
//       setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
//     } catch (error) {
//       setError("faild to cretae todos");
//     }
//   };

//   const todoDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
//         withCredentials: true,
//       });
//       setTodos(todos.filter((t) => t._id !== id));
//     } catch (error) {
//       setError("failed to find status");
//     
//   };

//   const remaingtodotodos=todos.filter((todo)=>!todo.completed).length;
//   return (
//     <>
//       <div className="bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
//         <h1 className="text-2xl font-semibold text-center">Todo App</h1>

//         <div className="flex mb-4">
//           <input
//             type="text"
//             placeholder="Add a new todo"
//             value={newtodo}
//             onChange={(e) => setnewTodo(e.target.value)}
//             onKeyPress={(e)=>e.key==="Enter"&& todoCreate()}
//             className="flex-grow p-2 border rounded-l-md focus:outline-none"
//           />
//           <button
//             onClick={todoCreate}
//             className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
//           >
//             Add
//           </button>
//         </div>

//         <ul className="space-y-2">
//           {todos.map((todo, index) => (
//             <li
//               key={todo._id || index}
//               className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
//             >
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"

//                   checked={todo.completed}
//                   onChange={() => todoStatus(todo._id)}
//                 />
//                 <span
//                   className={`${
//                     todo.completed
//                       ? "line-through text-gray-800 font-semibold"
//                       : ""
//                   }`}
//                 >
//                   {todo.text}
//                 </span>
//               </div>
//               <button
//                 onClick={() => todoDelete(todo._id)}
//                 className="text-red-500 hover:text-red-800 duration-300"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>

//         <p className="mt-4 text-center text-sm text-gray-700">
//           {remaingtodotodos} Remaining Todos
//         </p>
//         <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block">
//           Logout
//         </button>
//       </div>
//     </>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { MdDelete } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { MdDataSaverOn } from "react-icons/md";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newtodo, setnewTodo] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const [editingText, setEditingText] = useState(""); 
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4001/todo/fetch", {
          withCredentials: true,
        });

        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const todoCreate = async () => {
    if (!newtodo.trim()) {
      setError("Please enter todo first");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4001/todo/create",
        { text: newtodo.trim(), completed: false },
        { withCredentials: true }  
      );
      setTodos([...todos, response.data.newtodo]);

      setnewTodo("");
    } catch (error) {
      setError("failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:4001/todo/update/${id}`,
        { ...todo, completed: !todo.completed },
        {withCredentials: true},
      );
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("failed to update status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`,
        {withCredentials: true}
      );
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("failed to delete todo");
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4001/todo/update/${id}`,
        { text: editingText },
        { withCredentials: true  }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      setError("failed to edit todo");
    }
  };

const navigateTo=useNavigate();

const logout=async()=>{
  try {
    await axios.post("http://localhost:4001/user/logout",{
      withCredentials:true,
    });
    toast.success("logout succfully");
    navigateTo("/login");
    localStorage.removeItem("jwt");
    
  } catch (error) { 
    toast.error("error logout");
  }
}

  const remaingtodotodos = todos.filter((todo) => !todo.completed).length;

  return (
    <>
   <Navbar/>
<div
  className={`max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6 transition-colors duration-500 ${
    darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
  }`}
>
  <div className="flex flex-col ">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl text-center flex-1">Todo App</h1>
      
      {/* 🌙 Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="ml-2 px-3 py-1 rounded-lg text-sm font-semibold border 
                   hover:bg-gray-700 hover:text-white transition duration-300"
      >
        {darkMode ? "Light ☀️" : "Dark 🌙"}
      </button>
    </div>

    <div className="mt-1 min-h-[40px] flex items-center justify-center">
      {error && (
        <div className="text-red-500 font-medium text-center">{error}</div>
      )}
    </div>
  </div>

  <div className="flex mb-4">
    <input
      type="text"
      placeholder="Add a new todo"
      value={newtodo}
      onChange={(e) => setnewTodo(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && todoCreate()}
      className={`flex-grow p-2 border rounded-l-md focus:outline-none ${
        darkMode ? "bg-gray-800 text-white border-gray-600" : ""
      }`}
    />
    <button
      onClick={todoCreate}
      className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
    >
      <MdOutlinePostAdd />
    </button>
  </div>

  <ul className="space-y-2">
    {todos.map((todo) => (
      <li
        key={todo._id}
        className={`flex items-center justify-between p-3 rounded-md ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={todo.completed}
            onChange={() => todoStatus(todo._id)}
          />

          {editingId === todo._id ? (
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className={`border p-1 rounded ${
                darkMode ? "bg-gray-700 text-white border-gray-500" : ""
              }`}
            />
          ) : (
            <span
              className={`${
                todo.completed
                  ? "line-through text-gray-400"
                  : darkMode
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {todo.text}
            </span>
          )}
        </div>

        <div className="space-x-2">
          {editingId === todo._id ? (
            <button
              onClick={() => saveEdit(todo._id)}
              className="text-white hover:bg-green-700 py-2 px-3 rounded cursor-pointer bg-green-500 "
            >
              <MdDataSaverOn />
            </button>
          ) : (
            <button
              onClick={() => startEditing(todo._id, todo.text)}
              className="text-white hover:bg-amber-700 px-3 py-2 bg-amber-600 rounded cursor-pointer"
            >
              <LiaEditSolid />
            </button>
          )}
          <button
            onClick={() => todoDelete(todo._id)}
            className="text-white hover:bg-red-700 duration-300 bg-red-500 py-2 px-3 rounded cursor-pointer"
          >
            <MdDelete />
          </button>
        </div>
      </li>
    ))}
  </ul>

  <p className="mt-4 text-center text-sm">
    {remaingtodotodos} Remaining Todos
  </p>
  <button
    onClick={() => logout()}
    className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
  >
    Logout
  </button>
</div>

    </>
  );
  
}

export default Home;
