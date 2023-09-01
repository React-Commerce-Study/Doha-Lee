import React from 'react';
import Nav from '../Components/common/Nav';
import Slide from '../Components/Slide/Slide';
import Main from '../Components/Main';
import Footer from '../Components/common/Footer';

const Home = () => {
  return (
    <>
      <header>
        <Nav />
        <Slide />
      </header>
      <Main />
      <Footer />
    </>
  );
};

export default Home;
