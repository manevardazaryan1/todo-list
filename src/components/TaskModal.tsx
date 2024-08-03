import { FC, useEffect, useState, useRef } from "react"
import ITask from "../Interfaces/ITask"
import Checkbox from "@mui/material/Checkbox"
import { useFormik } from "formik"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
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

    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

        if (modalRef.current === target){
            closeTaskModal();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
          isChecked: false,
        },
        onSubmit: (values) => {
            dispatch(markAsCompleted(task.id))
        }
      });

    return (
        <div className="task-modal" ref={modalRef}>
            <div className="task-modal-content">
                <button onClick={() => closeTaskModal()} className="close-modal"><FontAwesomeIcon icon={faXmark} /></button>
                {
                    editForm && <EditTaskForm task={task} closeEditForm={() => setEditForm(false)}/>
                }
                <h3>{task.title}</h3>
                <p>{task.description}</p>
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
                            checked={formik.values.isChecked}
                            onChange={(event) => {
                                formik.setFieldValue('isChecked', event.target.checked)
                                formik.handleSubmit()
                            }}
                        />
                </form>
                }
                <div >
                    <EditBtn onClick={() => setEditForm(true)}/>
                    <DeleteBtn onClick={() => dispatch(del({id: task.id, from: "tasks"}))} from={"tasks"}/>
                </div>
            </div>
        </div>
    )
}

export default TaskModal