import React from 'react'
import { FlatList, Text } from 'react-native'
import { View } from 'react-native'
import { Movie } from '../interfaces/movieInterface'
import { CardMovie } from './cardMovie'

interface Props{
    title?: string;
    movies: Movie[]
}

export const HorizontalSlider = ({title, movies}:Props) => {
    return (
        <View
                style={{ height:240}}
            >
                <Text
                   style={{fontSize:20, fontWeight:'bold', marginLeft:8}}                 
                >{title}</Text>

                <FlatList 
                    data={movies}
                    renderItem={({item}:any)=> (
                        <CardMovie movie={item} width={140} height={200} />
                    )}
                    keyExtractor={(item)=>item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
        </View>
    )
}
