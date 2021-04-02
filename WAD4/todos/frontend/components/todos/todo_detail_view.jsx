import React from 'react';
import StepListContainer from '../step_list/step_list_container';

export default class TodoDetailView extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e, id) {
    this.props.removeTodoHandler(id);
  }

  render() {
    const {id, body, hidden} = this.props;
    return (
      <div className={`todo-detail-view ${hidden ? "hidden" : ""}`}>
        {body}
        <button onClick={(e) => this.handleClick(e, id)}>Delete!</button>

        <StepListContainer id={id}/>
      </div>
    )
  }
}