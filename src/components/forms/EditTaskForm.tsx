import { FC, } from "react"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
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
    const today = new Date().toISOString().split("T")[0]

    const formik = useFormik<IFormValues>({
        initialValues: {
          title: task.title,
          description: task.description || "",
          deadline: today,
        },
        validationSchema,
        onSubmit: (values: IFormValues) => {
            dispatch(edit({...values, id: task.id, status: "pending"}))
            closeEditForm()
        },
    });

    return (
        <div className="edit-task-modal form-modal">
            <button onClick={() => closeEditForm()} className="close-modal"><FontAwesomeIcon icon={faXmark} /></button>
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
                <TextField
                    id="date"
                    label="Task Deadline"
                    type="date"
                    name="deadline" 
                    defaultValue={today}
                    onChange={formik.handleChange}
                    inputProps={{ min: today }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" variant="contained">
                    Edit
                </Button>
            </form>
        </div>
    )
}

export default EditTaskForm