import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styles from "./searchmoviepage.module.scss";

const  SearchMoviepage = ()=>{
    const [selectedMovie, setSelectedMovie] = useState([]);

    const {query} = useParams();
    const Api_key= "c45a857c193f6302f2b5061c3b85e743";
    const base_url = "https://image.tmdb.org/t/p/w500";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${query}&page=1`

    useEffect(()=>{
        axios.get(url)
        .then((res)=>{
            console.log(res.data.results);
            setSelectedMovie(res.data.results);
        })
        .catch(err => console.error('Error fetching data:', err.message));
    }, [query])

    return(
        <>
        <div className={styles.MainContainer}>
        {selectedMovie && selectedMovie.map((item)=>(
            <div key={item.id} className={styles.ImgContainer}>
                <li>{<img src={`${base_url}${item.backdrop_path}`}/>}</li>
                <li>Title:{item.original_title}</li>
                <li>Ratings: {item.vote_average}</li>
            </div>
        ))}
        </div>
        </>
    )
}

export default SearchMoviepage;