import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route} from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import {DropdownButton, MenuItem} from "react-bootstrap";
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

const STATES = [
    {
        label: 'AL',
        value: 'AL'
    }, {
        label: 'AK',
        value: 'AK'
    }, {
        label: 'AZ',
        value: 'AZ'
    }, {
        label: 'AR',
        value: 'AR'
    }, {
        label: 'CA',
        value: 'CA'
    }, {
        label: 'CO',
        value: 'CO'
    }, {
        label: 'CT',
        value: 'CT'
    }, {
        label: 'DE',
        value: 'DE'
    }, {
        label: 'FL',
        value: 'FL'
    }, {
        label: 'GA',
        value: 'GA'
    }, {
        label: 'HI',
        value: 'HI'
    }, {
        label: 'ID',
        value: 'ID'
    }, {
        label: 'IL',
        value: 'IL'
    }, {
        label: 'IN',
        value: 'IN'
    }, {
        label: 'IA',
        value: 'IA'
    }, {
        label: 'KS',
        value: 'KS'
    }, {
        label: 'KY',
        value: 'KY'
    }, {
        label: 'LA',
        value: 'LA'
    }, {
        label: 'ME',
        value: 'ME'
    }, {
        label: 'MD',
        value: 'MD'
    }, {
        label: 'MA',
        value: 'MA'
    }, {
        label: 'MI',
        value: 'MI'
    }, {
        label: 'MN',
        value: 'MN'
    }, {
        label: 'MS',
        value: 'MS'
    }, {
        label: 'MO',
        value: 'MO'
    }, {
        label: 'MT',
        value: 'MT'
    }, {
        label: 'NE',
        value: 'NE'
    }, {
        label: 'NV',
        value: 'NV'
    }, {
        label: 'NH',
        value: 'NH'
    }, {
        label: 'NJ',
        value: 'NJ'
    }, {
        label: 'NM',
        value: 'NM'
    }, {
        label: 'NY',
        value: 'NY'
    }, {
        label: 'NC',
        value: 'NC'
    }, {
        label: 'ND',
        value: 'ND'
    }, {
        label: 'OH',
        value: 'OH'
    }, {
        label: 'OK',
        value: 'OK'
    }, {
        label: 'OR',
        value: 'OR'
    }, {
        label: 'PA',
        value: 'PA'
    }, {
        label: 'RI',
        value: 'RI'
    }, {
        label: 'SC',
        value: 'SC'
    }, {
        label: 'SD',
        value: 'SD'
    }, {
        label: 'TN',
        value: 'TN'
    }, {
        label: 'TX',
        value: 'TX'
    }, {
        label: 'UT',
        value: 'UT'
    }, {
        label: 'VT',
        value: 'VT'
    }, {
        label: 'VA',
        value: 'VA'
    }, {
        label: 'WA',
        value: 'WA'
    }, {
        label: 'WV',
        value: 'WV'
    }, {
        label: 'WI',
        value: 'WI'
    }, {
        label: 'WY',
        value: 'WY'
    }
]

