// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';
window.store = store;

// Import other components (e.g., Search)
import Login from './app/search/components/search-form';
import Dashboard from './app/search/components/dashboard';

// Define a function to check if the user is authenticated
const isAuthenticated = () => {
  // Check if a valid token exists in local storage (you can modify this based on your authentication logic)
  const token = localStorage.getItem('SariskaAccessToken');
  console.log("token", token);
  
  return token ? true : false;
};

// Define your Redux store (if not already defined)
// const store = ...; // Define your store here

// Combine both App components into a single file
const MainApp = () => {
  return (
    <Router>
      <Routes>
        {/* Non-authenticated route */}
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Authenticated routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

// Render the main component wrapped with the Redux Provider
ReactDOM.render(
  <Provider store={store}>
    <MainApp />
  </Provider>,
  document.getElementById('main')
);