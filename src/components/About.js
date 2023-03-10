import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Profile from "./ProfileClass";

class About extends React.Component {
    constructor(props) {
        super(props);

        console.log("constructor parent");
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            console.log("hello");
        }, 1000);
        console.log("componentDidMount parent ");
    }
    componentDidUpdate() {
        console.log("component did update");
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        console.log("render  parent ");
        return <Profile />;
    }
}
export default About;
