import React from 'react';
import '../style.css';

class NavBar extends React.Component {

    itemsHtml(id, title, menu) {
        if (menu.includes(id)) {
            return (
                <li className="nav-item">
                    <button className="border-0 navitembtn" onClick={() => this.props.changePage(id)}>{title}</button>
                </li>
            );
        }
    }

    renderItems(current) {
        return this.props.page.map((p) => (
            this.itemsHtml(p.id, p.title, this.props.page[current-1].menu)
        ));
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg justify-content-end mb-0" id="navbar">
                    <ul className="navbar-nav">
                        {this.renderItems(this.props.current)}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default NavBar;