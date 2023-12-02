import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import heroImage from '../assets/landing.jpg';

const HomePage = () => {
  return (
    <>
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="dark-overlay"></div>
        <div className="hero-text">
          <h1>Empowering Students in Every Swap, Sale, and Purchase</h1>
          <p>Join the community-driven platform dedicated to making textbook exchange easy and affordable.</p>
        </div>
      </div>
      <div className="features-section">
        <h2>Why BookSwap?</h2>
        <div className="feature feature-sustainable">
          <h3>Sustainable</h3>
          <p>Reusing textbooks reduces waste and helps protect the environment.</p>
        </div>
        <div className="feature feature-community">
          <h3>Community Driven</h3>
          <p>A marketplace built by students, for students, to support each other's educational journey.</p>
        </div>
        <div className="feature feature-chat">
          <h3>Real-time Chat</h3>
          <p>Communicate instantly and securely with other students within BookSwap.</p>
        </div>
      </div>
      <div className="how-it-works-section">
        <h2>How Does BookSwap Work?</h2>
        <ol>
          <li>
            <strong>Create an Account:</strong> Access a personalized experience with BookSwap.
          </li>
          <li>
            <strong>View or Create Listings:</strong> Use your dashboard to manage or browse textbook listings.
          </li>
          <li>
            <strong>Connect with Students:</strong> Negotiate and finalize deals through real-time messaging.
          </li>
        </ol>
      </div>
      <div className="cta-section">
        <h2>Ready to Start Saving?</h2>
        <p>Sign up now to discover how easy it is to buy, sell, or swap textbooks on BookSwap.</p>
        <Link to="/register" className="btn-register">Create Your Account</Link>
        <Link to="/browse" className="btn-browse">Browse Textbooks</Link>
      </div>
    </>
  );
};

export default HomePage;
