import React, { useContext } from 'react'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import { SettingsContext } from '../context/SettingsContext'

const CountdownAnimation = ({key = 1, timer= 20,animate = true,children}) => {

    const {stopTimer} = useContext(SettingsContext)
    return (
        <CountdownCircleTimer
        key={key}
        isPlaying={animate}
        duration={timer* 60}
        colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
          strokeWidth={6}
          size={220}
          trailColor= "#A9A9A9" 
          onComplete ={() =>{ 
              
            //  stopTimer()
        }}

        >
          { children }
        </CountdownCircleTimer>
    )
}

export default CountdownAnimation
