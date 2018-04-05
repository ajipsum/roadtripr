import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import {Form, Button, Glyphicon} from 'react-bootstrap'
import axios from 'axios';

export default class TopBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      redirect: false,
      url: ""
    };
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);

  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    var built = "/search/" + this.state.query;
    this.setState({redirect: true, url: built})
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={this.state.url}/>)
    }
    return (
      <div>
        <title>RoadTripr</title>
        {/* Favicons */}
        <link href="../static/img/favicon.png" rel="icon"/>
        <link href="../static/img/apple-touch-icon.png" rel="apple-touch-icon"/> {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700"
          rel="stylesheet"/> {/* Bootstrap CSS File */}
        <link href="../static/lib/bootstrap/css/bootstrap.css" rel="stylesheet"/> {/* Libraries CSS Files */}
        <link
          href="../static/lib/font-awesome/css/font-awesome.min.css"
          rel="stylesheet"/>
        <link href="../static/lib/animate/animate.min.css" rel="stylesheet"/>
        <link href="../static/lib/ionicons/css/ionicons.min.css" rel="stylesheet"/>
        <link
          href="../static/lib/owlcarousel/assets/owl.carousel.css"
          rel="stylesheet"/>
        <link href="../static/lib/lightbox/css/lightbox.min.css" rel="stylesheet"/> {/* Main Stylesheet File */}
        <link href="../static/css/style.css" rel="stylesheet"/> {/* =======================================================
    Theme Name: BizPage
    Theme URL: https://bootstrapmade.com/bizpage-bootstrap-business-template/
    Author: BootstrapMade.com
    License: https://bootstrapmade.com/license/
  ======================================================= */}
        {/*==========================
    Header
  ============================*/}
        <header id="header">
          <div className="container-fluid">
            <div id="logo" className="pull-left">
              <h1>
                <a href="/" className="scrollto">RoadTripr</a>
              </h1>
            </div>
            <nav id="nav-menu-container">
              <ul className="nav-menu">
                <li className="menu-active">
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <Link to='/cities'>Cities</Link>
                </li>
                <li>
                  <a href="/parks">Parks</a>
                </li>
                <li>
                  <a href="/restaurants">Restaurants</a>
                </li>
                <li>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      class="search-input"
                      type="search"
                      placeholder=""
                      value={this.state.query}
                      onChange={this.handleChange}/>
                    <button class="btn btn-default search-button" type="submit" value="Submit"><Glyphicon glyph="search"/></button>
                  </form>
                </li>
              </ul>
            </nav>{/* #nav-menu-container */}
          </div>
        </header>{/* #header */}
      </div>
    );
  }
}
