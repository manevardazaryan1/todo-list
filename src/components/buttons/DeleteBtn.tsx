import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import '../style/button.css'

interface DeleteBtnProps {
    from: string;
    onClick: () => void;
}


const DeleteBtn: FC<DeleteBtnProps> = ({ from, onClick }) => {
    return (
        <button className="btn delete-btn"  onClick={onClick}><FontAwesomeIcon icon={faTrash} /></button>
    )
}

export default DeleteBtn