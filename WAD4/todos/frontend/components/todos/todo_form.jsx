import React from 'react';

export default class TodoForm extends React.Component{
  constructor(props){ super(props);
    this.state = {title: '', body: ''};
    console.log(props);
  }

  // handleChange(e, key){
  //   let obj = {};
  //   obj[e.target.name] = e.target.value;

  //   this.setState(obj);
  // }
  
  handleSubmit(e){
    e.preventDefault();
    let data = new FormData(e.currentTarget);

    this.props.receiveTodoHandler({id: new Date().getTime(), title: data.get('title'), body: data.get('body')});
  }

  render(){
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>Title: 
          <input type="text" name='title'/>
        </label>
        <label>Body: 
          <input type="text" name='body' />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}