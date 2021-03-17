import React, {useEffect, useContext, useState} from 'react'
import Button from './components/Button'
import CountdownAnimation from './components/CountdownAnimation'
import SetTimer from './components/SetTimer'
import { SettingsContext } from './context/SettingsContext'
// import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import "./prevTimer.css";

const PrevTimer = () => {

const {
    timer,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    SettingsBtn } = useContext(SettingsContext)

    useEffect(() => {updateExecute(executing)}, [executing, startAnimate])
    const [clicked, setClicked] = useState();

  return (
    <div className="dashboard__timer">
      <h3>Count Down</h3>
      <h4>Helps to track the meditation time, press the timer when you are ready.</h4>
      {timer !== 0 ?
      <>
        <Button title="Change Time" _callback={SettingsBtn} />
            <div className="dashboard__timer__time">
                  <CountdownAnimation
                    key={timer}
                    timer={timer}
                    animate={startAnimate}
                  >
                    {children}
                  </CountdownAnimation>
                <div className="dashboard__timer__button">
                    <button className="dashboard__timer__button__play"
                            onClick={()=> {startTimer(); setClicked(true);}}
                            activeClass={!startAnimate ? 'active' : undefined} >

                        {/*{clicked ? <ReplayIcon /> : <PlayArrowIcon/> }*/}
                        <PlayArrowIcon
                            style={{fontSize: '35px'}}
                        />
                    </button>
                    <button className="dashboard__timer__button__pause" onClick={pauseTimer}>
                        <PauseIcon
                            activeClass={startAnimate ? 'active' : undefined}
                            style={{fontSize: '35px'}}
                        />
                    </button>

                </div>
             </div>
      </> : <SetTimer />}
    </div>
  )
}

export default PrevTimer;
