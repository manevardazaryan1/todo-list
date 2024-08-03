import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store/store';
import TaskItem from './TaskItem';

const TasksList: FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    return (
        <div className="tasks-list">
        {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
        ))}
        </div>
    )
}

export default TasksList