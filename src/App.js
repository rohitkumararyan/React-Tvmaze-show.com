import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar"
import Homepage from "./pages/Homepage"
import About from './Components/About';

import "./App.css"

import Main from "./Components/Main"
const App = () => {
  return (
  
   <Router>
    
    
		       
    
        <Navbar/>
    <div className="Main">
      <Main></Main>
    </div>
	  
				
	    
			
	
    
   </Router>
   
   
  )
}

export default App

