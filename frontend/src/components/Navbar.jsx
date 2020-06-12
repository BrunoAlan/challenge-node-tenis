import React from 'react';
import { Link } from 'react-scroll';
import '../App.css';

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link
            activeClass="active"
            to="australian"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Australian Open
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="rolandGarros"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Roland Garros
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="wimbledon"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Wimbledon
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="usOpen"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            Us Open
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
