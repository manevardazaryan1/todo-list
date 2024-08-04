import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../features/store/store"
import TaskItem from "./TaskItem"
import './style/tasks.css'

const TasksList: FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    return (
        <div className="tasks-list">
            {
                !tasks.length && 
                <div>
                    <div className="empty">
                        <span>Your to-do list is empty.</span>
                        <span>Let's add something to do!</span>
                        </div>
                </div>
            }
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default TasksList