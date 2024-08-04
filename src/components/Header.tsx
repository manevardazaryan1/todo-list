import { FC, useState, useEffect, useRef, RefObject, useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListCheck, faTrash, faCheck, faCalendarXmark, faBars } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import "./style/header.css"
import logo from "../assets/logo/logo.png"

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const menuRef: RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(event.target as Node)){
         setIsMenuOpen(false)
      }
  }, [setIsMenuOpen])

  useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      };
  }, [handleClickOutside])
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header>
      <div className="container">
        <nav>
          <NavLink to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="TO DO"/>
          </NavLink> 
          <button className="burger-menu" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <ul className={`${isMenuOpen ? "active" : ""}`} ref={menuRef}>
            <li>
              <NavLink to="/"  className={({ isActive }) => (isActive ? "active-link" : "")}><FontAwesomeIcon icon={faListCheck} /></NavLink>
            </li>
            <li>
              <NavLink to="/done"  className={({ isActive }) => (isActive ? "active-link" : "")}><FontAwesomeIcon icon={faCheck} /></NavLink>
            </li>
            <li>
              <NavLink to="/overdue" className={({ isActive }) => (isActive ? "active-link" : "")}><FontAwesomeIcon icon={faCalendarXmark} /></NavLink>
            </li>
            <li>
              <NavLink to="/trash"  className={({ isActive }) => (isActive ? "active-link" : "")}><FontAwesomeIcon icon={faTrash} /></NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    )
  }
  
  export default Header
  