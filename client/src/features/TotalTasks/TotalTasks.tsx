import React from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { /*translate,*/ Trans } from "react-i18next";
import { Task } from '../../types';
import Card from "src/components/Card/Card";

type TotalTasks = {
  tasks: Task[]
}

const TotalTasks: React.FC<TotalTasks> = ({ tasks }) => {
  return (
    <Card>
      <div>
        <h3 className="title">{tasks.length}</h3>
      </div>
      <div>
        <Trans i18nKey="home.totalTasks">total tasks</Trans>
      </div>
    </Card>
    // <div className="panel">
    //   <div>
    //     <h1>{tasks.length}</h1>
    //     <Trans i18nKey="home.totalTasks">total tasks</Trans>
    //   </div>
    // </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasksList
});

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  //translate("common")
)(TotalTasks);
