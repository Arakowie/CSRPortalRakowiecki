import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';

import{
  PortalHome,
  UserList,
  NavBar,
  AddSubscriber,
  SearchUser
} from "./";


const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<PortalHome />} />
            <Route path="/portalhome" element={<PortalHome />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/addsubscriber" element={<AddSubscriber />} />
            <Route path="/searchuser" element={<SearchUser />} />
          </Routes>
          </BrowserRouter>
        </>
  );
};

export default App;
