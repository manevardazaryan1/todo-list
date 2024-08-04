import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../features/store/store"
import TrashTaskItem from "../components/TrashTaskItem"

const Trash: FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.trash);
    return (
        <div className="container">
            <div className="tasks-list">
                {
                    !tasks.length && 
                    <div>
                        <span className="empty">Empty Trash</span>
                    </div>
                }
                {tasks.map((task) => (
                    <TrashTaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default Trash