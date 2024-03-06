import React from "react";
import DataTable from "./table";
// import axios from 'axios';

class LifeCycleMethodImplemention extends React.Component {
    constructor() {
        super();
    }
    componentDidMount(){
        // axios.get('https://api.example.com/data')
        // .then(response => {
        //   // Handle the data here, e.g., update state
        //   console.log(response.data);
        // })
        // .catch(error => {
        //   // Handle errors here
        //   console.error('Error fetching data:', error);
        // });
    }
    // updating it`s call only when states or props updates. it`s best way to call on condition . if not using conditions it`s goes to inifinit loop
    componentDidUpdate(){}
    render() {
        return <>
            <h1> Class Component</h1>
            <DataTable></DataTable>
        </>
    }
}
export default LifeCycleMethodImplemention