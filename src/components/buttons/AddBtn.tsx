import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import '../style/button.css'

interface AddBtnProps {
    onClick: () => void;
}

const AddBtn: FC<AddBtnProps> = ({ onClick }) => {
    return (
        <button className="btn add-btn" onClick={onClick}><FontAwesomeIcon icon={faPlus} /></button>
    )
}

export default AddBtn