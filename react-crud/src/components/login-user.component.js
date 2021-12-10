import React, { Component } from "react";
import UserDataService from "../services/user.service";
import Helmet from 'react-helmet';
import Cookies  from 'js-cookie';

export default class LoginUser extends Component {
    constructor(props) {
        super(props);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        // this.saveSample = this.saveSample.bind(this);
        this.newSample = this.newSample.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.setToken = this.setToken.bind(this);

        this.state = {
            id: null,
            email: "",
            password: "",
            token: "",

            submitted: false
        };
    }

    setEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    setToken(e) {
        this.setState({
            token: e.target.value
        });
    }

    loginUser() {
        var data = {
            email: this.state.email,
            password: this.state.password
        };

        UserDataService.login(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    email: response.data.email,
                    password: response.data.password,

                    submitted: true
                });
                this.setToken(response.data.accessToken);
                Cookies.set('jtw', response.data.accessToken);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    logoutUser() {
        Cookies.set('jtw', '');
        window.location.replace("/login");
    }

    newSample() {
        this.setState({
            id: null,
            email: "",
            password: "",

            submitted: false
        });
    }

    render() {
        return (
            <div 
            style={{
                width: '100%',
                height: '100%'
            }}>
                <Helmet bodyAttributes={{style: 'background-color : #50A0B9'}}/>
                <div className="submit-form">
                    {this.state.submitted ? (
                        <div>
                            <h4>Login Success!</h4>
                            <button onClick={this.logoutUser} className="btn btn-warning mt-3">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div 
                            className="card p-3 position-absolute align-middle"
                        >
                            <label className="display-4 text-center">Masuk</label>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.setEmail}
                                    name="email"
                                    placeholder="Email"
                                />
                            </div>

                            <div className="form-group mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    required
                                    value={this.state.password}
                                    onChange={this.setPassword}
                                    name="password"
                                    placeholder="Password"
                                />

                                <button onClick={this.loginUser} className="btn btn-success mt-3">
                                    Login
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}