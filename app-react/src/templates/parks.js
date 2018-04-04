import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
// const DATA = require(park.designation);
/*
var MultiSelectFilter_State = createClass({
    displayName: 'Filter',
    propTypes:{
        label: PropTypes.string,
    },
    getInitialState () {
        return {
            removeSelected: true,
			disabled: false,
			stayOpen: false,
			value: [],
        };
    },
    handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
    render () {
        const {disabled, stayOpen, value } = this.state;
        const options = DATA;
		return (
			<div className="section">
				<h4 className="section-heading">Filter</h4>
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					ptions={options}
					placeholder="State"
          removeSelected={this.state.removeSelected}
					simpleValue
					value={value}
				/>
			</div>
		);
	}
});
*/
var config = {
    headers: {'Access-Control-Allow-Origin': '*'}

};

export default class Parks extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totParks: 0,
            activePage: 1,
            parks: []
          }
          this.handlePageChange = this.handlePageChange.bind(this)

    }
    getParks(page) {
        axios.get('http://test.roadtripr.fun/park?page=' + page + '&results_per_page=15')
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
                        {/* <a href={park.image} data-lightbox="portfolio" data-title="park" className="link-preview" title="Preview"><i className="ion ion-eye" /></a>
                        <a href={"parks/" + park.name} className="link-details" title="More Details"><i className="ion ion-android-open" /></a> */}
                    </figure>
                    <div className="portfolio-info">
                        <p><Link to={'/parks/' + park.name}>{park.name}</Link></p>
                        {/* <a href="{park.website}" className="website">Website <i className="ion ion-android-open" /></a> */}
                        {park.states} | {park.designation}
                    </div>
                </div>
            </div>)
      console.log(element);
      return element;


    }
    componentDidMount(){
         this.getParks(1);
    }
    handlePageChange(data){
        this.setState({activePage: data})
        this.getParks(data)
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
                    <header className="section-header">
                    <h3 className="section-title">Parks</h3>
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