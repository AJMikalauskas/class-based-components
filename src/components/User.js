import { Component } from 'react';
import classes from './User.module.css';

class User extends Component{

  // This will show 3 times since this User.js is called from the .map() in Users.js
    // The console will show this message 3 times - remember list items each have their own js component if called as list with map form another component   
  componentWillUnmount() {
    console.log("User Will Unmount!");
  }

  // render acts as the return statement in functional components as seen below
    // props is passed in as param to functional components, but with class based components. props is this.props.name which is from Component import
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}


// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
