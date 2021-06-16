import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDBResponse } from "../interfaces/movieInterface";

interface MoviesState{
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upComing: Movie[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading]= useState(true);

    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upComing: []
    })
    


    const getMovies=async()=>{

        const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing');
        const popularPromise    = movieDB.get<MovieDBResponse>('/popular');
        const topRatedPromise   = movieDB.get<MovieDBResponse>('/top_rated');
        const upComingPromise   = movieDB.get<MovieDBResponse>('/upcoming');

        const resp= await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upComingPromise
        ])
        
        setMoviesState({
            nowPlaying: resp[0].data.results,
            popular: resp[1].data.results,
            topRated: resp[2].data.results,
            upComing: resp[3].data.results,
        })

        setIsLoading(false);

    }

    
    useEffect(() => {        
            
               getMovies(); 
    
    }, [])
        
    return{
        ...moviesState,
        isLoading
    }

}
