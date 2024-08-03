import { FC, useEffect, useRef, useCallback } from "react"
import { useFormik } from "formik"
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import validationSchema from "../../schema/validationSchema"
import IFormValues from "../../Interfaces/IFormValues"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { add } from "../../features/slices/ToDoSlice"
import "../style/form-modal.css"

interface AddTaskFormProps {
    setAddFormModal: (value: boolean) => void;
}

const AddTaskForm: FC<AddTaskFormProps> = ({ setAddFormModal }) => {
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        const target = event.target as Node;

        if (modalRef.current === target){
           setAddFormModal(false);
        }
    }, [setAddFormModal])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside])


    const formik = useFormik<IFormValues>({
        initialValues: {
          title: "",
          description: "",
          deadline: new Date(),
        },
        validationSchema,
        onSubmit: (values: IFormValues) => {
            dispatch(add({...values, status: "pending", deadline: new Date(values.deadline).toISOString().split("T")[0]}))
            setAddFormModal(false)
        },
    });

    return (
        <div className="task-form-modal form-modal" ref={modalRef}>
            <h3>Add task</h3>
            <button onClick={() => setAddFormModal(false)} className="close-modal"><FontAwesomeIcon icon={faXmark} /></button>
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Task Deadline"
                    value={new Date(formik.values.deadline)}
                    onChange={(value: Date | null) => formik.setFieldValue('deadline', value)}
                    format="yyyy-MM-dd"
                />
                </LocalizationProvider>
                <Button type="submit" variant="contained">Add</Button>
            </form>
        </div>
    )
}

export default AddTaskForm