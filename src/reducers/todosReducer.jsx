// uuid
import {v4 as uuidv4} from 'uuid';
export default function TodosReducer(currentTodos , action){
    switch(action.type) {
        case "add":{
             const newTodo = {
                    
                    id:uuidv4(),
                    title:action.payload.title,
                    details:new Date().toISOString(),
                    isCompleted:false
                  };
                  if (newTodo.title.trim() == ""){return;}
                  else{
                    const updatedTodos = [...currentTodos, newTodo];

                localStorage.setItem("todos" , JSON.stringify(updatedTodos))
                  
                  return updatedTodos;
       
        }
    }
    // =========== case edit ================
        case "edit":{
        const updatedTodos = currentTodos.map((todo) =>{
        if (todo.id == action.payload.id){ //id
          return {
            ...todo,title:action.payload.title  //newTitle
          };
        };
        return todo
      });
      localStorage.setItem("todos" , JSON.stringify(updatedTodos))
      return updatedTodos
       
        }
        // ====================== case edit ============== 
        // ================= case delete ================
        case "delete":{
        const updatedTodos = currentTodos.filter((todo) =>{
        return todo.id != action.payload.id;

      })
      localStorage.setItem("todos" , JSON.stringify(updatedTodos))  
        return updatedTodos
       
        }
        //  ================ case delete ================
        // ================= case get =================
        case "get":
            {
    const localTodos = JSON.parse(localStorage.getItem("todos"));

      if (localTodos) {
        return localTodos;
           };
           break;
            }
        // ================= case get =================
        default:
            throw "UNKOWN EROR" + action.type
    }
    
}