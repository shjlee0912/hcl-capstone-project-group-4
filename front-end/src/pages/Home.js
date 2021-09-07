import React from 'react';

import TopBar from '../components/TopBar';
import homepage from '../components/homepage';


function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <TopBar />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <homepage />

      </main>

    </div>
  );
}

export default Home;
