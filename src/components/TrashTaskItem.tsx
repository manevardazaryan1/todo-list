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
        <div className="task trash">
            <div className="task-card">
                <div className="card-header">
                    <h3 className="task-title">
                        {task.title}
                    </h3>
                    {
                        task.deadline && (
                            <div className="deadline-col">
                                <span className="task-deadline">{task.deadline}</span>
                            </div>
                        )
                    }
                </div>
                <div className="card-content">
                    <div className="task-status-col">

                        <span className="task-status">{task.status}</span>
                    </div>
                    <div className="task-edit-delete-col">
                        <div className="buttons-box">
                            <DeleteBtn onClick={() => dispatch(del({id: task.id, from: "trash"}))} from={"trash"}/>
                            <RestoreBtn onClick={() => dispatch(restore(task.id))}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrashTaskItem