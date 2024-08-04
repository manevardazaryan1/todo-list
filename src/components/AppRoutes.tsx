import React, {FC} from "react"
import Main from "../pages/Main"
import Trash from "../pages/Trash"
import CompletedTasks from "../pages/CompletedTasks"
import Header from "./Header"
import OverdueTasks from "../pages/OverdueTasks"
import { BrowserRouter, Routes, Route} from "react-router-dom"

const AppRoutes: FC = () => {
  return (
    <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/done" element={<CompletedTasks />} />
            <Route path="/overdue" element={<OverdueTasks />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default AppRoutes;