import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";

class NavBar extends Component {
    state = {
    };
    
    render_calculator = () => {
        console.log(this.props);
        if(this.props.is_login){
            return(
                <li className="nav-item">
                    <Link className="nav-link" to="/calculator">Calculator</Link>
                </li>     
            );
        } else {
            return "";
        }
    }

    handleClick = () => {
        $.ajax({
            url:"http://192.168.163.1:3000/logout",
            type: "post",
            success: resp => {
                if(resp.result === "success") {
                    window.location.href="/";
                }
            }
        });
    }

    render_user = () => {
        if(!this.props.is_login){
            return(
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" style={{cursor:'pointer'}} href='/'>{this.props.username}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={this.handleClick} style={{cursor:'pointer'}} href='/'>Logout</a>
                    </li>
                </ul>
            );
        }
    };

    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Lty的计算器</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/home">Home</Link>
                                </li>
                                {this.render_calculator()}
                            </ul>
                            {this.render_user()}
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
 
export default NavBar;