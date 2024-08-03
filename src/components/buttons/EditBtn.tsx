import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'; 
import '../style/button.css'

interface EditBtnProps {
    onClick: () => void;
}

const EditBtn: FC<EditBtnProps> = ({ onClick }) => {
    return (
        <button className="btn edit-btn" onClick={onClick}><FontAwesomeIcon icon={faPen} /></button>
    )
}

export default EditBtn