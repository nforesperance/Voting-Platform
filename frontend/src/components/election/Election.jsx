import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class Election extends Component {
    render() {
        return (
            <div className="election">
                <div className="row">
                    <div className="col-10"><h6>Elections ({this.props.year})</h6></div>
                    <div className="col-2">
                    <Link to={`/election/${this.props.year}`} className = "btn btn-primary btn-sm view">View</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Election
