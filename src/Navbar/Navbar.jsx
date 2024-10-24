// import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/ExpForm">Expense Form</Link>
    <Link to="/GroupExp">GroupExp</Link>
  </nav>
);

export default Navbar;
