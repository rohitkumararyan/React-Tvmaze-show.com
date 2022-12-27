import React, { useState } from 'react'
import Show from './Show';
import Actor from './Actor';

const Search = () => {

    const [actor, setActor] = useState(false);
    const [show, setShow] = useState(false);

    const setActorFilter = () => {
        setShow(false);
        setActor(true);
    }

    const setShowFilter = () => {
        setActor(false);
        setShow(true);
       
    }
    return (
        <>
            <section className="mt-5">
                <div className="container">
                        <div className="row mt-3">
                        <div className="col-md-7">
                            <input type="radio" name="movie" onChange={() => setActorFilter()} /> <strong style={{fontSize:"20px", color:'whitesmoke'}}> By Actor </strong>   &nbsp;  &nbsp;
                            <input type="radio" name="movie" onChange={() => setShowFilter()} className="ms-3" /> <strong style={{fontSize:"20px" , color:'whitesmoke'}}> By Shows </strong>
                        </div>
                    </div>
                   
                </div>
            </section>
            {actor ? <Actor /> : ""}
            {show ? <Show /> : ""}
        </>
    )
}

export default Search