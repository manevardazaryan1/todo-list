import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import '../style/button.css'

const DeleteBtn: FC = () => {
    return (
        <button className="btn delete-btn"><FontAwesomeIcon icon={faTrash} /></button>
    )
}

export default DeleteBtn