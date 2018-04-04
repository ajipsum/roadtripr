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
import Slider from 'rc-slider';

/*
Multiselect code taken from https://github.com/JedWatson/react-select
*/
const STATES = [
    {label: 'AL', value: 'Alabama'},
    {label: 'AK', value:'Alaska'},
    {label: 'AZ', value:'Arizona'},
    {label: 'AR', value:'Arkansas'},
    {label: 'CA', value:'California'},
    {label: 'CO', value:'Colorado'},
    {label: 'CT', value:'Connecticut'},
    {label: 'DE', value:'Delware'},
    {label: 'FL', value:'Florida'},
    {label: 'GA', value:'Georgia'},
    {label: 'HI', value:'Hawaii'},
    {label: 'ID', value:'Idaho'},
    {label: 'IL', value:'Illinois'},
    {label: 'IN', value:'Indiana'},
    {label: 'IA', value:'Iowa'},
    {label: 'KS', value:'Kansas'},
    {label: 'KY', value:'Kentucky'},
    {label: 'LA', value:'Louisiana'},
    {label: 'ME', value:'Maine'},
    {label: 'MD', value:'Maryland'},
    {label: 'MA', value:'Massachusetts'},
    {label: 'MI', value:'Michigan'},
    {label: 'MN', value:'Minnesota'},
    {label: 'MS', value:'Mississippi'},
    {label: 'MO', value:'Missouri'},
    {label: 'MT', value:'Montana'},
    {label: 'NE', value:'Nebraska'},
    {label: 'NV', value:'Nevada'},
    {label: 'NH', value:'New Hampshire'},
    {label: 'NJ', value:'New Jersey'},
    {label: 'NM', value:'New Mexico'},
    {label: 'NY', value:'New York'},
    {label: 'NC', value:'North Carolina'},
    {label: 'ND', value:'North Dakota'},
    {label: 'OH', value:'Ohio'},
    {label: 'OK', value:'Oklahoma'},
    {label: 'OR', value:'Oregon'},
    {label: 'PA', value:'Pennsylvania'},
    {label: 'RI', value:'Rhode Island'},
    {label: 'SC', value:'South Carolina'},
    {label: 'SD', value:'South Dakota'},
    {label: 'TN', value:'Tennessee'},
    {label: 'TX', value:'Texas'},
    {label: 'UT', value:'Utah'},
    {label: 'VT', value:'Vermont'},
    {label: 'VA', value:'Virginia'},
    {label: 'WA', value:'Washington'},
    {label: 'WV', value:'West Virginia'},
    {label: 'WI', value:'Wisconsin'},
    {label: 'WY', value:'Wyoming'}
]

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
        const options = STATES;
		return (
			<div className="section">
				<h4 className="section-heading">Filter</h4>
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="State"
          removeSelected={this.state.removeSelected}
					simpleValue
					value={value}
				/>
			</div>
		);
	}
});
/*
var MultiSelectFilter_Population = createClass({
    displayName: 'Filter',
    propTypes:{
        label: PropTypes.string,
    },
    getInitialState () {
        return {
			value: {
                min: 0,
                max: 100000000
            }
        };
    },
    handleMaxChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
    render () {
		return (
        <div className="section">
			<form className="form">
                <InputRange
                    draggableTrack
                    maxValue={20}
                    minValue={0}
                    onChange={value => this.setState({ value: value })}
                    onChangeComplete={value => console.log(value)}
                    value={this.state.value}
                />
            </form>
        </div>
		);
	}
});
*/

const Range = Slider.Range;
function log(value) {
    console.log(value); //eslint-disable-line
  }

  class CustomizedRange extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lowerBound: 0,
        upperBound: 1000000000,
        value: [0, 1000000000],
      };
    }
    onLowerBoundChange = (e) => {
      this.setState({ lowerBound: +e.target.value });
    }
    onUpperBoundChange = (e) => {
      this.setState({ upperBound: +e.target.value });
    }
    onSliderChange = (value) => {
      log(value);
      this.setState({
        value,
      });
    }
    handleApply = () => {
      const { lowerBound, upperBound } = this.state;
      this.setState({ value: [lowerBound, upperBound] });
    }
    render() {
      return (
        <div>
          <h4 className="section-heading">Population</h4>
          <label>Min: </label>
          <input type="number" value={this.state.lowerBound} onChange={this.onLowerBoundChange} />
          <label>Max: </label>
          <input type="number" value={this.state.upperBound} onChange={this.onUpperBoundChange} />
          <button onClick={this.handleApply}>Apply</button>
          <br /><br />
          <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
        </div>
      );
    }
  }

