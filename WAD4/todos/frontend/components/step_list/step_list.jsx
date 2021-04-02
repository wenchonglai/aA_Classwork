import React from 'react';
import StepListItemContainer from './step_list_item_container';
import StepForm from './step_form'

class Random extends React.Component{
  render(){
    let step = this.props.step;
    return (<p>{step.done ? 'Undo' : 'Done'}</p>)
  }
}

export default function(props){

  return(
    <div className="step-list">
      <ul>
        {props.steps.map(step => (
          <div key={step.id}>
            <Random step={step}></Random>
            <StepListItemContainer 
              step={step}
            />
          </div>
        ))}
      </ul>

      {/* <StepForm receiveStepHandler={receiveStepHandler}/> */}
    </div>
  );
}

