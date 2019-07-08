import React from 'react';
import '../style.css';

class NavBar extends React.Component {

    renderItems() {

        return this.props.page.map((p) => (
            <li className="nav-item">
                <button className="border-0 navitembtn" onClick={() => this.props.changePage(p.id)}>{p.title}</button>
            </li>
        ));
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg justify-content-end mb-0" id="navbar">
                    <ul className="navbar-nav">
                        {this.renderItems()}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default NavBar;