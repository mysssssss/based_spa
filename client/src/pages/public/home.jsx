import React, { useState } from 'react';
// import frontTop from '../assets/spafront2.jpg';
import giftCard from '../../assets/giftCard.jpg';
import spaMenu from '../../assets/spaMenu.png';
import reserveOnline from '../../assets/reservingOnline.jpg';
import onlineShopping from '../../assets/onlineShopping.jpg';
import spaFront from '../../assets/spafront3.png';
import googleReviews from '../../assets/googleReviews.png';
import yelpReviews from '../../assets/yelpReviews.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';

import twitter from '../../assets/twitter.png';

import emailImage from '../../assets/email.png';
import spaBottom from '../../assets/spaBottom.jpg';

import axios from 'redaxios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post('/api/v1/newsletter', {
        name: name,
        email: email,
      })
      .then(() => {
        alert('Subscription successful!');
        setName('');
        setEmail('');
      })
      .catch((error) => {
        console.error('Error sending subscription request:', error);
      });
  }

  return (
    <div>
      <div className="topFront">
        <div className="imageAndReserve">
          <img src={spaFront} alt="" className="mainFrontImage" />
        </div>
        <div className="textOverFrontImage">
          <Link to="/booking_courses">
            <button className="reserveButton">reserve now</button>
          </Link>
        </div>
      </div>
      <div className="frontPageMenu">
        <div className="menuItem">
          {' '}
          <Link className="linkFrontPage" to="/courses_description">
            <img src={spaMenu} alt="" srcset="" />
            <h4>Spa Menu</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio non
              hic tenetur voluptates aperiam quia esse porro
            </p>{' '}
          </Link>
        </div>

        <div className="menuItem">
          {' '}
          <Link className="linkFrontPage" to="/products">
            <img src={giftCard} alt="" srcset="" />
            <h4>Gift Cards</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio non
              hic tenetur voluptates aperiam quia esse porro
            </p>
          </Link>
        </div>
        <div className="menuItem">
          {' '}
          <Link className="linkFrontPage" to="/booking_courses">
            <img src={reserveOnline} alt="" />
            <h4>Reserve Spa</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio non
              hic tenetur voluptates aperiam quia esse porro
            </p>{' '}
          </Link>
        </div>
        <div className="menuItem">
          {' '}
          <Link className="linkFrontPage" to="/contact">
            <img src={onlineShopping} alt="" />
            <h4>Contact</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio non
              hic tenetur voluptates aperiam quia esse porro
            </p>{' '}
          </Link>
        </div>
      </div>
      <div className="frontReputationGoal">
        <div className="frontGoal">
          <h4>Our Vision</h4>
          <p>
            Our vision at Based Spa is simple. We strive to bring balance,
            healing and wellness through the profound power of touch.
          </p>
          <p>
            {' '}
            We take the time to care for each client by listening to their
            concerns and focusing 100% on each individual.
          </p>
          <p>
            At our spa you will get the very best and most relaxing experience.
            When you enter our doors, you will experience an amazing spa
            getaway.
          </p>
          {/* <button>Read Reviews</button> */}
        </div>
        <div className="frontReputation">
          <h4>Our Reputation</h4>
          <p>
            We are proud to have earned 5 star reviews on Yelp, GooglePlus,
            Facebook and TripAdvisor. These reviews are an indicator why clients
            return to our downtown Boca Raton location.
          </p>
          <p>
            Earning 5 star reviews on Yelp, GooglePlus, Facebook and TripAdvisor
            is something we are extremely proud of.
          </p>
          <p>
            We invite you to read for yourself what people are saying about
            Based Spa.
          </p>
          <div className="reputationImages">
            <Link to="https://www.google.com/">
              {' '}
              <img src={googleReviews} alt="google reviews image" />
            </Link>
            <Link to="https://www.yelp.com/">
              <img src={yelpReviews} alt="yelp reviews image" />
            </Link>
          </div>

          {/* <button>Read Reviews</button> */}
        </div>
      </div>{' '}
      <div className="frontButtons">
        <button>About Us</button>

        <button>Read Reviews</button>
      </div>
      <div className="frontNewsletter">
        <h4>sign up for newsletter</h4>
        <p>
          Enter your email to receive coupons, discounts, special offers and
          news{' '}
        </p>
        {/* <form action="submit"> */}
        <div
          className="nameAndEmail"
          style={{
            display: 'flex',
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              marginRight: '15px',
            }}
          >
            <TextField
              id="outlined-basic"
              label="name"
              variant="outlined"
              type="name"
              // className="nameInput"
              margin="normal"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            type="email"
            margin="normal"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            // className="emailInput"
          />
        </div>
        <button onClick={handleSubmit} type="submit">
          submit
        </button>
        {/* </form> */}
      </div>{' '}
      {/* </Box> */}
      <div className="frontHoursLocation">
        <h4>Hours</h4>
        <p>Mon-Fri: 10 AM - 7 PM</p>
        <p>Sat: 10 AM - 6 PM</p>
        <h4>Location</h4>
        <p>7030 W Palmetto Park Rd, Boca Raton, FL 33433</p>
      </div>
      <div className="imageBottom">
        <img src={spaBottom} alt="" />
      </div>
      <div className="frontGoalTwo">
        <h4>This is more than a spa massage or facial.</h4>
        <h4>Our spa treatments improve quality of life.</h4>
        <p>
          Every day our clients come in seeking relief from daily stress. We
          love seeing the dramatic transformations of our clients when they
          visit us. After a massage or facial at our spa, our clients always
          leave calm, relaxed and with a smile on their face. We are proud to be
          that place they turn to when it is all becoming a little too much.
        </p>
        <p>
          Research shows that massage can boost your immune system and help
          mental wellness. The relaxation you will experience during a massage
          with us will help you look at situations with a calmer mindset.
          Clients carry on this positive and refreshed perspective as they go
          through their day-to-day living.
        </p>
        <p>
          Facials are great for maintaining healthy skin. But what has the
          greatest impact is the extra care, education and thought shared during
          our time with you.
        </p>
        <p>
          Spa treatments can be luxurious and pampering. But wellness goes
          beyond one massage or facial. Together with other healthy lifestyle
          choices, we can help bring you back to a place of balance.
        </p>
      </div>
      <div className="frontFooter">
        <div className="frontFooterLinks">
          <h4 className="footerH4">useful pages</h4>
          <Link to="/about" className="linkToUsefulPages">
            <p>about us</p>
          </Link>
          <Link to="/location" className="linkToUsefulPages">
            <p>our location</p>
          </Link>
          <Link to="/products" className="linkToUsefulPages">
            <p>shop products</p>
          </Link>
          <Link to="/contact" className="linkToUsefulPages">
            <p>contact</p>
          </Link>
          <Link to="/courses_description" className="linkToUsefulPages">
            <p>view courses</p>
          </Link>
          <Link to="/booking_courses" className="linkToUsefulPages">
            <p>book courses</p>
          </Link>
          <Link to="/careers" className="linkToUsefulPages">
            <p>careers</p>
          </Link>
          <Link to="/privacy_policy" className="linkToUsefulPages">
            <p>privacy policy</p>
          </Link>
        </div>
        <div className="frontFooterCourseTypes">
          <h4 className="footerH4">course menu</h4>

          <Link className="linkToUsefulPages">
            <p>massage</p>
          </Link>
          <Link className="linkToUsefulPages">
            <p>facials</p>
          </Link>
          <Link className="linkToUsefulPages">
            <p>body treatment</p>
          </Link>
          <Link className="linkToUsefulPages">
            <p>sauna</p>
          </Link>
          <Link className="linkToUsefulPages">
            <p>consulation</p>
          </Link>
          <Link className="linkToUsefulPages">
            <p>packages</p>
          </Link>
        </div>
        <div className="socialAndContact">
          <div className="frontFooterSocial">
            <h4>connect with us!</h4>
            <Link
              to="https://www.facebook.com/"
              style={{
                textDecoration: 'none',
              }}
            >
              <img src={facebook} alt="facebook" />
            </Link>
            <Link
              to="https://twitter.com/"
              style={{
                textDecoration: 'none',
              }}
            >
              {' '}
              <img src={twitter} alt="twitter" />
            </Link>
            <Link
              to="https://instagram.com/"
              style={{
                textDecoration: 'none',
              }}
            >
              <img src={instagram} alt="instagram" />
            </Link>
            <Link
              to="https://mail.google.com/"
              style={{
                textDecoration: 'none',
              }}
            >
              <img src={emailImage} alt="email" />{' '}
            </Link>
          </div>
          <div className="frontFooterContactInfo">
            <h4>reach out here</h4>
            <ul>
              <li>267-916-8780</li>
              <li>danila.2565@gmail.com</li>
              <li>7030 W Palmetto Park Rd, Boca Raton, FL 33433</li>
            </ul>
          </div>
        </div>
      </div>
      {/* // image & reserve

      // links to spa menu, contact, shop, gift cards

      // sign up for newsletter
      
      // our goal

      // our reputation

      // give hours and location

      // another bullshit text

      // footer
        // useful packages
        // spa services
        //connect with social media
        // our location  */}
    </div>
  );
}

export default Home;
