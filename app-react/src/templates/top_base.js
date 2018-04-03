import React from 'react';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';


export default class TopBase extends React.Component {
  constructor(props) {
      super(props);
      this.state = {query: '', results: []};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    var query = "\"%" + this.state.query + "%\"";

    axios.get('hhttp://test.roadtripr.fun/city?q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"population","op":"like","val":' + query + '}]}]}')
      .then(res => { this.state.results.push(res); console.log('City results: ' + this.state.results);});

    axios.get('http://test.roadtripr.fun/park?q={"filters":[{"or": [{"name":"name","op":"like","val":' + query +'},{"name":"designation","op":"like","val":' + query +'},{"name":"states","op":"like","val":' + query +'},{"name":"cost","op":"like","val":' + query +'}]}]')
    .then(res => { this.state.results.push(res); console.log('Park results: ' + this.state.results);});

    axios.get('http://test.roadtripr.fun/restaurant?q={"filters":[{"or": [{"name":"name","op":"like","val":' + query +'},{"name":"rating","op":"like","val":' + query +'},{"name":"cuisine","op":"like","val":' + query +'},{"name":"pricing","op":"like","val":' + query +'}]}]')
    .then(res => { this.state.results.push(res); console.log('Restaurant results: ' + this.state.results);});
  }

  render(){
    return (
      <div>
        <title>RoadTripr</title>
        {//<meta content="width=device-width, initial-scale=1.0" name="viewport" />
        //<meta content name="keywords" />
       // <meta content name="description" />
      }
        {/* Favicons */}
        <link href="../static/img/favicon.png" rel="icon" />
        <link href="../static/img/apple-touch-icon.png" rel="apple-touch-icon" />
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700" rel="stylesheet" />
        {/* Bootstrap CSS File */}
        <link href="../static/lib/bootstrap/css/bootstrap.css" rel="stylesheet" />
        {/* Libraries CSS Files */}
        <link href="../static/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
        <link href="../static/lib/animate/animate.min.css" rel="stylesheet" />
        <link href="../static/lib/ionicons/css/ionicons.min.css" rel="stylesheet" />
        <link href="../static/lib/owlcarousel/assets/owl.carousel.css" rel="stylesheet" />
        <link href="../static/lib/lightbox/css/lightbox.min.css" rel="stylesheet" />
        {/* Main Stylesheet File */}
        <link href="../static/css/style.css" rel="stylesheet" />
        {/* =======================================================
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
              <h1><a href="/" className="scrollto">RoadTripr</a></h1>
            </div>
            <nav id="nav-menu-container" >
              <ul className="nav-menu">
                <li className="menu-active"><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><Link to='/cities'>Cities</Link></li>
                <li><a href="/parks">Parks</a></li>
                <li><a href="/restaurants">Restaurants</a></li>
                <li>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Search" value={this.state.query} onChange={this.handleChange}/>
                    <Button type="submit" value="Submit">Search</Button>
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
