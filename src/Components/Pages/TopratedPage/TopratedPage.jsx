import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./topratedpage.module.scss";
import { useNavigate } from "react-router-dom";
import {Api_key , base_url} from "../../../config.js";
import Pagination from "../../Module/Pagination/Pagination.jsx";

const TopratedPage = ()=>{
    const [movieData, setMovieData]= useState([]);
    const [currentpage , setCurrentpage]= useState(1);
    const [totalpage, setTotalpage]=useState(1)
    const navigate = useNavigate()


    const moviefetch = (page)=>{
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=${page}`)
        .then((res)=>{
            console.log(res.data);
            setMovieData(res.data.results);
            setTotalpage(res.data.total_pages)
        })
        .catch(err => console.error('Error fetching data:', err.message));
    } 

    useEffect(()=>{
        moviefetch(currentpage);
    },[currentpage]);

    const handleChange =(id)=>{
                navigate(`/movie/${id}`);
    }

    // pagination coding
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
        {movieData && movieData.map((item)=>(
            <div key={item.id} className={styles.ImgContainer} onClick={()=>{handleChange(item.id)}}>
                <li>{<img src={`${base_url}${item.backdrop_path}`}/>}</li>
                <li>Title:{item.original_title}</li>
                <li>Ratings: {item.vote_average}</li>
            </div>
        ))}
        </div>

        {/* {pegination} */}

        <Pagination
        currentpage={currentpage}
        totalpage={totalpage}
        onprev={handleprev}
        onnext={handlenext}
      />

        </>
    )
}

export default TopratedPage;