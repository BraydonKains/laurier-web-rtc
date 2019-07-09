import React from 'react';
import '../style.css';

class About extends React.Component {


  render() {
      return (
        <div className='centerwhite px-3 pt-0 container'>
            <div className='ml-3'>
              <h1>About Page</h1>
              <p>
                Web-RTC project by Braydon Kains, Fa Fa Ke, and Stephanie Pitman
              </p>
            </div> 
        </div>
      );
  }
}

export default About;