import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainComponent from './MainComponent';
import myStore from './Redux/store';
import {Provider} from 'react-redux'
function App() {
  return (
   <>
   <Provider store={myStore}>
   <BrowserRouter>
   <MainComponent/>
   </BrowserRouter>
   </Provider>
  
   </>
  );
}

export default App;
