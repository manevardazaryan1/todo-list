import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'; 
import '../style/button.css'

const EditBtn: FC = () => {
    return (
        <button className="btn edit-btn"><FontAwesomeIcon icon={faPen} /></button>
    )
}

export default EditBtn