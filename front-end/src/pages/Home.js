import React from 'react';

import Topbar from '../components/Topbar';
import HomeHero from '../components/HomeHero';


function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Topbar />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HomeHero />

      </main>

    </div>
  );
}

export default Home;
