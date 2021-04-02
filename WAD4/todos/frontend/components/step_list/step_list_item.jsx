import React from 'react';

// export default class StepListItem extends React.Component {
//   constructor(props) {
//     super(props);
//     this.forceUpdate = this.forceUpdate.bind(this);
//   }

//   handleDone(id) {
//     this.props.updateStepStatusHandler(id);
//     // this.forceUpdate();
//   }

//   handleDelete() {
//     this.props.removeStepHandler(this.props.step.id)
//   }

//   render() {
//     const {title, body, id, done} = this.props.step;

//     return (
//       <li className="step-list-item">
//         <h5>{title}</h5>
//         <p>{body}</p>
//         <button onClick={() => this.handleDone(id)} className={`status ${done ? 'done' : ''}`}></button>
//         <button onClick={() => this.handleDelete(id)}>Delete</button>
//       </li>
//     )
//   }
// }

export default function StepListItem({step, updateStepStatusHandler, removeStepHandler}){
  const {id, title, body, done} = step;

  function handleDone(id) {
    updateStepStatusHandler(id);
  }

  function handleDelete() {
    removeStepHandler(step.id);
  }

  // console.log(step);

  return (
      <li className="step-list-item">
        <h5>{title}</h5>
        <p>{body}</p>
        <button onClick={() => handleDone(id)} className={`status ${done ? 'done' : ''}`}></button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </li>
    )
}