var config = {
    headers: {'Access-Control-Allow-Origin': '*'}

};
var self = this;
export default class Cities extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totCities: 0,
            activePage: 1,
            sort: {"field": "population", "direction": "desc"},
            cities: []
          }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.sortby = this.sortby.bind(this)

       this.MultiSelectFilter_State = new MultiSelectFilter_State().render();
    }
    getCities(page, field, direction) {
        axios.get('http://api.roadtripr.fun/city?page=' + page + '&results_per_page=15&q={"order_by":[{"field":"' + field + '","direction":"' + direction + '"}]}')
        .then(res => {
            console.log(res);
            this.setState({cities: res.data.objects, totCities:res.data.num_results})
            console.log(this.state.cities)
            console.log(this.state.totCities)

        });
    }
    renderCities(){
        console.log("in rendercities");
        for (var city of this.state.cities){
            this.renderPark(city);
        }

    }
    renderCity(city){
        var cityName = city.name.split(",")[0]
        var state = city.name.split(",")[1]
        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
            <div className="portfolio-wrap">
            <figure>
                <a href={"/city/" + city.name}><img src={city.image} className="img-fluid" alt /></a>
                {/* <a href={city.image} data-lightbox="portfolio" data-title="city" className="link-preview" title="Preview"><i className="ion ion-eye" /></a> */}
            </figure>
            <div className="portfolio-info">
                <p><Link to={'/city/' + city.name}>{cityName}</Link></p>
                {state} | Pop: {city.population}
            </div>
            </div>
        </div>)

      console.log(element)
      return element;


    }
    componentDidMount(){
        console.log("component");
        this.getCities(1, "population", "desc");

    }
    handlePageChange(data){
        this.setState({activePage: data})
        var field = this.state.sort.field
        var dir = this.state.sort.direction
        this.getCities(data, field, dir)

    }
    sortby(key) {
        var translation = {"1": {"field": "name", "direction": "asc"},
                           "2": {"field": "name", "direction": "desc"},
                           "3": {"field": "population", "direction": "desc"},
                           "4": {"field": "population", "direction": "asc"},
                           "5": {"field": "state", "direction": "asc"},
                           "6": {"field": "state", "direction": "desc"}};
        var values = translation[key];
        this.setState({sort: values});
        this.getCities(1, values.field, values.direction)
    }

    render() {
        var elements = []
        for(var city of this.state.cities){
            elements.push(this.renderCity(city));

        }
        return (
            <div>
            <section id="portfolio" className="section-bg">
              <div className="container">
              <header className="section-header" style={{marginBottom:"60px"}}>
                  <h3 style={{display:"inline"}}className="section-title">Cities</h3>
                  <div style={{float:"right", display:"inline"}}>
                    <DropdownButton class="sort-dropdown" title="Sort">
                        <MenuItem eventKey="1" onSelect={this.sortby}>Name: A-Z</MenuItem>
                        <MenuItem eventKey="2" onSelect={this.sortby}>Name: Z-A</MenuItem>
                        <MenuItem eventKey="3" onSelect={this.sortby}>Population: High-Low</MenuItem>
                        <MenuItem eventKey="4" onSelect={this.sortby}>Population: Low-High</MenuItem>
                    </DropdownButton>
                    </div>
                </header>
                <div className="row portfolio-container">
                    <MultiSelectFilter_State/>
                    <CustomizedRange/>
                    {elements}
                </div>
              </div>
            </section>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Pagination
                totalItemsCount={this.state.totCities}
                activePage={this.state.activePage}
                itemsCountPerPage={15}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange} />
            </div>
          </div>
        );
    }

}