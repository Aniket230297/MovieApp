
import './App.css'
import Navbar from './Components/Module/Navbar/Navbar';
import Homepage from './Components/Pages/Homepage/Homepage';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import SingleMovieDetailspage from './Components/Pages/SingleMovieDetailspage/SingleMovieDetailspage';
import TopratedPage from './Components/Pages/TopratedPage/TopratedPage';
import UpcomingMoviepage from './Components/Pages/UpcomingMoviepage/UpcomingMoviepage';
import SearchMoviepage from './Components/Pages/SearchMoviepage/SearchMoviepage';

function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/singlemovie' element={<SingleMovieDetailspage />} />
      <Route path='/toprated' element={<TopratedPage />} />
      <Route path='/upcoming' element={<UpcomingMoviepage />} />
      <Route path='/movie/:movie_id' element={<SingleMovieDetailspage />}/>
      <Route path='/search/:query' element={<SearchMoviepage />} />
    </Routes>
    </BrowserRouter>
  )
} 

export default App
