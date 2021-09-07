import React from 'react';

import Topbar from '../components/Topbar';
import HeroHome from '../components/HeroHome';


function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Topbar />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />

      </main>

    </div>
  );
}

export default Home;
