import React, {FC} from 'react';
import Main from '../pages/Main';
import Trash from '../pages/Trash';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const AppRoutes: FC = () => {
  return (
    <>
        <Header />
        <Router >
            <Routes >
            <Route path="/" element={<Main />}/>
            <Route path="/trash" element={<Trash />}/>
            <Route /> 
            </Routes>
        </Router>
    </>
  );
}

export default AppRoutes;