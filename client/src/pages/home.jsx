import React from 'react';
import frontTop from '../assets/spafront2.jpg';

function Home() {
  return (
    <div className="homeOverall">
      <div className="containerOne">
        <img src={frontTop} alt="" />
        <div class="text-overlay">
          <h2>schedule now basest spa</h2>
          <p>best basest courses available right now</p>
        </div>
      </div>
      <div className="containerTwo">
        <div class="text-overlay">
          <h2>Text over image</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <footer className="footer">at copyright to this website. 2023</footer>
    </div>
  );
}

export default Home;
