import React, { Component } from 'react';

class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {newList : ''};
  }

  handleSubmit(e) {
      e.preventDefault(); // this prevents the page from reloading -- do not delete this line!

      // Implement the rest of this function here!     
      this.setState({
        newList : this.refs.id.value
      }, function() {
        // console.log(this.state);
        this.props.addList(this.state);
      });
  }

  render() {
    return (
      <div id="addListDiv">
      <form onSubmit={this.handleSubmit.bind(this)}>
      <div id='addList'>
      <label>What will be on your next list?&nbsp;
      <input type='text' ref='id' id='newID'></input>
      </label>
      </div><br />
      <input type='submit' value='Create List' />
      </form>
      </div>
    );
  }
}

export default AddList;
