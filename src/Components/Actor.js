import React,{useEffect,useState} from 'react'

const Actor = () => {
  const [inputVal, setInputVal] = useState("");
  const [actorsData, setActorsData] = useState([]);

  let dataUrl = "";
  if (inputVal.length > 0) {
    dataUrl = `https://api.tvmaze.com/search/people?q=${inputVal}`;
  } 
  // else {
  //   dataUrl = `https://api.tvmaze.com/search/people?q=friends`;
  // }

  const getActorsData = async () => {
    try {
      let respone = await fetch(dataUrl);
      let resData = await respone.json();
      setActorsData(resData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getActorsData();
  }, [inputVal]);
   console.log(actorsData);
  return (
    <>
       <section className="Shows">
                <div className="Shows">
                <div className="input-box-details"> {inputVal === '' ? 'Enter Actor Name Below' : ''}</div>
                        <div className="search-box">

                            <input
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value )}
                                className="input"
                                placeholder="Ex:- Akon"
                            />
                        </div>
          
                </div>
            </section>

      <section>
        <div className="main">
          
            {actorsData.map((element) => {
              const regex = /(<([^>]+)>)/ig;
              return (
                <div className="show">
                <div className="image">
                  
                    <a href={element.person.url} target="Akon">
                    {element.person.image ? (
                      <img
                        src={element.person.image.medium}
                        className="poster"
                        style={{ width: "255px", height: "325px" }}
                        alt={
                          element.person.name != null
                            ? element.person.name
                            : "Not found"
                        }
                      />
                    ) : (
                      <div className="poster">
                        <img
                          src="https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
                          style={{ width: "250px", height: "325px" }}
                          alt = "Not Found"
                        />
                      </div>
                    )}
                    </a>
                    <div className="details">
                       <h1>{element.person.name}</h1>
                       <span>⭐
                       {element.person.rating }0.0</span>       
                    </div>
                    <h5 className="text-danger text-center">
                      {element.person.id}
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

export default Actor
