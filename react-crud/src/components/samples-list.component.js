import React, { Component } from "react";
import SampleDataService from "../services/sample.service";
import { Link } from "react-router-dom";

export default class SamplesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveSamples = this.retrieveSamples.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveSample = this.setActiveSample.bind(this);
        this.removeAllSamples = this.removeAllSamples.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            samples: [],
            currentSample: null,
            currentIndex: -1,
            searchTitle: ""
        }
    }

    componentDidMount() {
        this.retrieveSamples();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveSamples() {
        SampleDataService.getAll()
            .then(response => {
                this.setState({
                    samples: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveSamples();
        this.setState({
            currentSample: null,
            currentIndex: -1
        });
    }

    setActiveSample(sample, index) {
        this.setState({
            currentSample: sample,
            currentIndex: index
        });
    }

    removeAllSamples() {
        SampleDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        SampleDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    samples: response.data
                });
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        const { searchTitle, samples, currentSample, currentIndex } = this.state;

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Samples List</h4>

                    <ul className="list-group">
                        {samples &&
                            samples.map((sample, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveSample(sample, index)}
                                    key={index}
                                >
                                    {sample.title}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllSamples}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentSample? (
                        <div>
                            <h4>Sample</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentSample.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentSample.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong> 
                                </label>{" "}
                                {currentSample.published ? "Published" : "Pending"}
                            </div>

                            <Link
                                to={"samples/" + currentSample.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>please click on a Sample</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}