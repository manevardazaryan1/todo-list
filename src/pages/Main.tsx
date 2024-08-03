import { FC, useEffect } from "react"
import { useState } from "react"
import AddTaskForm from "../components/forms/AddTaskForm"
import AddBtn from "../components/buttons/AddBtn"
import TasksList from "../components/TasksList"

const Main: FC = () => {

    const [addFormModal, setAddFormModal] = useState<boolean>(false)

    const toggleForm = (): void => {
        setAddFormModal(!addFormModal)
    }

    return (
        <div className="container">
            <AddBtn onClick={toggleForm}/>
            {
                addFormModal && <AddTaskForm setAddFormModal={setAddFormModal}/>
            }
            <TasksList />
        </div>
    )
}

export default Main