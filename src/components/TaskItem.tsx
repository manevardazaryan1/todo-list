import { FC, useEffect, useState } from "react"
import ITask from "../Interfaces/ITask"
import Checkbox from "@mui/material/Checkbox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { markAsCompleted, markAsOverdue, del } from "../features/slices/ToDoSlice"
import EditBtn from "./buttons/EditBtn"
import EditTaskForm from "./forms/EditTaskForm"
import DeleteBtn from "./buttons/DeleteBtn"
import TaskModal from "./TaskModal"
import "./style/task.css"

interface ITaskListProps {
    task: ITask;
}

const TaskItem: FC<ITaskListProps> = ({ task }) => {
    const dispatch = useDispatch()
    const [editForm, setEditForm] = useState<boolean>(false)
    const [taskModal, settaskModal] = useState<boolean>(false)

    let isOverdue = false
    
    if (
        task.status !== "completed" &&
        task.deadline &&
        typeof task.deadline === "string"
    ) {
        const deadlineDate = new Date(task.deadline)
        isOverdue = (deadlineDate < new Date() && 
                    deadlineDate.toISOString().split("T")[0] !== new Date().toISOString().split("T")[0])
    }

    useEffect(() => {
        if (isOverdue) {
            dispatch(markAsOverdue(task.id))
        }
    }, [dispatch, isOverdue, task.id])

    const formik = useFormik({
        initialValues: {
          isChecked: task.status === "completed",
        },
        onSubmit: (values) => {
            dispatch(markAsCompleted(task.id))
        }
    })

    return (
        <>
            <div className={`task ${task.status}`}>
                <div className="task-card">
                    <div className="card-header" onClick={() => settaskModal(true)}>
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
                        <div className="card-icon-col">
                            <FontAwesomeIcon icon={faCircleChevronRight} />
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="task-status-col">
                            {
                                task.status !== "overdue" &&     
                                <form onSubmit={formik.handleSubmit}>
                                    <Checkbox
                                        checked={formik.values.isChecked && task.status === "completed"}
                                        onChange={(event) => {
                                            formik.handleSubmit()
                                            formik.setFieldValue("isChecked", event.target.checked);
                                        }}
                                    />
                                </form>
                            }
                            <span className="task-status">{task.status}</span>
                        </div>
                        <div className="task-edit-delete-col">
                            <div className="buttons-box">
                                <EditBtn onClick={() => setEditForm(true)}/>
                                <DeleteBtn onClick={() => dispatch(del({id: task.id, from: "tasks"}))} from={"tasks"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                editForm && <EditTaskForm task={task} closeEditForm={() => setEditForm(false)}/>
            }

            {
                taskModal && <TaskModal task={task} closeTaskModal={() => settaskModal(false)}/>
            }
        </>
    )
}

export default TaskItem