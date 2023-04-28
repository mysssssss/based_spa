import React from 'react';
// import frontTop from '../assets/spafront2.jpg';
import giftCard from '../assets/giftCard.jpg';
import spaMenu from '../assets/spaMenu.png';
import reserveOnline from '../assets/reservingOnline.jpg';
import onlineShopping from '../assets/onlineShopping.jpg';
import spaFront from '../assets/spafront3.png';
import googleReviews from '../assets/googleReviews.png';
import yelpReviews from '../assets/yelpReviews.png';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="imageAndReserve">
        <img src={spaFront} alt="" className="mainFrontImage" />
        <Link to="/booking_courses">
          <button className="reserveButton">reserve now</button>
        </Link>
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
          <Link className="linkFrontPage" to="/shop">
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
            <img src={googleReviews} alt="google reviews image" />
            <img src={yelpReviews} alt="yelp reviews image" />
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
            />
          </div>
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            type="email"
            margin="normal"
            // className="emailInput"
          />
        </div>
        <button type="submit">submit</button>
        {/* </form> */}
      </div>{' '}
      {/* </Box> */}
      <div className="frontHoursLocation">
        <h4>Hours</h4>
        <p>Mon-Fri: 10 AM - 7 PM</p>
        <p>Sat: 10 AM - 6 PM</p>
        <h4>Location</h4>
        <p>5582 Wellesley Park Drive</p>
      </div>
      <div className="frontGoalTwo">
        <h4>
          This is more than a spa massage or facial. Our spa treatments improve
          quality of life.
        </h4>
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
      <div className="frontFooter"></div>
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
