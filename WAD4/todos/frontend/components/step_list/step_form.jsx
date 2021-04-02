import React from 'react'

export default class StepForm extends React.Component{
  handleSubmit(e){
    e.preventDefault();

    let data = new Formdata(e.currentTarget);
    
  }

  render(){
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Title:
          <input type="text" name="title"/>
        </label>
        <label>
          Description:
          <input type="text" name="body"/>
        </label>
        <button>Create Step!</button>
      </form>
    );
  }
}