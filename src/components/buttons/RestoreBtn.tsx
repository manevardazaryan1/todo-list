import { FC } from "react"
import "../style/button.css"

interface RestoreBtnProps {
    onClick: () => void;
}


const RestoreBtn: FC<RestoreBtnProps> = ({ onClick }) => {
    return (
        <button className="btn delete-btn"  onClick={onClick}>Restore</button>
    )
}

export default RestoreBtn