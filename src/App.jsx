import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css"
import Header from "./components/header"
import Todo from "./components/todo";
// uuid
import {v4 as uuidv4} from 'uuid';
// usestate
import { useState,useEffect } from "react";
export default function App() {
  
    const initialTodos = [
      {
        
      }
  ];
  // todo use state
  const [todos,setTodos] = useState(initialTodos);
  const [todosType, setTodosType] = useState("all")
  // ======
  // 
  // = to do us{ state ==============
//  ======================= hand check click fun ====================
   const handleCheckClick = (id) =>{
     const updatedTodos = todos.map((t) =>{
      if (t.id == id){
        t.isCompleted = !t.isCompleted;
      }
      
      return t;
     });
     setTodos(updatedTodos);
      localStorage.setItem("todos" , JSON.stringify(updatedTodos))
    }
    //  ======================= hand check click fun ====================
    const handleDelete = (id) =>{
      const updatedTodos = todos.filter((todo) =>{
        return todo.id != id;

      })
      setTodos(updatedTodos);
       localStorage.setItem("todos" , JSON.stringify(updatedTodos))
    }
    const handleEdit = (id,newTitle) =>{
      const updatedTodos = todos.map((todo) =>{
        if (todo.id == id){
          return {
            ...todo,title:newTitle
          };
        };
        return todo
      });
      setTodos(updatedTodos);
       localStorage.setItem("todos" , JSON.stringify(updatedTodos))
    }
        // filtering todos 
    const completedTodos = todos.filter((todo) =>{
      return todo.isCompleted;
    })
    const noneCompletedTodos = todos.filter((todo) =>{
      return !todo.isCompleted;
    });

    let todosToBeRendered = todos;
    if (todosType == "completed"){
      todosToBeRendered = completedTodos;
    }else if (todosType == "noneCompleted"){
      todosToBeRendered = noneCompletedTodos;
    }
    // =========== filtering todos ============
  const todosJSX = todosToBeRendered.map((todo) =>{
    return <Todo key={todo.id} todo={todo} handleCheck={handleCheckClick} handleDelete={handleDelete} 
    handleEdit={handleEdit}/>
  })
  // input use state
  const [titleInput, setTitleInput] = useState("");
  // button handle click function
    const handleAddClick = () =>{
      const newTodo = {
        
        id:uuidv4(),
        title:titleInput,
        details:new Date().toISOString(),
        isCompleted:false
      };
      if (newTodo.title.trim() == ""){return;}
      else{
        const updatedTodos = [...todos, newTodo]
      setTodos(updatedTodos);
      localStorage.setItem("todos" , JSON.stringify(updatedTodos))
      setTitleInput("");
      }
    }

    useEffect(() => {
      const localTodos = JSON.parse(localStorage.getItem("todos"));

      if (localTodos) {
        setTodos(localTodos);
           }
}, []);
  return (
    <div className="bg-[#1C0049] min-h-screen flex items-center justify-center">

      <div className=" bg-[#EFEFEF] w-xl rounded-lg shadow-2xl">

        {/* Header */}
        <Header />
       {/* header */}

      {/* Filter Buttons */}
        <div className="flex gap-3 justify-center mt-4">
          <button value="all" onClick={(event) =>{setTodosType(event.currentTarget.value);}} 
          
          className={`cursor-pointer ${todosType == "all" ? "bg-red-400": "bg-white" }  px-3 py-1 w-20 rounded shadow transition-colors`}>
            <h1 className="font-[ReadexMedium]">الكل</h1>
          </button>
          <button value="completed" onClick={(event) =>{setTodosType(event.currentTarget.value);}} 
          
          className={`cursor-pointer  w-20 px-3 py-1 ${todosType == "completed" ? "bg-red-400": "bg-white" }  rounded shadow transition-colors`}>
           <h1 className="font-[ReadexMedium]">المنجز</h1>
          </button>
          <button value="noneCompleted" onClick={(event) =>{setTodosType(event.currentTarget.value);}} 
          
          className={`cursor-pointer w-20 px-3 py-1 ${todosType == "noneCompleted" ? "bg-red-400": "bg-white" }  rounded shadow transition-colors`}>
            <h1 className="font-[ReadexMedium]">لم ينجز</h1>
          </button>
        </div>
 
        {/* Todo Items (Static UI) */}
        
        {todosJSX}
        {/*======== todo items  =====*/}
        <div className="flex g-3 py-3 justify-center">
          <input 
          value={titleInput}
          onChange={(event) =>{
            setTitleInput(event.target.value)
          }}
           type="text" name="name" id="name" className="border-2 rounded-sm"/>
          <div>
          <button onClick={() =>{
             handleAddClick();
          }} 
          className="px-3 py-1 bg-white rounded shadow">
           <h1 className="cursor-pointer font-[ReadexMedium] text-red-400">أضف مهمه جديده</h1>
          </button>
          </div>
          
          
          
        </div>
      </div>
    </div>
  );
}
