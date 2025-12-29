
export default function TodoItem({task, onToggle, onEdit, onDelete}){
        return (
        <li
        onClick={onToggle}
         style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "white",
                    marginBottom: "10px",
                    padding: "12px",
                    borderRadius: "12px",
                    cursor:"pointer",
                    textDecoration: task.done ? "line-through"  : "none",
                    color: task.done ? "green"  : "inherit",
                    transition: "transform 0.1s",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    borderLeft: task.done ? "5px solid #ff4d6d" : "5px solid #ffb3c1"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                    
                    <span style={{ 
                        flex: 1, 
                        textAlign: "left",
                        textDecoration: task.done ? "line-through" : "none",
                        color: task.done ? "#adb5bd" : "#495057",
                    }}>
                        {task.text} {task.done && "🏆"}
                    </span>

                    <div style={{ display: "flex", gap: "5px" }}>
                    
                    <button 
                    onClick= {(e) => { 
                        e.stopPropagation();
                        onEdit()}}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
                    >{task.done ? '📝' : '✏️'}</button>

                    <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete()}}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
                    >{task.done ? '🗑️' :'✖️'} </button>
                    
                    </div>

        

        </li>
        )}