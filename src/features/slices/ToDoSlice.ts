import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import ITask from "../../Interfaces/ITask"
import ITasksState from "../../Interfaces/ITasksState"
import IDelTask from "../../Interfaces/IDelTask"

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
        state.tasks.unshift(newTask)
      },

      edit: (state, action: PayloadAction<ITask>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      },

      del: (state, action: PayloadAction<IDelTask>) => {
        if (action.payload.from === "tasks") {
          const deletedTask = state.tasks.find(task => task.id === action.payload.id)
          state.tasks = state.tasks.filter((task) => task.id !== action.payload.id)
  
          if (deletedTask) {
            state.trash.unshift(deletedTask)
          }
        }else {
          state.trash = state.trash.filter((task) => task.id !== action.payload.id)
        }
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
            task.status = "overdue"
        }
      },

      restore: (state, action: PayloadAction<number>) => {
        const task = state.trash.find(task => task.id === action.payload)
        console.log(task)
        if (task) {
          state.trash = state.trash.filter(item => item.id !== action.payload)
          state.tasks.unshift(task)
        }
        console.log(state.trash)
      },
    },
  })
  
  export const { add, edit, del, markAsCompleted, markAsOverdue, restore } = tasksSlice.actions
  export default tasksSlice.reducer