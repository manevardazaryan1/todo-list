import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../features/store/store"
import TaskItem from "../components/TaskItem"

const OverdueTasks: FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks).filter(task => task.status === "overdue")
    
    return (
        <div className="container">
            <div className="tasks-list">
                {
                    !tasks.length && 
                    <div>
                        <span className="empty">You don't have overdue tasks.</span>
                    </div>
                }
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default OverdueTasks