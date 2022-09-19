
import React,{useState,useEffect, useCallback} from 'react'
import Shows from './Shows';
import Actors from './Actors';

import Footer from './Footer'





const Main = () => {
    const [radio, setRadio] = useState("");
    const [input, setInput] = useState("");
    const [actors, setActors] = useState([]);
    const [shows, setShows] = useState([]);
    const [actShows, setActShows] = useState([]);
  
    const [Found, setfound] = useState(true);
  
    const updateRadio = (e) => {
      setRadio(e.target.value);
      setActors([]);
      setShows([]);
      setActShows([]);
      setInput("");
    };
    useEffect(() => {
      if (radio === "actor") {
        console.log(radio);
        const fetchDataActor = async () => {
          const response = await fetch(
            `https://api.tvmaze.com/search/people?q=${input}`
          );
          const data = await response.json();
          setActors(data);
        };
        fetchDataActor()
      } else {
        if (input !== "") {
          const fetchShowData = async () => {
            const response = await fetch(
              `https://api.tvmaze.com/search/shows?q=${input}`
            );
            const data = await response.json();
            setShows(data);
          };
          fetchShowData();
        }
      }
    }, [input]);

    useEffect(() => {
      if (actors.length !== 0) {
        const fetchActShowData = async () => {
          const response = await fetch(
            `https://api.tvmaze.com/people/${actors[0]?.person?.id}/castcredits?embed=show`
          );
          const data = await response.json();
          setActShows(data);
          if (actShows.length === 0) {
            setfound(false);
          }
        };
        fetchActShowData();
      }
    }, [actors, input]);
  
    const debounce = (func) => {
      let timer;
      return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          func.apply(context, args);
        }, 1000);
      };
    }

    const showsName = (event) => {
        setInput(event.target.value);
    };
      const clickHandle = useCallback(debounce(showsName), []);
    
  
  return (
    <>
    <div classname="App">
  

        <div className="m-lg-4 mt-4 p-sm-4 d-flex justify-content-center align-items-center flex-column flex-lg-row ">
            <div className="input ml-2 m-2 ">
             <input    type="text" id="input-form " classname="form-control"  placeholder="Search"  aria-label="Search" 
             onChange={clickHandle}
            ></input>
        </div>
        <div id="radio-container ms-4">
              <div className="ml-4 mt-2 d-inline">
              <input  type="radio" classname="form-check-input" name="flexRadioDefault"  id="flexRadioDefault1" value="actor"
              onChange={updateRadio}
               />
             <label classname="form-check-label" for="flexRadioDefault1">
             <span className="p-2 m-3 text3">Actor</span>
           </label>
         </div>
       <div className="ml-3 mt-2 d-inline">
           <input classname="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2"  value="show"
            onChange={updateRadio}
           />
          <label classname="form-check-label" for="flexRadioDefault2">
           <span className="p-2 me-4 text3" >Show</span>
         </label>
         </div>
    </div>
  </div>

        <div className="d-flex justify-content-center">
                   {radio === "actor" ? (
                  actShows.length !== 0 ? (
                  <Actors data={actShows} />
                 ) : (
                  <div style={{ height: "380px" }}>
                   {Found? (
                   <h1 className="text-center">Search By Actor Name</h1>
                 ) : (
                <h1 className="mt-4 text-danger">Not found</h1>
               )}
              </div>
                )
                ) : radio === "show" ? (
               shows.length !== 0 ? (
               <Shows data={shows} />
              ) : (
                 <div style={{ height: "380px" }}>
               <h1 className="text-center ">Search By Show Name</h1>
               </div>
               )
             ) : (
              <div style={{ height: "380px" }}>
          
              </div>
            )}
             </div>
           
        </div>
        
          
        <Footer/>
    </>
  )
}

export default Main
