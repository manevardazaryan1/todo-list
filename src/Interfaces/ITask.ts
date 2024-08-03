export default interface ITask {
    id: number;
    title: string;
    description?: string;
    deadline?: String;
    status: "pending" | "completed" | "overdue" | "removed";
}