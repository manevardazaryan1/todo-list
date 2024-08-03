import ITask from "./ITask"

export default interface ITasksState {
    tasks: ITask[];
    trash: ITask[];
}