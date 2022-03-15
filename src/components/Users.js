import { Component } from 'react';
//import { useState } from 'react';
import User from './User';

import classes from './Users.module.css';

// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ];

class Users extends Component {

  constructor () {
    // With class-based components, this.state is always an object - not the same as functional components
      // There is only one state object which contains all the states within it. These states can be string, booleans, nested function, arrays, etc. 
        // Need super() before this so that state() is inherited from extends Component since it can't inherit it from Users class
      super();
      this.state = {
      showUsers: true
      // This would merger the state not changed with the newly changed state, keeping both the more:'test' state and the new showUsers: false states
        //,more: 'test'
    };
  }

  componentDidUpdate() {
    if(this.props.users.length === 0 )
    {
      // Generates error and lets user bubble up in call stack, if not handled by searching a letter that doesn't exist in any names,
        // This will cause page to crash with error msg 'No users provided!'
          // Run try catch with JS
      throw new Error('No users provided!');
    }
  }

  toggleUsersHandler() {
    // Always pass in as object as state above, and it will still keep other states the same, yet change the one you change in the object as seen 
      //change to opposite staet not just false by anonymous arrow function, but make sure to return object since this.state is an object
    this.setState((curState) => {
      return { showUsers: !curState.showUsers};
    });
  };

  

  render () {

      //This doesn't go above render() in class, only methods go above
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/* toggleUserHandler needs this. because the method is in the class but can't be read in through render unless it has this. 
          The bind is so that the correct class above is called to get this method
        */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

//const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
