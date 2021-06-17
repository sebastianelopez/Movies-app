import React, { useEffect } from 'react'
import { ActivityIndicator,Dimensions, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardMovie } from '../components/cardMovie';
import { useMovies } from '../hooks/useMovies';

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getColores } from '../helpers/getColores';
import { useContext } from 'react';
import { GradientContext } from '../context/GradientContext';




const {width: windowWidth}=Dimensions.get('window');

export const HomeScreen = () => {

    const {nowPlaying, popular, topRated, upComing, isLoading}= useMovies();

    const {top}=useSafeAreaInsets();

    const {setColores,setColoresAnteriores} = useContext(GradientContext)

    const getPosterColors =async(index:number)=>{
        const movie= nowPlaying[index];
        const uri=`https://image.tmdb.org/t/p/w500${movie.poster_path}`

        const[primary='green', secondary='yellow'] =await getColores(uri);

        setColores({primary,secondary})
    }

    useEffect(() => {
        if(nowPlaying.length>0){
            getPosterColors(0)
        }
    }, [nowPlaying])

    if(isLoading){
        return(
            <View style={{flex:1, justifyContent: 'center', alignContent:'center'}}>
                <ActivityIndicator color='red' size={100} />
            </View>
        )
    }


    return (
        <GradientBackground>
            <ScrollView>
            <View style={{marginTop: top+20}}>     

                {/* Carousel principal */}

                <View
                    style={{
                        height:380
                    }}
                >
                    <Carousel
                        data={nowPlaying}
                        renderItem={({item}:any)=> <CardMovie movie={item} />}
                        sliderWidth={windowWidth}
                        itemWidth={240}
                        inactiveSlideOpacity={0.9}
                        onSnapToItem={index=>getPosterColors(index)}
                    />
                </View>

                {/* Carousel peliculas populares */}            

                <HorizontalSlider title="Populares" movies={popular} />

                <HorizontalSlider title="Top Rated" movies={topRated} />

                <HorizontalSlider title="Up Coming" movies={upComing} />
                
            </View>
            </ScrollView>
        </GradientBackground>
    )
}
