import { FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons"
import "../style/button.css"

interface RestoreBtnProps {
    onClick: () => void;
}

const RestoreBtn: FC<RestoreBtnProps> = ({ onClick }) => {
    return (
        <button className="btn delete-btn"  onClick={onClick}><FontAwesomeIcon icon={faArrowRotateLeft} /></button>
    )
}

export default RestoreBtn