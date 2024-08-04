import { FC } from "react"
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
            <div className="main-content">
                <AddBtn onClick={toggleForm}/>
                {
                    addFormModal && <AddTaskForm setAddFormModal={setAddFormModal}/>
                }
                <TasksList />
            </div>
        </div>
    )
}

export default Main