const DESIGNATION = [
    {
        label: 'National Historical Park',
        value: 'National Historical Park'
    }, {
        label: 'National Park',
        value: 'National Park'
    }, {
        label: 'National Monument',
        value: 'National Monument'
    }, {
        label: 'National Historic Trail',
        value: 'National Historic Trail'
    }, {
        label: 'Wild River',
        value: 'Wild River'
    }, {
        label: 'National Historic Area',
        value: 'National Historic Area'
    }, {
        label: 'National Historic Site',
        value: 'National Historic Site'
    }, {
        label: 'Park',
        value: 'Park'
    }, {
        label: 'National Recreation Area',
        value: 'National Recreation Area'
    }, {
        label: 'National Monument & Preserve',
        value: 'National Monument & Preserve'
    }, {
        label: 'National Battlefield',
        value: 'National Battlefield'
    }, {
        label: 'National Lakeshore',
        value: 'National Lakeshore'
    }, {
        label: 'National Scenic Trail',
        value: 'National Scenic Trail'
    }, {
        label: 'National Heritage Area',
        value: 'National Heritage Area'
    }, {
        label: 'National Memorial',
        value: 'National Memorial'
    }, {
        label: 'National Seashore',
        value: 'National Seashore'
    }, {
        label: 'Parkway',
        value: 'Parkway'
    }, {
        label: 'National Preserve',
        value: 'National Preserve'
    }, {
        label: 'National River & Recreation Area',
        value: 'National River & Recreation Area'
    }, {
        label: 'National Scenic River',
        value: 'National Scenic River'
    }, {
        label: 'National Battlefield Site',
        value: 'National Battlefield Site'
    }, {
        label: 'National River',
        value: 'National River'
    }, {
        label: 'Part of Colonial National Historical Park',
        value: 'Part of Colonial National Historical Park'
    }, {
        label: 'National Heritage Partnership',
        value: 'National Heritage Partnership'
    }, {
        label: 'National Military Park',
        value: 'National Military Park'
    }, {
        label: 'National Reserve',
        value: 'National Reserve'
    }, {
        label: 'National Heritage Corridor',
        value: 'National Heritage Corridor'
    }, {
        label: 'National Park & Preserve',
        value: 'National Park & Preserve'
    }, {
        label: 'National Historical Reserve',
        value: 'National Historical Reserve'
    }, {
        label: 'Part of Statue of Liberty National Monument',
        value: 'Part of Statue of Liberty National Monument'
    }, {
        label: 'National Monument and Historic Shrine',
        value: 'National Monument and Historic Shrine'
    }, {
        label: 'Memorial',
        value: 'Memorial'
    }, {
        label: 'Memorial Parkway',
        value: 'Memorial Parkway'
    }, {
        label: 'Cultural Heritage Corridor',
        value: 'Cultural Heritage Corridor'
    }, {
        label: 'National Monument of America',
        value: 'National Monument of America'
    }, {
        label: 'National Geologic Trail',
        value: 'National Geologic Trail'
    }, {
        label: 'National Historical Park and Preserve',
        value: 'National Historical Park and Preserve'
    }, {
        label: 'National Battlefield Park',
        value: 'National Battlefield Park'
    }, {
        label: 'National Wild and Scenic River',
        value: 'National Wild and Scenic River'
    }, {
        label: 'National River and Recreation Area',
        value: 'National River and Recreation Area'
    }, {
        label: 'National Recreational River',
        value: 'National Recreational River'
    }, {
        label: 'Heritage Area',
        value: 'Heritage Area'
    }, {
        label: 'Wild & Scenic River',
        value: 'Wild & Scenic River'
    }, {
        label: 'National Scenic Riverways',
        value: 'National Scenic Riverways'
    }, {
        label: 'Grand Canyon-Parashant National Monument',
        value: 'Grand Canyon-Parashant National Monument'
    }, {
        label: 'National and State Parks',
        value: 'National and State Parks'
    }, {
        label: 'International Park',
        value: 'International Park'
    }, {
        label: 'International Historic Site',
        value: 'International Historic Site'
    }, {
        label: 'National Scenic Riverway',
        value: 'National Scenic Riverway'
    }, {
        label: 'National Historical Park and Ecological Preserve',
        value: 'National Historical Park and Ecological Preserve'
    }, {
        label: 'National Parks',
        value: 'National Parks'
    }, {
        label: 'National Historic District',
        value: 'National Historic District'
    }, {
        label: 'Ecological & Historic Preserve',
        value: 'Ecological & Historic Preserve'
    }, {
        label: 'Scenic & Recreational River',
        value: 'Scenic & Recreational River'
    }, {
        label: 'Affiliated Area',
        value: 'Affiliated Area'
    }
]
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

