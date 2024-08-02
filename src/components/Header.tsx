import { FC } from 'react';
import './style/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faTrash } from '@fortawesome/free-solid-svg-icons'; 

const Header: FC = () => {
    return (
      <header>
        <div className="container">
            <nav>
                <ul>
                    <li>
                    <a href="/">Tasks <FontAwesomeIcon icon={faListCheck} /></a>
                    </li>
                    <li>
                    <a href="/trash"><FontAwesomeIcon icon={faTrash} /></a>
                    </li>
                </ul>
            </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  