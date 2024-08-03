import { FC } from "react"
import ITask from "../Interfaces/ITask"
import { useDispatch } from "react-redux"
import DeleteBtn from "./buttons/DeleteBtn"
import RestoreBtn from "./buttons/RestoreBtn"
import { del, restore } from "../features/slices/ToDoSlice"

interface ITaskListProps {
    task: ITask;
}

const TrashTaskItem: FC<ITaskListProps> = ({ task }) => {
    const dispatch = useDispatch()

    return (
        <div className="task">
            <h3>{task.title}</h3>
            <span>{task.status}</span>
            {
                task.deadline && (
                    <div>
                        <span>{task.deadline}</span>
                    </div>
                )
            }
            <div >
                <DeleteBtn onClick={() => dispatch(del({id: task.id, from: "trash"}))} from={"trash"}/>
                <RestoreBtn onClick={() => dispatch(restore(task.id))}/>
            </div>
        </div>
    )
}

export default TrashTaskItem