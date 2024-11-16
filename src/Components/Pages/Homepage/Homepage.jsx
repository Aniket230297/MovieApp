import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./homepage.module.scss";
import { useNavigate } from "react-router-dom";
import {Api_key , base_url} from "../../../config.js";
import Pagination from "../../Module/Pagination/Pagination.jsx";
 
 const Homepage = ()=>{
    const [movieData, setMovieData]=useState([]);
    const [currentpage , setCurrentpage]= useState(1);
    const [totalpage, setTotalpage]=useState(1)

    const navigate= useNavigate();

    
    const moviefetch = (page)=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${page}`)
        .then((response)=>{
            setMovieData(response.data.results);
            setTotalpage(response.data.total_pages);
        })
        .catch(err => console.error('Error fetching data:', err.message));
    }

    useEffect(()=>{
        moviefetch(currentpage);
    },[currentpage]);


    //handlechnage function
    const handleChange=(movieId)=>{
                console.log(movieId);
                navigate(`/movie/${movieId}`)
    }

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

    return(
        <>
        <div className={styles.MainContainer}>
        {movieData && movieData.map((item)=>(
            <div key={item.id} className={styles.ImgContainer} onClick={()=>{handleChange(item.id)}}>
                <li>{<img src={`${base_url}${item.backdrop_path}`}/>}</li>
                <li>Title:{item.original_title}</li>
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
    )
 }

 export default Homepage;