import React, { useState } from "react"
import ReactDOM from "react-dom"
import { NavLink } from "react-router-dom"

import Home from "@material-ui/icons/Home"
import Chat from "@material-ui/icons/Chat"
import Search from "@material-ui/icons/Search"
import Person from "@material-ui/icons/Person"
import { AccountBox } from "@material-ui/icons"



const NavbarPage = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                <a className="navbar-brand" href="/ ">Social</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample09">
                    <ul className="navbar-nav mr-auto p-1 mx-3">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link">
                                <Home></Home>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/sign" className="nav-link">
                                <AccountBox></AccountBox>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/search" className="nav-link">
                                <Search></Search>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/profile" className="nav-link">
                                <Person></Person>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default NavbarPage;
