import React, { Component } from 'react';
import NavBar from './navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './home';
import Calculator from './calculator';
import Login from './login';
import NotFound from './notFound';
import Register from './reg';
import Navigator from './navigator';
import $ from 'jquery';

class App extends Component {
    state = {
        is_login: true,
        username: "lty"
    };

    componentDidMount() {
        $.ajax({
            url: "http://192.168.163.1:3000",
            type: "get",
            success: resp => {
                if(resp.result === "login") {
                    this.setState({
                        is_login: true,
                        username: "lty"
                    });
                } else {
                    this.setState({
                        is_login: true,
                    });
                }
            }
        });
    }
    
    render() { 
        return (
            <React.Fragment>
                <NavBar is_login={this.state.is_login} username={this.state.username}/>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Navigator />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/calculator' element={this.state.is_login ? <Calculator /> : <Navigate replace to="/login" />} />
                        <Route path='/login' element={this.state.is_login ? <Navigate replace to="/home" /> : <Login is_login={this.state.is_login} username={this.state.username}/>} />
                        <Route path='/register' element={this.state.is_login ? <Navigate replace to="/home" /> : <Register is_login={this.state.is_login} username={this.state.username}/>} />
                        <Route path='/404' element={<NotFound />} />
                        <Route path='*' element={<Navigate replace to="/404" />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;