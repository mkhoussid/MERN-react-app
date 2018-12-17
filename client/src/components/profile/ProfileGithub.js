import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "ca0186dbe65e1e9f543d",
      clientSecret: "12c70252f63688e83741359cd500395727366e11",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    console.log(
      "\n|\n|\n|\n|\n|\n|\n|\n|\n|\n-----------componentDidMount------------\n|\n|\n|\n|\n|\n|\n|\n|\n|\n"
    );
    const { username } = this.props; //coming from component props
    const { count, sort, clientId, clientSecret } = this.state; //coming from above state

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    let repoItems;

    if (repos.message === "Not Found") {
      repoItems = [];
    } else {
      repoItems = repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                {/* <Link
                  to={repo.html_url}
                  className="text-info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </Link> */}
                <a
                  href={repo.html_url}
                  className="text-info"
                  target="_blank"
                  rel="noopener noreferrer"
                  alt={"Repository: " + repo.name}
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers.count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Repositories</h3>
        {repoItems.length > 0 ? (
          <ul className="list-group">{repoItems}</ul>
        ) : (
          <p className="text-center">No Repos yet</p>
        )}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
