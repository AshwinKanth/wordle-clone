import Popup from 'reactjs-popup'
import { FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
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
                        <div>
                            <Popup
                                modal
                                trigger={
                                    <li className={` navItem ${textColor}`}>
                                        <FaQuestionCircle className="navIcon" />
                                    </li>
                                }
                            >
                                {close => (

                                    <div className="popup-container">
                                        <p className={`popupDescription ${textColor}`}>Game Instructions</p>

                                        <div className='instructions'>
                                            <p className='GreenColor colorDef'></p>
                                            <p className={`instructions-description ${textColor}`}>Correct letter in the correct position.</p>
                                        </div>
                                        <div className='instructions'>
                                            <p className='yellowColor colorDef'></p>
                                            <p className={`instructions-description ${textColor}`}>Correct letter in the correct position.</p>
                                        </div>
                                        <div className='instructions'>
                                            <p className='grayColor colorDef'></p>
                                            <p className={`instructions-description ${textColor}`}>Correct letter in the correct position.</p>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="trigger-button"
                                                onClick={() => close()}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                        <li onClick={onClickToggleTheme} className={` navItem ${textColor}`}  >
                            {isDarkTheme ? (<MdOutlineWbSunny className="navIcon" />) : (<FaRegMoon className="navIcon" />)}
                        </li>
                    </div>
                </nav>
            )
        }}
    </ThemeContext.Consumer>
)

export default Header