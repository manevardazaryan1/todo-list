import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../features/store/store"
import TaskItem from "../components/TaskItem"

const CompletedTasks: FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks).filter(task => task.status === "completed")
    
    return (
        <div className="container">
            <div className="tasks-list">
                {
                    !tasks.length && 
                    <div className="empty">
                        <span>You haven't completed any tasks yet.</span>
                        <span>Let's get started!</span>
                    </div>
                }
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default CompletedTasks