import { Component } from 'react';

class ErrorBoundary extends Component {
    // This acts like a normal class based components and so it can have state management and constructors
    constructor() {
        super();
        this.state = { hasError: false, errorMsg: ""};
    }
    
    // This can be added to any component and it makes the component an error boundary
        // This can't be added to a functional component - only class-based components
    componentDidCatch(error) {
        // I have no clue what error retruns but once found out, most likely error.somethingMessage?
        console.log(error);
        this.setState({ hasError: true, errorMsg: error});
    }

    // This acts as an error boundary for all other components
        // Wraps around and protects other children it's wrapped around
    render() {
        // if hasError becomes true the paragraph below will show.
        if(this.state.hasError)
        {
            return <p>Something went wrong!</p>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;