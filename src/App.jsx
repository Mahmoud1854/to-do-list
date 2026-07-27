import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css"
import Header from "./components/header"
import Todo from "./components/todo";
// uuid
import {v4 as uuidv4} from 'uuid';
// usestate
import { useState,useEffect,useMemo,useReducer } from "react";
import TodosReducer from "./reducers/todosReducer";
export default function App() {
  
    const initialTodos = [
      
  ];
  // todo use state
  const [todos , dispatch] = useReducer(TodosReducer, [])
  const [todos2,setTodos] = useState(initialTodos);
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
      dispatch({
        type:"delete",
        payload:{
          id:id
        }
      })
    }
    const handleEdit = (id,newTitle) =>{
      dispatch({
        type:"edit",
        payload:{
          id: id,
          title:newTitle,
        }
      })
    }
        // filtering todos 
    // ======= completed todos fun ========  
    const completedTodos = useMemo(() =>{
     return todos.filter((todo) =>{
      return todo.isCompleted;
    })
    }, [todos]);
    // ======= completed todos fun ========  

    const noneCompletedTodos =useMemo(() =>{
      return todos.filter((todo) =>{
      return !todo.isCompleted;
    });
    } , [todos])

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
      dispatch( {
        type:"add",
        payload:{
          title:titleInput,
        }
      })
     setTitleInput("");

    }

    useEffect(() => {
     dispatch({
      type:"get",
     })
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
