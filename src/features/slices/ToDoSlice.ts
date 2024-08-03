import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import ITask from "../../Interfaces/ITask"
import ITasksState from "../../Interfaces/ITasksState"

const initialState: ITasksState = {
    tasks: [],
    trash: [],
}

const tasksSlice = createSlice({
    name: "tasks/slice",
    initialState,
    reducers: {
      add: (state, action: PayloadAction<Omit<ITask, "id">>) => {
        const newTask = {
          ...action.payload,
          id: Date.now(),
  
        }
        state.tasks.push(newTask)
      },

      edit: (state, action: PayloadAction<ITask>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      },

      del: (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      },

      markAsCompleted: (state, action: PayloadAction<number>) => {
        const task = state.tasks.find((task) => task.id === action.payload)
        if (task) {
            if (task.status === "completed") {
                task.status = "pending"
            } else {
                task.status = "completed"
            }
        }
      },

      markAsOverdue: (state, action: PayloadAction<number>) => {
        const task = state.tasks.find((task) => task.id === action.payload)
        if (task) {
            task.status = 'overdue'
        }
      },
    },
  })
  
  export const { add, edit, del, markAsCompleted, markAsOverdue } = tasksSlice.actions
  export default tasksSlice.reducer