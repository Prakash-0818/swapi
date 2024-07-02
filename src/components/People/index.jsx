import { useEffect, useState } from "react";
import './index.css'
const People = () => {
  const [details, setDetails] = useState();
  const [page, setPage] = useState(1);

  function handleClickLoadMore() {
        setPage((prev)=> prev + 1 ) 
  }

  // function handlePrevClick() {
  //   if(page > 0 ){
  //       setPage((prev)=> prev - 1)
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const responseJson = await response.json();
      setDetails((prev)=>{

        return{
            results: prev?.results ? [...prev.results, ...responseJson.results] : responseJson.results
        }

      });
    }
    fetchData();
  },[page]);
  
  return (
    <div className="container">
        <h1>Total count : {details?.count ? details.count: "0" }</h1>

        {details ? (
        details.results.map((people) => (
            <div className="card" key={people.name}>
                <div className="people-details">
                    <h1 className="people-name">{people.name}</h1>
                </div>
            </div>
        ))
      ) : (
        <h1 className="data-loading">loading.....</h1>
      )}

      <div className="btn">
         {/* {
            (page > 1) ?  <button type="button" onClick={handlePrevClick}>Prev</button> : <button type="button" className="disabled-btn" disabled>Prev</button>
        }

        {
             (page * 10 < details ?.count) ?  <button type="button" onClick={handleClickLoadMore}>Load More</button> : <button type="button" className="disabled-btn" disabled>Load more</button>
        }

        {
            (page * 10 < details ?.count) ?   <button type="button" onClick={handleClickLoadMore}>Next</button> : <button type="button" className="disabled-btn" disabled>Next</button>
        }  */}
       

       <button type="button" onClick={handleClickLoadMore}>Load More</button>

       

      </div>
    </div>
  );
};

export default People;

