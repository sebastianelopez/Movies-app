import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Dimensions, Image, StyleSheet,ScrollView,ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

const screenHeight= Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ({route, navigation}:Props) => {

    const movie= route.params;
    const uri=`https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const {isLoading,cast,movieFull}=useMovieDetails(movie.id);

    return (
        <ScrollView>            

            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image 
                        source={{uri}}
                        style={styles.image}
                    />
                </View>                
            </View>  
            <View style={styles.marginContainer}>
                 <Text style={styles.subTitle}>{movie.original_title}</Text>

                 <Text style={styles.title}>{movie.title}</Text>
            </View>

            
            {
                isLoading ? 
                
                            
                                <ActivityIndicator size={30} color="grey" style={{marginTop: 20}} />
                            
                           :
                            <MovieDetails movieFull={movieFull!} cast={cast} />
            }
            <TouchableOpacity
                style={styles.backButton}
                onPress={()=>navigation.pop()}
            >
                <Icon 
                    color='white'
                    name='arrow-back-outline'
                    size={60}                    
            />
            </TouchableOpacity>
           
            
           

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        flex:1,                
    },
    imageBorder:{
        flex: 1,
        overflow:'hidden',
        borderBottomEndRadius:25,
        borderBottomStartRadius:25,
    },
    imageContainer:{
         width:'100%',
        height: screenHeight* 0.65,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,           
    },
    marginContainer:{
        marginHorizontal: 20,
        marginTop: 20
    },
    subTitle:{
        fontSize:14,
        color:'gray'
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    backButton:{
        position: 'absolute',
        zIndex: 999,
        elevation: 99,
        top:15,
        left: 5
    }
});