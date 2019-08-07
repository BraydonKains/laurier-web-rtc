import React from 'react';
import '../style.css';
import { Link } from "react-router-dom";

const items = {
    1 : ["Home", "/home"],
    2 : ["Sign Up", "/signup"],
    3 : ["Log In", "/"],
    4 : ["Two Person Chat", "/twopersonchat"],
    5 : ["Sign Out", "/"],
    6 : ["About", "/about"]
}

class NavBar extends React.Component {

    itemsHtml(title, toVal) {
        return (
            <li className="nav-item">
                <Link to={toVal}>
                    <button className="border-0 navitembtn">
                        {title}
                    </button>
                </Link>
                
            </li>
        );

    }

    renderItems(menu) {
        return (menu.map((p) => (
             this.itemsHtml(items[p][0], items[p][1])
        )));
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg justify-content-end mb-0" id="navbar">
                    <ul className="navbar-nav">
                        {this.renderItems(this.props.menu)}
                    </ul>
                </nav>
            </div>         
        );
    }
}

export default NavBar;