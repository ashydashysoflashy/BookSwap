import React from 'react';
import './NotFoundPage.css'; // Importing the CSS

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <a href="/">Go to Homepage</a>
            </div>
        </div>
    );
};

export default NotFoundPage;