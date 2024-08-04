import { FC, useEffect, useRef, useCallback } from "react"
import { useFormik } from "formik"
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { DateTime } from "luxon"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import validationSchema from "../../schema/validationSchema"
import IFormValues from "../../Interfaces/IFormValues"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import ITask from "../../Interfaces/ITask"
import { edit } from "../../features/slices/ToDoSlice"
import "../style/form-modal.css"

interface EditTaskFormProps {
    task: ITask;
    closeEditForm: () => void;
}
  
const EditTaskForm: FC<EditTaskFormProps> = ({ task, closeEditForm }) => {
    const dispatch = useDispatch();

    const modalRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = useCallback((event: MouseEvent) => {
        const target = event.target as Node

        if (modalRef.current === target){
           closeEditForm()
        }
    }, [closeEditForm])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [handleClickOutside])

    const formik = useFormik<IFormValues>({
        initialValues: {
          title: task.title,
          description: task.description || "",
          deadline: new Date(),
        },
        validationSchema,
        onSubmit: (values: IFormValues) => {
            dispatch(edit({...values, id: task.id, status: "pending", deadline: new Date(values.deadline).toISOString().split("T")[0]}))
            closeEditForm()
        },
    })

    return (
        <div className="edit-task-modal form-modal" ref={modalRef}>
            <div className="modal-header">
                <h4>EDIT</h4>
                <button onClick={() => closeEditForm()} className="close-modal"><FontAwesomeIcon icon={faXmark} /></button>
            </div>
            <h3>Edit task</h3>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Task Title"
                    variant="outlined"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}

                    helperText={formik.touched.title && formik.errors.title}

                />
                <TextField
                    id="outlined-multiline-static"
                    label="Task Description"
                    multiline
                    rows={4}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}

                    helperText={formik.touched.description && formik.errors.description}
                />
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DatePicker
                    label="Task Deadline"
                    value={formik.values.deadline ? DateTime.fromJSDate(new Date(formik.values.deadline)) : null}
                    onChange={(value: DateTime | null) => formik.setFieldValue("deadline", value ? value.toJSDate() : null)}
                    format="yyyy-MM-dd"
                    minDate={DateTime.now()}
                    aria-label="Select task deadline"
                />
                </LocalizationProvider>
                <Button type="submit" variant="contained">
                    Edit
                </Button>
            </form>
        </div>
    )
}

export default EditTaskForm