import { FC, useEffect } from 'react';
import ITask from '../Interfaces/ITask';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { markAsCompleted, markAsOverdue } from '../features/slices/ToDoSlice';

interface TaskListProps {
    task: ITask;

}
const TaskItem: React.FC<TaskListProps> = ({ task }) => {
    const dispatch = useDispatch();
    let isOverdue = false;
    
    if (
        task.status !== 'completed' &&
        task.deadline &&
        typeof task.deadline === 'string'
      ) {
        const deadlineDate = new Date(task.deadline);
        isOverdue = deadlineDate < new Date();
      }

    useEffect(() => {
        if (isOverdue) {
            dispatch(markAsOverdue(task.id));
        }
    }, [dispatch, isOverdue, task.id]);

    const formik = useFormik({
        initialValues: {
          isChecked: false,
        },
        onSubmit: (values) => {
            dispatch(markAsCompleted(task.id));
        }
      });

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
            {isOverdue && <span style={{ color: 'red' }}>**Overdue**</span>}
            {
                task.status !== "overdue" &&     
                <form onSubmit={formik.handleSubmit}>
                    <Checkbox
                        checked={formik.values.isChecked}
                        onChange={(event) => {
                            formik.setFieldValue('isChecked', event.target.checked);
                            formik.handleSubmit()
                        }}
                    />
              </form>
            }

        </div>
    )
}

export default TaskItem