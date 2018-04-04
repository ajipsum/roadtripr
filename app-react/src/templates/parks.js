import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { DropdownButton, MenuItem } from "react-bootstrap";
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

var config = {
    headers: {'Access-Control-Allow-Origin': '*'}

};

export default class Parks extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totParks: 0,
            activePage: 1,
            sort: {"field": "name", "direction": "asc"},
            parks: []
          }
          this.handlePageChange = this.handlePageChange.bind(this)
          this.sortby = this.sortby.bind(this)

    }
    getParks(page, field, direction) {
        axios.get('http://api.roadtripr.fun/park?page=' + page + '&results_per_page=15&q={"order_by":[{"field":"' + field + '","direction":"' + direction + '"}]}')
        .then(res => {
          this.setState({parks: res.data.objects, totParks:res.data.num_results})
        });
    }
    renderParks(){
        console.log("in renderparks")
        for (var park of this.state.parks){
            this.renderPark(park);
        }

    }
    renderPark(park){
        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
                <div className="portfolio-wrap">
                    <figure>
                        <a href={"/parks/" + park.name}><img src={park.image} className="img-fluid" alt /></a>
                    </figure>
                    <div className="portfolio-info">
                        <p><Link to={'/parks/' + park.name}>{park.name}</Link></p>
                        {park.states} | {park.designation}
                    </div>
                </div>
            </div>)
      console.log(element);
      return element;


    }
    componentDidMount(){
         this.getParks(1, "name", "asc");
    }
    handlePageChange(data){
        this.setState({activePage: data})
        var field = this.state.sort.field
        var dir = this.state.sort.direction
        this.getParks(data, field, dir)
    }
    sortby(key) {
        var translation = {"1": {"field": "name", "direction": "asc"},
                           "2": {"field": "name", "direction": "desc"},
                           "3": {"field": "designation", "direction": "asc"},
                           "4": {"field": "designation", "direction": "desc"},
                           "5": {"field": "states", "direction": "asc"},
                           "6": {"field": "states", "direction": "desc"}};
        var values = translation[key];
        this.setState({sort: values});
        this.getParks(1, values.field, values.direction)
    }

    render() {
        var elements = []
        // var i = 0
        for(var park of this.state.parks){
            elements.push(this.renderPark(park));
        }

        return (
            <div>
                <section id="portfolio" className="section-bg">
                <div className="container">
                <header className="section-header" style={{marginBottom:"60px"}}>
                  <h3 style={{display:"inline"}}className="section-title">Parks</h3>
                  <div style={{float:"right", display:"inline"}}>
                    <DropdownButton class="sort-dropdown" title="Sort">
                        <MenuItem eventKey="1" onSelect={this.sortby}>Name: A-Z</MenuItem>
                        <MenuItem eventKey="2" onSelect={this.sortby}>Name: Z-A</MenuItem>
                        <MenuItem eventKey="3" onSelect={this.sortby}>Designation: A-Z</MenuItem>
                        <MenuItem eventKey="4" onSelect={this.sortby}>Designation: Z-A</MenuItem>
                        <MenuItem eventKey="5" onSelect={this.sortby}>States: A-Z</MenuItem>
                        <MenuItem eventKey="6" onSelect={this.sortby}>States: Z-A</MenuItem>
                    </DropdownButton>
                    </div>
                </header>
                    <div className="row portfolio-container">
                    {/* <MultiSelectFilter_State/> */}
                        {elements}
                    </div>
                </div>
                </section>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Pagination
                totalItemsCount={this.state.totParks}
                activePage={this.state.activePage}
                itemsCountPerPage={15}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange} />
            </div>
          </div>


        );
    }

}