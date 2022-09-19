import { BrowserRouter as Router, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Homepage from "./pages/Homepage"


const App = () => {
  return (
  
   <Router>
    <Navbar/>
    <div className="app">
      <Homepage/>
    
    </div>
    
   </Router>
   
   
  )
}

export default App

