import React, { useState, useEffect } from 'react';
import '../style.css';
import { Link as LinkScroll } from 'react-scroll';

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="navbar">
      <LinkScroll
        to="home"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}>
          <h1>Portfolio</h1>
      </LinkScroll>
      <nav>
        <LinkScroll
          to="home"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}>
          Home
        </LinkScroll>
        <LinkScroll
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}>
          About
        </LinkScroll>
        <LinkScroll
          to="career"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}>
          Career
        </LinkScroll>
      </nav>
    </div>
  );
}

export default Navbar;
