import React from 'react';

export default class Tabs extends React.Component{
  constructor(props){
    super(props);
    this.state = {selectedTabIndex: 0}
  }
  
  handleClick(e, i){
    e.preventDefault();
    this.setState({selectedTabIndex: i});
  }

  render(){
    return (
      <div className='tabs'>
        <h1>Tabs</h1>
        <div className='tabs-content'>
          <header className='tabs-header'>
            {this.props.data.map(({title}, i) => 
              ( <div 
                  className={`tab${this.state.selectedTabIndex === i ? ' selected' : ''}`}
                  key={`${title}-${i}`}
                  onClick={(e) => this.handleClick(e, i)}
                > {title}
                </div>
              )
            )}
          </header>
          <div className='tabs-body'>
            {this.props.data[this.state.selectedTabIndex].content}
          </div>
        </div>
      </div>
    );
  }
}