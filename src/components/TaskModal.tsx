import { FC, useEffect, useState, useRef, useCallback } from "react"
import ITask from "../Interfaces/ITask"
import Checkbox from "@mui/material/Checkbox"
import { useFormik } from "formik"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { markAsCompleted, markAsOverdue, del } from "../features/slices/ToDoSlice"
import EditBtn from "./buttons/EditBtn"
import EditTaskForm from "./forms/EditTaskForm"
import DeleteBtn from "./buttons/DeleteBtn"
import "./style/task-modal.css"

interface ITaskModalProps {
    task: ITask;
    closeTaskModal: () => void;
}

const TaskModal: FC<ITaskModalProps> = ({ task, closeTaskModal }) => {
    const dispatch = useDispatch();
    const [editForm, setEditForm] = useState<boolean>(false)

    const modalRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = useCallback((event: MouseEvent) => {
        const target = event.target as Node;

        if (modalRef.current === target){
           closeTaskModal()
        }
    }, [closeTaskModal])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [handleClickOutside])

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
      });

    return (
        <div className="task-modal" ref={modalRef}>
            <div className="modal-header">
                <h4>ADD</h4>
                <button onClick={() => closeTaskModal()} className="close-modal"><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <div className="task-card">
                <div className="card-header">
                    <h3 className="task-title">
                        {task.title}
                    </h3>
                    {
                        task.deadline && (
                            <div className="deadline-col">
                                <span className="task-deadline">
                                     <FontAwesomeIcon icon={faCalendarDays} />
                                </span>
                                <span className="task-deadline">
                                    {task.deadline}
                                </span>
                            </div>
                        )
                    }
                </div>
                <div className="card-content">
                    <div className="card-description">
                        <h4 className="card-description-title">Description</h4>
                        <p>{task.description}</p>
                    </div>
                    <div className="task-status-col">
                    {
                        task.status !== "overdue" &&     
                        <form onSubmit={formik.handleSubmit}>
                            <Checkbox
                                checked={formik.values.isChecked}
                                onChange={(event) => {
                                    formik.setFieldValue('isChecked', event.target.checked)
                                    formik.handleSubmit()
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
            {
                editForm && <EditTaskForm task={task} closeEditForm={() => setEditForm(false)}/>
            }
        </div>
    )
}

export default TaskModal