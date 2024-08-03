import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../features/store/store"
import TaskItem from "../components/TaskItem"

const CompletedTasks: FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks).filter(task => task.status === "completed")
    
    return (
        <div className="tasks-list">
            {
                !tasks.length && 
                <div>
                    <span>You don't have completed tasks.</span>
                </div>
            }
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default CompletedTasks