export default function Todo({ todo, handleCheck, handleDelete,handleEdit }) {
    const handleCheckClick = () =>{
         handleCheck(todo.id);
         
    }
    const handleDeleteBtnClick = () =>{
      const isConfirmed = confirm("هل انت تريد حذف هذه المهمه؟");

    if (isConfirmed) {
    handleDelete(todo.id);
  }
    }
  //   =================== handle edit clik =========
    const handleEditClick = () =>{
      const newTitle = prompt("ما هو اسم المهمه الجديد؟");
      if (newTitle == null) return;
      handleEdit(todo.id , newTitle)
    }
  // ============= handle edit click ====================
  return (
   <div className="flex flex-col gap-3 py-6 items-center">
 
             <div
            className={`transition-all w-[90%] p-4 rounded-lg shadow flex justify-between items-center ${
             todo.isCompleted ? "bg-green-300" : "bg-white"
            }`}
            >
            <div>
              <h1 className="font-bold text-xl pl-15 font-[ReadexBold]">{todo.title}</h1>

              <div className="text-sm text-gray-600 flex gap-2 items-center mt-1">
                <i className="fa-regular fa-calendar"></i>
                <span>{new Date(todo.details).toLocaleString("ar-EG")}</span>
              </div>
            </div>
            <div className="flex gap-3">
                {/* check icon btn */}
            <button onClick={() =>{
               handleCheckClick();
            }} className={`cursor-pointer w-10 h-10 ${todo.isCompleted ?  "bg-red-700": "bg-green-600"} text-white rounded-full`}>
                {
                    
            todo.isCompleted ? ( <i className="fa-solid fa-x"></i>): ( <i className="fa-solid fa-check"></i>)  
                }
                
            </button>
                {/* edit icon button */}
              <button onClick={() =>{
                handleEditClick();
              }} className="cursor-pointer w-10 h-10 bg-blue-600 text-white rounded-full">
                <i className="fa-solid fa-pen"></i>
              </button>
                    {/* delete icon button */}
              <button onClick={() =>{
                handleDeleteBtnClick();
              }} className="cursor-pointer w-10 h-10 bg-red-700 text-white rounded-full">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
            
          </div>
            

        </div>
  );
}