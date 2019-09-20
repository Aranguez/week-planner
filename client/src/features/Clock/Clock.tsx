import React, { useState, useEffect } from 'react';
import { Trans/*, withTranslation*/ } from 'react-i18next';
import Card from 'src/components/Card/Card';

//TODO: types with translation when fixed

const Clock: React.FC<any> = props => {
  const [clockState, setClockState] = useState({
    hours: '',
    mins: '',
    secs: ''
  })

  useEffect(() => {
    clock();
    const int = setInterval(clock, 1000);
    return () => {
      clearInterval(int);
    };
  }, [])

  const clock = () => {
    let time = new Date();
    let hours = Math.abs(time.getHours() - 23);
    let mins = Math.abs(time.getMinutes() - 60);
    let secs = Math.abs(time.getSeconds() - 60);

    if (hours < 10) {
      hours = parseInt("0" + hours);
    }

    if (mins < 10) {
      mins = parseInt("0" + mins);
    }

    if (secs < 10) {
      secs = parseInt("0" + secs);
    }

    setClockState({
      hours: hours.toString(),
      mins: mins.toString(),
      secs: secs.toString()
    });
  };

  return (
    <Card>
      <div className="clock">
        <span> {clockState.hours}</span>
        <span>:{clockState.mins}</span>
        <span>:{clockState.secs}</span>
      </div>
      <div>
        <Trans i18nKey="home.timeLeft">to finish this day</Trans>
      </div>
    </Card>

    // <div className="panel">
    //   <div>
    //     <h1>
    //       <span> {clockState.hours}</span>
    //       <span>:{clockState.mins}</span>
    //       <span>:{clockState.secs}</span>
    //     </h1>
    //     <Trans i18nKey="home.timeLeft">to finish this day</Trans>
    //   </div>
    // </div>
  );
}

export default Clock;

//export default /*withTranslation("common")*/Clock;
