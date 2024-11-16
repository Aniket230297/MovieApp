import { useEffect, useState } from "react";
import styles from "./castcomponent.module.scss";
import axios from "axios";
import {Api_key , base_url} from "../../../config.js";

const CastComponent = ({ movie_id }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (movie_id) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
        )
        .then((res) => {
          console.log(res.data);
          setCast(res.data.cast);
        })
        .catch(err => console.error('Error fetching data:', err.message));
    }
  }, [movie_id]);

  return (
    <div className={styles.castcomponent}>
    <h2>Cast</h2>
      <div className={styles.castMainContainer}>
        {cast ? (cast.slice(0, 6).map((item)=>(
            <div key={item.id} className={styles.castImgContainer}>
                {<img src={`${base_url}${item.profile_path}`}/>}
                <p>{item.name}</p>
                <p>Character : {item.character}</p>
            </div>
        ))) : (
            <p>no data</p>
        )}
        
      </div>
    </div>
  );
};

export default CastComponent;
