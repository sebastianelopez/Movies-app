import axios from "axios";

const movieDB=axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key:'35b3d04cf2007c1a8ff2e6729bd5063b',
        language: 'es-ES'
    }
});

export default movieDB;

