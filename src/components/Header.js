import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Header.css'
import '../theme.css'

import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config'
import {  signOut } from "firebase/auth";

const Header = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    const [user, loading, error] = useAuthState(auth);

    return (
        <div className="myHeader">

            {/* --------------------------------------------------------------------- */}

            <header className="hide-when-mobile ali">

                <h1><a href="https://c4a.dev/" className='logo'>c4a.dev</a></h1>

                {/* <button className="theme-btn" onClick={() => {toggleTheme(theme === "Light" ? "Dark" : "Light")}}>{theme}</button> */}

                <i onClick={() => { toggleTheme(theme === "Light" ? "Dark" : "Light"); }} className="fa-solid fa-moon"></i>

                <i onClick={() => { toggleTheme(theme === "Light" ? "Dark" : "Light"); }} className="fa-solid fa-sun" ></i>

                <ul className="flex">

                    {!user && <li className="main-list">
                        <NavLink className="main-link" to="/sign-in">
                            Sign-in
                        </NavLink>

                    </li>}

                    {!user && <li className="main-list">
                        <NavLink className="main-link" to="/sign-up">
                            Sign-up
                        </NavLink>

                    </li>}

                    {user && <li className="main-list" onClick={() => {
                        signOut(auth).then(() => {
                            console.log("Sign-out successful.")
                        }).catch((error) => {
                            // An error happened.
                        });
                    }}>
                        <button className="main-link signout">
                            Sign-out
                        </button>
                    </li>}

                    {user && <li className="main-list">
                        <NavLink className="main-link" to="/profile"> Profile </NavLink>
                    </li>}

                    {user && <li className="main-list">
                        <NavLink className="main-link" to="/html"> HTML </NavLink>
                        {/* <ul className="sub-ul">
                            <li><a href="">Full Course</a></li>
                            <li><a href="">Crash Course</a></li>
                            <li><a href="">learn in 1h</a></li>
                        </ul> */}
                    </li>}

                    {user && <li className="main-list">
                        <NavLink className="main-link" to="/css"> CSS </NavLink>
                        {/* <ul className="sub-ul">
                            <li><a href="">Full Course</a></li>
                            <li><a href="">CSS Examples</a></li>
                            <li className="mini-projects">
                                <a href="">mini projects&nbsp; + </a>
                                <ul className="sub-sub-ul">
                                    <li><a href="">project 1</a></li>
                                    <li><a href="">project 2</a></li>
                                    <li><a href="">project 3</a></li>
                                </ul>
                            </li>
                        </ul> */}
                    </li>}

                    {user && <li className="main-list">
                        <NavLink className="main-link" to="/javascript"> JavaScript </NavLink>
                        {/* <ul className="sub-ul sub-of-js">
                            <li><a href="">coming soon&#128293;</a></li>
                        </ul> */}
                    </li>}

                </ul>

            </header>

            {/* --------------------------------------------------------------------- */}

            {/* <header className="show-when-mobile">

                <h1>Courses 4 Arab</h1>

                <label className="absolute" for="burger">
                    <i className="fas fa-bars"></i>
                </label>

                <input id="burger" type="checkbox" />

                <div className="show-on-click">

                    <div className="main-div">
                        <label for="html">HTML <i className="fas fa-plus"></i> </label>
                        <input id="html" type="checkbox" />
                        <ul className="sub-div">
                            <li><a href="">Full Course</a></li>
                            <li><a href="">Crash Course</a></li>
                            <li><a href="">learn in 1h</a></li>
                        </ul>
                    </div>

                    <div className="main-div">
                        <label for="css">CSS <i className="fas fa-plus"></i> </label>
                        <input id="css" type="checkbox" />
                        <ul className="sub-div">
                            <li><a href="">Full Course</a></li>
                            <li><a href="">CSS Examples</a></li>
                            <li>
                                <label className="mini-projects" for="mini">mini projects <i className="fas fa-plus"></i> </label>
                                <input id="mini" type="checkbox" />
                                <ul className="sub-sub-div">
                                    <li><a href="">project 1</a></li>
                                    <li><a href="">project 2</a></li>
                                    <li><a href="">project 3</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="main-div">
                        <label for="js">JavaScript <i className="fas fa-plus"></i> </label>
                        <input id="js" type="checkbox" />
                        <ul className="sub-div">
                            <li><a href="">coming soon&#128293;</a></li>
                        </ul>
                    </div>

                </div>

            </header> */}

            {/* --------------------------------------------------------------------- */}

        </div>
    )
}

export default Header;