var MultiSelectFilter_Designation = createClass({
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
        const options = DESIGNATION;
		return (
			<div className="section">
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Designation"
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
    headers: {
        'Access-Control-Allow-Origin': '*'
    }

};

export default class Parks extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totParks: 0,
            activePage: 1,
            sort: {
                "field": "name",
                "direction": "asc"
            },
            parks: [],
            filters: "",
            stateVal: [],
            desigVal: []
        }
        this.handlePageChange = this
            .handlePageChange
            .bind(this)
        this.sortby = this
            .sortby
            .bind(this)
        this.handleDesigChange = this
            .handleDesigChange
            .bind(this)
        this.handleStateChange = this
            .handleStateChange
            .bind(this)
        this.buildFilters = this
            .buildFilters
            .bind(this)
        this.handleApply = this
            .handleApply
            .bind(this)

    }
    getParks(page, field, direction, filters) {
        axios
            .get('http://api.roadtripr.fun/park?page=' + page + '&results_per_page=15&q={' + filters + '"order_by":[{"field":"' + field + '","direction":"' + direction + '"}]}')
            .then(res => {
                this.setState({parks: res.data.objects, totParks: res.data.num_results})
            });
    }
    renderParks() {
        for (var park of this.state.parks) {
            this.renderPark(park);
        }

    }
    renderPark(park) {
        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
                <div className="portfolio-wrap">
                    <figure>
                        <a href={"/parks/" + park.name}><img src={park.image} className="img-fluid" alt/></a>
                    </figure>
                    <div className="portfolio-info">
                        <p>
                            <Link to={'/parks/' + park.name}>{park.name}</Link>
                        </p>
                        {park.states} | {park.designation}
                    </div>
                </div>
            </div>
        )
        return element;

    }
    componentDidMount() {
        this.getParks(1, "name", "asc", this.state.filters);
    }
    handlePageChange(data) {
        this.setState({activePage: data})
        var field = this.state.sort.field
        var dir = this.state.sort.direction
        this.getParks(data, field, dir, this.state.filters)
    }
    sortby(key) {
        var translation = {
            "1": {
                "field": "name",
                "direction": "asc"
            },
            "2": {
                "field": "name",
                "direction": "desc"
            },
            "3": {
                "field": "designation",
                "direction": "asc"
            },
            "4": {
                "field": "designation",
                "direction": "desc"
            },
            "5": {
                "field": "states",
                "direction": "asc"
            },
            "6": {
                "field": "states",
                "direction": "desc"
            }
        };
        var values = translation[key];
        this.setState({sort: values});
        this.getParks(1, values.field, values.direction, this.state.filters)
    }
    handleStateChange(value) {
        this.setState({stateVal: value});
    }
    handleDesigChange(value) {
        this.setState({desigVal: value});
    }
    handleApply = () => {
        const {lowerBound, upperBound} = this.state;
        this.setState({
            value: [lowerBound, upperBound]
        });

    }
    buildFilters() {

        // &q={"filters":[{"or": [{"name":"name","op":"like","val":' + query +
        // '},{"name":"population","op":"like","val":' + query + '}]}]}
        var filter = '"filters":[{"and":['
        filter = filter + '{"or":['
        if (this.state.stateVal.length) {
            var stateFilters = this
                .state
                .stateVal
                .split(',')
            if (stateFilters.length) {
                for (var i = 0; i < stateFilters.length; i++) {
                    var filt = stateFilters[i]
                    if (i != stateFilters.length - 1) {
                        filter = filter + ('{"name":"states","op":"like","val":"' + filt + '"},');
                    } else {
                        filter = filter + ('{"name":"states","op":"like","val":"' + filt + '"}');
                    }
                }
            }
        }
        filter = filter + "]},"
        filter = filter + '{"or":['
        if (this.state.desigVal.length) {
            var desigFilters = this
                .state
                .desigVal
                .split(',')
            if (desigFilters.length) {
                for (var i = 0; i < desigFilters.length; i++) {
                    var filt = desigFilters[i]
                    if (i != desigFilters.length - 1) {
                        filter = filter + ('{"name":"designation","op":"like","val":"' + filt + '"},');
                    } else {
                        filter = filter + ('{"name":"designation","op":"like","val":"' + filt + '"}');
                    }
                }
            }
        }

        filter = filter + "]}]}],"
        this.setState({filters: filter})
        this.getParks(1, this.state.sort.field, this.state.sort.direction, filter)

    }
    render() {
        var elements = []
        // var i = 0
        for (var park of this.state.parks) {
            elements.push(this.renderPark(park));
        }

        const {disabled, stayOpen, value} = this.state;
        const states = this.state.stateVal;
        const desigs = this.state.desigVal

        return (
            <div>
                <section id="portfolio" className="section-bg">
                    <div className="container">
                        <header
                            className="section-header"
                            style={{
                            marginBottom: "60px"
                        }}>
                        <h3 className="section-title">Parks</h3>
                        </header>
                        <div className="row portfolio-container">
                            <div className="section">
                                <div className="selector-small">
                                    <Select
                                        closeOnSelect={!stayOpen}
                                        disabled={disabled}
                                        multi
                                        onChange={this.handleStateChange}
                                        options={STATES}
                                        placeholder="State"
                                        removeSelected={this.state.removeSelected}
                                        simpleValue
                                        value={states}/>
                                </div>
                                <div className="selector-medium">
                                    <Select
                                        closeOnSelect={!stayOpen}
                                        disabled={disabled}
                                        multi
                                        onChange={this.handleDesigChange}
                                        options={DESIGNATION}
                                        placeholder="Designation"
                                        removeSelected={this.state.removeSelected}
                                        simpleValue
                                        value={desigs}/>
                                </div>
                                <button className="btn btn-default filter-btn" onClick={this.buildFilters}>Filter</button>
                                <div style={{float: "right", display: "inline"}}>
                                    <DropdownButton class="sort-dropdown" title="Sort">
                                        <MenuItem eventKey="1" onSelect={this.sortby}>Name: A-Z</MenuItem>
                                        <MenuItem eventKey="2" onSelect={this.sortby}>Name: Z-A</MenuItem>
                                        <MenuItem eventKey="3" onSelect={this.sortby}>Designation: A-Z</MenuItem>
                                        <MenuItem eventKey="4" onSelect={this.sortby}>Designation: Z-A</MenuItem>
                                        <MenuItem eventKey="5" onSelect={this.sortby}>States: A-Z</MenuItem>
                                        <MenuItem eventKey="6" onSelect={this.sortby}>States: Z-A</MenuItem>
                                    </DropdownButton>
                                </div>

                            </div>
                            {elements}

                        </div>
                    </div>
                </section>
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Pagination
                        totalItemsCount={this.state.totParks}
                        activePage={this.state.activePage}
                        itemsCountPerPage={15}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}/>
                </div>
            </div>

        );
    }

}