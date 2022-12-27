import React ,{useState,useEffect}from 'react'
import "./show.css"
const Show = () => {
    const [inputVal, setInputVal] = useState("");
    const [showData, setshowData] = useState([]);

    let dataUrl = "";
    if (inputVal.length > 0) {
        dataUrl = `https://api.tvmaze.com/search/shows?q=${inputVal}`;
    } 
    
  

    const getshowData = async () => {
        try {
            let respone = await fetch(dataUrl);
            let resData = await respone.json();
            setshowData(resData);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getshowData();
    }, [inputVal]);
    //console.log(showData);
    return (
        <>
            <section className="Shows">
                <div className="Shows">
                <div className="input-box-details"> {inputVal === '' ? 'Enter Show Name Below' : ''}</div>
                        <div className="search-box">

                            <input
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                className="input"
                                placeholder="Ex:-Friends"
                            />
                        </div>
          
                </div>
            </section>

            <section>
                <div className="main">
                    
                        {showData.map((element) => {
                           const regex = /(<([^>]+)>)/ig;
                            return (
                              <div className="show">
                                <div className="image">
                                  <a href={element.show.url} target="_blank">
                                  {element.show.image ? (
                                    <img
                                      src={element.show.image.medium}
                    
                                      alt={
                                        element.show.name != null
                                          ? element.show.name
                                          : "Not found"
                                      }
                                    />
                                  ) : (
                                    <div
                                      className="poster"
                                    
                                    >
                                      <img
                                        src="https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
                                       
                                        alt = {element.show.name}
                                      />
                                    </div>
                                  )}
                                  </a>
                                  <div className="details">
                                   
                                  <h3 className="show-name">{element.show.name}({element.show.language})</h3>
                                   <span className="rating">⭐
                                   {element.show.rating.average !== null ? element.show.rating.average : "0.0"}</span>
                          
                              
                                  </div> 
                                  <div className="summary">
                                   <h3>Summary</h3>
                                 {element.show.summary !== null ? element.show.summary.replace(regex,''): ''}
                  </div>

                                  <h5 className="text-danger text-center"> id,No:-
                                    {element.show.id}
                                  </h5>
                                </div>
                              </div>
                            );
                        })}
                    </div>
          
            </section>
        </>
    );
}

export default Show
