import { Fragment, useState, useEffect, Component } from "react";
import UsersContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary";
import styles from "./UserFinder.module.css";
import Users from "./Users";

// const DUMMY_USERS = [
//   { id: "u1", name: "Max" },
//   { id: "u2", name: "Manuel" },
//   { id: "u3", name: "Julie" },
// ];

class UserFinder extends Component {
    static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  // If call to database without dummy_users, filteredUsers being set to empty array, need ot get data on start, so use componentDidMount()
  componentDidMount() {
      //Send http request...
        // this acts as useEffect(() => {}, []) with none or some dependencies
      this.setState({filteredUsers: this.context.users});
      // Good example of componentDidMount() - this shows that it runs on the start of the page to get the data for an empty array equal to DUMMY_USERS
  }

  // 2 points to life cycle methods
    // 1. Under what circumstance will these lifecycle method be called, no dependencies like normal method?, on update of page with minor dependencies
        // 2.  Or clean-up function with useEffect()? Run if statement to stop code from running in these lifecycle methods
            // useEffect() handles all of these questions        

  componentDidUpdate(prevProps, prevState) {
    // This creates an infinite loop because when state is set here, it would update component which would be infinite loop.
    // Need to run an if statement comparing the old state and seeing it's comparison to the new state.
        // The if statement isn't necessary in useEffect unlike shown in class-based components.
            // The if statement also stops the infinite loop because if it's not a changed value in the input, it won't run the filter. 
                // even if there is another update causing the component to re-render 
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm.toUpperCase() || this.state.searchTerm.toLowerCase())
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={styles.finder}>
          {/* remember for methods called within the render/return to put this.method.bind(this) */}
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
        <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
// //   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
// //   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

// //   const searchChangeHandler = (event) => {
// //     setSearchTerm(event.target.value);
// //   };

// //   return (
// //     <Fragment>
// //       <div className={styles.finder}>
// //         <input type="search" onChange={searchChangeHandler} />
// //       </div>
// //       <Users users={filteredUsers} />
// //     </Fragment>
// //   );
// };

export default UserFinder;
