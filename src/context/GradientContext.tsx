import React from 'react';
import { useState } from 'react';
import { createContext } from 'react'

interface ImageColors {
    primary: string;
    secondary: string;
}

interface ContextProps{
    colors: ImageColors;
    previousColors: ImageColors;
    setColores:(colores: ImageColors)=> void;
    setColoresAnteriores: (previousColors: ImageColors)=> void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider=({children}:any)=>{

    const [colors, setColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary:'transparent'
    })

    const [previousColors, setPreviousColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary:'transparent'
    })

    const setColores =(colors: ImageColors)=>{
        setColors(colors);
    }

    const setColoresAnteriores =(previousColors: ImageColors)=>{
        setPreviousColors(previousColors);
    }

    return(
        <GradientContext.Provider
            value={{
                colors,
                previousColors,
                setColores,
                setColoresAnteriores                
            }}
        >
            {children}
        </GradientContext.Provider>
    )
}
