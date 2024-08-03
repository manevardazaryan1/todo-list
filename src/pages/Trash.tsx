import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../features/store/store"
import TrashTaskItem from "../components/TrashTaskItem"

const Trash: FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.trash);
    return (
        <div className="tasks-list">
            {
                !tasks.length && 
                <div>
                    <span>Empty Trash</span>
                </div>
            }
            {tasks.map((task) => (
                <TrashTaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default Trash