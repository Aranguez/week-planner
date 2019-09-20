import React from "react";
import './card.css';

const Card: React.FC<any> = ({ children, title }) => {
  return (
    <div className="card">
      { children }
      { title && <h3 className="title">{title}</h3> }
    </div>
  )
};

export default Card;

/** 
 * <Card title="Timer">
 *    <CountDownTimer />
 * </Card>
*/

/** 
 * <Card>
 *    <h1>{tasks.length}</h1>
 *    <Trans i18nKey="home.totalTasks">total tasks</Trans>
 * </Card>
*/


/** TotalTasks.tsx
 *  <div className="panel">
      <div>
        <h1>{tasks.length}</h1>
        <Trans i18nKey="home.totalTasks">total tasks</Trans>
      </div>
    </div>
 */

/** Clock.tsx
 * <div className="panel">
      <div>
        <h1>
          <span> {clockState.hours}</span>
          <span>:{clockState.mins}</span>
          <span>:{clockState.secs}</span>
        </h1>
        <Trans i18nKey="home.timeLeft">to finish this day</Trans>
      </div>
    </div>
 */
