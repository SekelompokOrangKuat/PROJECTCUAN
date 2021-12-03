// NEED TO BE FIXED ASAP
// - Integrate variable name

import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.onRegNIM = this.onRegNIM.bind(this);
        this.onRegRoles = this.onRegRoles.bind(this);
        this.onRegEmail = this.onRegEmail.bind(this);
        this.onRegPassword = this.onRegPassword.bind(this);
        this.onRegFullName = this.onRegFullName.bind(this);
        this.onRegBirthDate = this.onRegBirthDate.bind(this);
        this.onRegAddress = this.onRegAddress.bind(this);
        this.onRegProdi = this.onRegProdi.bind(this);
        this.onRegPhoneNumber = this.onRegPhoneNumber.bind(this);
        this.onRegSex = this.onRegSex.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            nim: "",
            roles: "",
            email: "",
            password: "",
            fullname: "",
            birthdate: "",
            address: "",
            prodi: "",
            phonenumber: "",
            sex: "",

            submitted: false
        };
    }

    onRegNIM(e) {
        this.setState({
            nim: e.target.value
        });
    }

    onRegRoles(e) {
        this.setState({
            roles: e.target.value
        });
    }

    onRegEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onRegPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onRegFullName(e) {
        this.setState({
            fullname: e.target.value
        });
    }

    onRegBirthDate(e) {
        this.setState({
            birthdate: e.target.value
        });
    }

    onRegAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onRegProdi(e) {
        this.setState({
            prodi: e.target.value
        });
    }

    onRegPhoneNumber(e) {
        this.setState({
            phonenumber: e.target.value
        });
    }

    onRegSex(e) {
        this.setState({
            sex: e.target.value
        });
    }

    saveUser() {
        var data = {
            nim: this.state.nim,
            roles: [this.state.roles],
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname,
            birthdate: this.state.birthdate,
            address: this.state.address,
            prodi: this.state.prodi,
            phonenumber: this.state.phonenumber,
            sex: this.state.sex,
        };

        UserDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    nomor_induk: response.data.nim,
                    roles: [response.data.roles],
                    email: response.data.email,
                    password: response.data.password,
                    name: response.data.fullname,
                    tgl_lahir: response.data.birthdate,
                    alamat: response.data.address,
                    prodi: response.data.prodi,
                    no_tlp: response.data.phonenumber,
                    gender: response.data.sex,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response)
            });
            // .catch(e => {
            //     console.log("Cannot create the data!");
            // });
    }

    newUser() {
        this.setState({
            id: null,
            nim: "",
            roles: "",
            email: "",
            password: "",
            fullname: "",
            birthdate: "",
            address: "",
            prodi: "",
            phonenumber: "",
            sex: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newUser}>
                            Register
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="nim">NIM</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nim"
                                required
                                value={this.state.nim}
                                onChange={this.onRegNIM}
                                name="nim"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="roles">Roles</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roles"
                                required
                                value={this.state.roles}
                                onChange={this.onRegRoles}
                                name="roles"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={this.state.email}
                                onChange={this.onRegEmail}
                                name="email"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                required
                                value={this.state.password}
                                onChange={this.onRegPassword}
                                name="password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fullname">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullname"
                                required
                                value={this.state.fullname}
                                onChange={this.onRegFullName}
                                name="fullname"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="birthdate">Birth Date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="birthdate"
                                required
                                value={this.state.birthdate}
                                onChange={this.onRegBirthDate}
                                name="birthdate"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                required
                                value={this.state.address}
                                onChange={this.onRegAddress}
                                name="address"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="prodi">Prodi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="prodi"
                                required
                                value={this.state.prodi}
                                onChange={this.onRegProdi}
                                name="prodi"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phonenumber">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phonenumber"
                                required
                                value={this.state.phonenumber}
                                onChange={this.onRegPhoneNumber}
                                name="phonenumber"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sex">Sex</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sex"
                                required
                                value={this.state.sex}
                                onChange={this.onRegSex}
                                name="sex"
                            />
                        </div>

                        <button onClick={this.saveUser} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}