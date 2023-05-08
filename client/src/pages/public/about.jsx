import React from 'react';
import aboutImage from '../../assets/about.jpg';

function About() {
  return (
    <div className="containerAbout">
      <h1>About Based Spa</h1>
      <div className="aboutParagraphContainer">
        <p className="descriptionAbout">
          Welcome to Based Spa, the ultimate destination for relaxation and
          rejuvenation. Our luxurious spa is designed to offer you an escape
          from the hustle and bustle of everyday life, providing a tranquil and
          peaceful atmosphere where you can unwind and pamper yourself.
        </p>
        <p className="descriptionAbout">
          At Based Spa, we believe in using only the finest natural ingredients
          in our treatments, ensuring that you receive the highest quality care
          for your skin and body. From soothing massages to invigorating
          facials, our expert therapists are dedicated to providing you with a
          personalized experience that will leave you feeling refreshed and
          renewed.
        </p>
        <p className="descriptionAbout">
          Whether you're looking for a quick pick-me-up or a full day of
          indulgence, we have something for everyone. Come visit us at Based Spa
          and discover the true meaning of relaxation.
        </p>
      </div>
      <img src={aboutImage} alt="Example image" className="imageAbout" />
    </div>
  );
}

export default About;
