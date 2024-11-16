import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./singlemoviedetailspage.module.scss"
import CastComponent from "../CastComponent/CastComponent";
import {Api_key , base_url} from "../../../config.js";

const SingleMovieDetailspage = () => {
  const [singleData, setSingleData] = useState(null);

  const { movie_id } = useParams();

  useEffect(() => {
    if (movie_id) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`
        )
        .then((res) => {
          console.log(res.data);
          setSingleData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("error");
    }
  }, [movie_id]);

  return (
    <div className={styles.singlemovieContainer}>
      {singleData && (
        <div className={styles.mainContainer}>
          <div className={styles.leftsideContainer}>
            <div className={styles.MovieContainer}>
              <div className={styles.MovieImg}>
                <img src={`${base_url}${singleData.backdrop_path}`} />
              </div>
              <div className={styles.description}>
                <p className={styles.title}>{singleData.title}</p>
                <p className={styles.rating}>Rating : {singleData.vote_average}</p>
                <p>
                  <span className={styles.timing}>{singleData.runtime} Min{" "}</span>
                  <span className={styles.genere} >
                    {singleData.genres &&
                      singleData.genres
                        .map((genere) => genere.name)
                        .join(",  ")}
                  </span>
                </p>
                <p className={styles.releasedate}>Release Date: {singleData.release_date}</p>
              </div>
            </div>

            <div>
              <p className={styles.overview}>Overview</p>
              {singleData.overview}
            </div>
          </div>

          <div className={styles.posterImg}> 
          <img src={`${base_url}${singleData.poster_path}`} />
          </div>
        </div>
      )}
      <CastComponent  movie_id={movie_id}/>
    </div>
  );
};

export default SingleMovieDetailspage;
