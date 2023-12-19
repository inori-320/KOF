import React, { Component } from 'react';
import Base from './base';
import $ from 'jquery';

class Register extends Component {
    state = {
        error_message: "",
        username: "",
        password: "",
        conform_password: ""
    };

    handleClick = (e) => {
        e.preventDefault();

        if(this.state.username === ""){
            this.setState({
                error_message:"用户名不能为空!"
            })
        }
        else if(this.state.password === ""){
            this.setState({
                error_message:"密码不能为空!"
            })
        }
        else if(this.state.password !== this.state.conform_password){
            this.setState({
                error_message: "两次密码不一致！"
            })
        }
        else if(this.state.conform_password === ""){
            this.setState({
                error_message: "确认密码不能为空!"
            })
        }
        else {
            $.ajax({
                url:"http://192.168.163.1:3000/register/",
                type: "post",
                date: {
                    username: this.state.username,
                    password: this.state.password,
                },
                dataType: "json",
                success: resp => {
                    if(resp.result === "success") {
                        window.location.href="http://192.168.163.1:3000";
                    } else {
                        this.setState({
                            error_message: "用户名已存在"
                        })
                    }
                }
            });
        }
    };

    render() { 
        return (
            <React.Fragment>
                <Base>
                    <form>
                        <div className="container">
                            <div className="row justify-content-md-center">
                                <div className="col col-sm-4 ">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input onChange={(e) => {this.setState({username: e.target.value})}} type="text" className="form-control" id="username" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input onChange={(e) => {this.setState({password: e.target.value})}} type="password" className="form-control" id="password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="conform_password" className="form-label">Conform Password</label>
                                        <input onChange={(e) => {this.setState({conform_password: e.target.value})}} type="password" className="form-control" id="conform_password" />
                                    </div>
                                    <div style={{height: "2rem", color: "red"}}>
                                        {this.state.error_message}
                                    </div>
                                    <button onClick={this.handleClick} type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Base>
            </React.Fragment>
        );
    }
}
 
export default Register;