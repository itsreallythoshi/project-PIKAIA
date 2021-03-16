import React, { useEffect, useContext } from 'react'
import Button from './components/Button'
import CountdownAnimation from './components/CountdownAnimation'
import SetTimer from './components/SetTimer'
import { SettingsContext } from './context/SettingsContext'

const App = () => {

  const {
    timer,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn } = useContext(SettingsContext)

    useEffect(() => {updateExecute(executing)}, [executing, startAnimate])

  return (
    <div className="container">
      <h1>Count Down</h1>
      <small>Breath!!!</small>
      {timer !== 0 ?
      <>
        {/* <ul className="labels">
          <li>
            <Button 
              title="Work" 
              activeClass={executing.active === 'work' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('work')} 
            />
          </li>
          <li>
            <Button 
              title="Short Break" 
              activeClass={executing.active === 'short' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('short')} 
            />
          </li>
          <li>
            <Button 
              title="Long Break" 
              activeClass={executing.active === 'long' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('long')} 
            />
          </li>
        </ul> */}

        <Button title="Change Time?" _callback={SettingsBtn} />
        <div className="timer-container">
          <div className="time-wrapper">
              <CountdownAnimation
                key={timer} 
                timer={timer} 
                animate={startAnimate}
              >
                {children}
              </CountdownAnimation>
          </div>
        </div>
        <div className="button-wrapper">
          <Button title="Start" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
          <Button title="Pause" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
        </div>
      </> : <SetTimer />}
    </div>
  )
}

export default App;
