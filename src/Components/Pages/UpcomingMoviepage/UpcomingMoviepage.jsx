import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./upcomingmovie.module.scss";
import { useNavigate } from "react-router-dom";
import { Api_key, base_url } from "../../../config.js";
import Pagination from "../../Module/Pagination/Pagination.jsx";

const UpcomingMoviepage = () => {
  const [movieData, setMovieData] = useState([]);
  const [currentpage , setCurrentpage]= useState(1);
    const [totalpage, setTotalpage]=useState(1)

  const navigate = useNavigate();

  // Fetch upcoming movies on component mount
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=1`
      )
      .then((res) => {
        console.log(res.data);
        setMovieData(res.data.results);
        setTotalpage(res.data.total_pages);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  // Function to fetch details and cast for the selected movie
  const fetchMovieDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleprev= ()=>{
    if(currentpage > 1){
        setCurrentpage((prev)=>prev-1);
    }
}

const handlenext = ()=>{
    if(currentpage < totalpage){
        setCurrentpage((prev)=> prev + 1)
    }
}

  return (
    <>
      <div className={styles.MainContainer}>
        {movieData &&
          movieData.map((item) => (
            <div
              key={item.id}
              className={styles.ImgContainer}
              onClick={() => fetchMovieDetails(item.id)}
            >
              <img
                src={`${base_url}${item.backdrop_path}`}
                alt={item.original_title}
              />
              <li>Title: {item.original_title}</li>
              <li>Ratings: {item.vote_average}</li>
            </div>
          ))}
      </div>

      <Pagination
        currentpage={currentpage}
        totalpage={totalpage}
        onprev={handleprev}
        onnext={handlenext}
      />

      
    </>
  );
};

export default UpcomingMoviepage;
