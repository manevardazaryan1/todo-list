import { FC } from "react"
import "./style/header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListCheck, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const Header: FC = () => {
    return (
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to="/">Tasks <FontAwesomeIcon icon={faListCheck} /></Link>
              </li>
              <li>
                <Link to="/trash"><FontAwesomeIcon icon={faTrash} /></Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  