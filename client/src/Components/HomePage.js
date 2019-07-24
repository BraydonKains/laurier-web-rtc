import React from 'react';
import '../style.css';
import NavBar from './NavBar';

class HomePage extends React.Component {

  state = {
    menu : [4,5]
  }

  render() {
      return (
        <div className='background'> 
            <NavBar menu={this.state.menu} />
            <div className='centerwhite px-3 pt-0 container'>
              <div className="centerwhite">
              </div>
            </div>
        </div>
      );
  }
}

export default HomePage;