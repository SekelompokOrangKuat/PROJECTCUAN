import React, { Component } from "react";
import SampleDataService from "../services/sample.service";

export default class Sample extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getSample = this.getSample.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateSample = this.updateSample.bind(this);
        this.deleteSample = this.deleteSample.bind(this);

        this.state = {
            currentSample: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getSample(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;
    
        this.setState(function(prevState) {
            return {
                currentSample: {
                    ...prevState.currentSample,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentSample: {
                ...prevState.currentSample,
                description: description
            }
        }));
    }

    getSample(id) {
        SampleDataService.get(id)
            .then(response => {
                this.setState({
                    currentSample: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentSample.id,
            title: this.state.currentSample.title,
            description: this.state.currentSample.description,
            published: status
        };

        SampleDataService.update(this.state.currentSample.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentSample: {
                        ...prevState.currentSample,
                        published: status
                    }
                }));
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateSample() {
        SampleDataService.update(
            this.state.currentSample.id,
            this.state.currentSample
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The sample was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteSample() {
        SampleDataService.delete(this.state.currentSample.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/samples')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentSample } = this.state;

        return (
            <div>
                {currentSample? (
                    <div className="edit-form">
                        <h4>Sample</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentSample.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentSample.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentSample.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentSample.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteSample}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateSample}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Sample</p>
                    </div>
                )}
            </div>
        );
    }
}