import React from 'react'
import {TailSpin} from 'react-loader-spinner'

const Loader = ({text}) => {
  return (
    <div className='loader-styles'>
        <div className='inner-circle'>
        <h3>Loading {text}...</h3>
        <TailSpin className='loader'/>
        </div>
    </div>
  )
}

export default Loader
