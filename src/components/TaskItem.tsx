import { FC, useEffect, useState } from "react"
import ITask from "../Interfaces/ITask"
import Checkbox from "@mui/material/Checkbox"
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

    let isOverdue = false;
    
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
        <div >
            <div className={`task ${task.status}`}>
                {
                    editForm && <EditTaskForm task={task} closeEditForm={() => setEditForm(false)}/>
                }
                <h3>
                    <button onClick={() => settaskModal(true)}>{task.title}</button>
                </h3>
                <span>{task.status}</span>
                {
                    task.deadline && (
                        <div>
                            <span>{task.deadline}</span>
                        </div>
                    )
                }

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
                <div >
                    <EditBtn onClick={() => setEditForm(true)}/>
                    <DeleteBtn onClick={() => dispatch(del({id: task.id, from: "tasks"}))} from={"tasks"}/>
                </div>
            </div>
            <div >
                {
                    taskModal && <TaskModal task={task} closeTaskModal={() => settaskModal(false)}/>
                }
            </div>
        </div>
    )
}

export default TaskItem