import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import Home from "./components/Home"
import React, {useState, useEffect} from 'react';

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://graphql-weather-api.herokuapp.com/"
  })

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Home/>
      </div>
    </ApolloProvider>
  );
}

export default App;
