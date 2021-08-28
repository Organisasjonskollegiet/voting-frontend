import React from 'react'
import { lightblue, darkblue } from './theme'

export const transition = {
    transition: "all .1s"
} as React.CSSProperties

export const expandAndLift = {
    transform: "scale(1.05)",
    boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
}

export const customScrollbar = {
'&::-webkit-scrollbar': {
          width: '8px',
          borderRadius: '8px',
          backgroundColor: lightblue,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: darkblue,
          borderRadius: '8px',
        },

}
