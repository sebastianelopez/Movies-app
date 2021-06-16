import React from 'react'
import { ActivityIndicator,Dimensions, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardMovie } from '../components/cardMovie';
import { useMovies } from '../hooks/useMovies';

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';

const {width: windowWidth}=Dimensions.get('window');

export const HomeScreen = () => {

    const {nowPlaying, popular, topRated, upComing, isLoading}= useMovies();

    const {top}=useSafeAreaInsets();

    if(isLoading){
        return(
            <View style={{flex:1, justifyContent: 'center', alignContent:'center'}}>
                <ActivityIndicator color='red' size={100} />
            </View>
        )
    }


    return (
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
                />
            </View>

            {/* Carousel peliculas populares */}            

            <HorizontalSlider title="Populares" movies={popular} />

            <HorizontalSlider title="Top Rated" movies={topRated} />

            <HorizontalSlider title="Up Coming" movies={upComing} />
            
        </View>
        </ScrollView>
    )
}
