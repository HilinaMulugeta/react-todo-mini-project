import {useState} from 'react';
import TodoItem from './components/TodoItem';

export default function TodoApp(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editId, setEditId] = useState(null);
    const [filter, setFilter] = useState("all");
    
     const handleAddTask = () => {
     if(editId !== null){
        setTasks(tasks.map(task => task.id === editId ? {...task, text:newTask}: task))
        setEditId(null);
     }
     else{
        if (!newTask.trim()) return;
        setTasks([...tasks, {id:Date.now(), text:newTask, done: false}]);
     }
     setNewTask("");
   }


    const handleDeleteTask = (deleteId) => {
        setTasks(tasks.filter(task => task.id !== deleteId));
    }

    const handleEditTask = (editId) => {
        const taskToEdit = tasks.find(task => task.id === editId);
        if(!taskToEdit) return;

        setEditId(editId);
        setNewTask(taskToEdit.text);
    }
  

    const handleToggleTask = (toggleId) => {
        setTasks(tasks.map(task => task.id === toggleId ? 
        {...task, done: !task.done} : task
    ))
       
    }

    const filteredTasks = tasks.filter(task => {
        if(filter === "active") return !task.done;
        if(filter === "completed") return task.done;
        return true;
    });

   
    

    return(
        <div 
        style={{
            maxWidth:"400px", 
            margin:"50px auto" , 
            backgroundColor:"#fff0f3", // Soft blush,
            padding:"30px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            textAlign: "center"
            }}>

        <h2 style={{color: "#ff4d6d", marginBottom: "20px"}}>My Todo App</h2>
        
        {/* Input Area */}
    <div style={{ marginBottom: "25px", display: "flex", gap: "10px" }}>
        <input
         type="text"
         placeholder="write your task here"
         value={newTask}
         onChange={(e) => setNewTask(e.target.value)}
         style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border:"2px solid #ffb3c1",
            outline:"none",
            fontSize: "16px"
         }}
        /> 
        <button 
        onClick={handleAddTask}
        style={{
            padding: "10px 15px",
          backgroundColor: "#ff4d6d",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
        >
            {editId !== null ?"💾" : "➕"}
            
        </button>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginBottom: "20px" }}>
           {['all', 'active', 'completed'].map((f) => (
        <button 
          key={f}
          onClick={() => setFilter(f)}
          style={{
            padding: "5px 12px",
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "20px",
            border: "1px solid #ffb3c1",
            backgroundColor: filter === f ? "#ffb3c1" : "white",
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          {f}
        </button>
      ))}




      </div>
        {tasks.length === 0 && ( <p style={{ color: "#a38080" }}>No tasks yet. Add one 👆</p>)}
              <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredTasks.map((task, id) => (
                <TodoItem 
                key={task.id}
                task={task}
                onToggle={() => handleToggleTask(task.id)}
                onEdit={() => handleEditTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}             
                />
            ))}
        </ul>
        </div>
    )
}