import { FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import ThemeContext from "../../Context/ThemeContext"
import "./index.css"


const Header = () => (
    <ThemeContext.Consumer>
        {value => {
            const { isDarkTheme, toggleTheme } = value;
            const onClickToggleTheme = () => {
                toggleTheme();
            }

            const textColor = isDarkTheme ? "dark-text" : "light-text"

            return (
                <nav className="nav-container">
                    <h1 className={`${textColor}`}>Wordle <span className="span">Clone</span></h1>
                    <div className="nav-link">
                        <li onClick={onClickToggleTheme} className={`${textColor}`} >
                            {isDarkTheme ? (<MdOutlineWbSunny className="navIcon" />) : (<FaRegMoon className="navIcon" />)}
                        </li>
                    </div>
                </nav>
            )
        }}
    </ThemeContext.Consumer>
)

export default Header