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
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

/*
Multiselect code taken from https://github.com/JedWatson/react-select
*/
const STATES = [
    {
        label: 'AL',
        value: 'Alabama'
    }, {
        label: 'AK',
        value: 'Alaska'
    }, {
        label: 'AZ',
        value: 'Arizona'
    }, {
        label: 'AR',
        value: 'Arkansas'
    }, {
        label: 'CA',
        value: 'California'
    }, {
        label: 'CO',
        value: 'Colorado'
    }, {
        label: 'CT',
        value: 'Connecticut'
    }, {
        label: 'DE',
        value: 'Delware'
    }, {
        label: 'FL',
        value: 'Florida'
    }, {
        label: 'GA',
        value: 'Georgia'
    }, {
        label: 'HI',
        value: 'Hawaii'
    }, {
        label: 'ID',
        value: 'Idaho'
    }, {
        label: 'IL',
        value: 'Illinois'
    }, {
        label: 'IN',
        value: 'Indiana'
    }, {
        label: 'IA',
        value: 'Iowa'
    }, {
        label: 'KS',
        value: 'Kansas'
    }, {
        label: 'KY',
        value: 'Kentucky'
    }, {
        label: 'LA',
        value: 'Louisiana'
    }, {
        label: 'ME',
        value: 'Maine'
    }, {
        label: 'MD',
        value: 'Maryland'
    }, {
        label: 'MA',
        value: 'Massachusetts'
    }, {
        label: 'MI',
        value: 'Michigan'
    }, {
        label: 'MN',
        value: 'Minnesota'
    }, {
        label: 'MS',
        value: 'Mississippi'
    }, {
        label: 'MO',
        value: 'Missouri'
    }, {
        label: 'MT',
        value: 'Montana'
    }, {
        label: 'NE',
        value: 'Nebraska'
    }, {
        label: 'NV',
        value: 'Nevada'
    }, {
        label: 'NH',
        value: 'New Hampshire'
    }, {
        label: 'NJ',
        value: 'New Jersey'
    }, {
        label: 'NM',
        value: 'New Mexico'
    }, {
        label: 'NY',
        value: 'New York'
    }, {
        label: 'NC',
        value: 'North Carolina'
    }, {
        label: 'ND',
        value: 'North Dakota'
    }, {
        label: 'OH',
        value: 'Ohio'
    }, {
        label: 'OK',
        value: 'Oklahoma'
    }, {
        label: 'OR',
        value: 'Oregon'
    }, {
        label: 'PA',
        value: 'Pennsylvania'
    }, {
        label: 'RI',
        value: 'Rhode Island'
    }, {
        label: 'SC',
        value: 'South Carolina'
    }, {
        label: 'SD',
        value: 'South Dakota'
    }, {
        label: 'TN',
        value: 'Tennessee'
    }, {
        label: 'TX',
        value: 'Texas'
    }, {
        label: 'UT',
        value: 'Utah'
    }, {
        label: 'VT',
        value: 'Vermont'
    }, {
        label: 'VA',
        value: 'Virginia'
    }, {
        label: 'WA',
        value: 'Washington'
    }, {
        label: 'WV',
        value: 'West Virginia'
    }, {
        label: 'WI',
        value: 'Wisconsin'
    }, {
        label: 'WY',
        value: 'Wyoming'
    }
]

const Range = Slider.Range;
function log(value) {
    console.log(value); //eslint-disable-line
}

var config = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }

};
var self = this;
export default class Cities extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totCities: 0,
            activePage: 1,
            sort: {
                "field": "population",
                "direction": "desc"
            },
            cities: [],
            value: [],
            filters: '',
            lowerBound: 0,
            upperBound: 10000000
        }
        this.handlePageChange = this
            .handlePageChange
            .bind(this)
        this.sortby = this
            .sortby
            .bind(this)
        this.buildFilters = this
            .buildFilters
            .bind(this)
        this.handleSelectChange = this
            .handleSelectChange
            .bind(this)
    }
    getCities(page, field, direction, filters) {
        axios
            .get('http://api.roadtripr.fun/city?page=' + page + '&results_per_page=15&q={' + filters + '"order_by":[{"field":"' + field + '","direction":"' + direction + '"}]}')
            .then(res => {
                this.setState({cities: res.data.objects, totCities: res.data.num_results})


            });
    }
    renderCities() {
        console.log("in rendercities");
        for (var city of this.state.cities) {
            this.renderPark(city);
        }

    }
    renderCity(city) {
        var cityName = city
            .name
            .split(",")[0]
        var state = city
            .name
            .split(",")[1]
        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
                <div className="portfolio-wrap">
                    <figure>
                        <a href={"/city/" + city.name}><img src={city.image} className="img-fluid" alt/></a>
                    </figure>
                    <div className="portfolio-info">
                        <p>
                            <Link to={'/city/' + city.name}>{cityName}</Link>
                        </p>
                        {state} | Pop: {city.population}
                    </div>
                </div>
            </div>
        )


        return element;

    }
    componentDidMount() {
        console.log("component");
        this.getCities(1, "population", "desc", this.state.filters);

    }
    handlePageChange(data) {
        this.setState({activePage: data})
        var field = this.state.sort.field
        var dir = this.state.sort.direction
        var filter = this.state.filters
        console.log(filter)
        this.getCities(data, field, dir, this.state.filters)

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
                "field": "population",
                "direction": "desc"
            },
            "4": {
                "field": "population",
                "direction": "asc"
            },
            "5": {
                "field": "state",
                "direction": "asc"
            },
            "6": {
                "field": "state",
                "direction": "desc"
            }
        };
        var values = translation[key];
        this.setState({sort: values});
        this.getCities(1, values.field, values.direction, this.state.filters)
    }

    handleSelectChange(value) {
        this.setState({value:value});
    }
    onLowerBoundChange = (e) => {
        this.setState({
            lowerBound: + e.target.value
        });
    }
    onUpperBoundChange = (e) => {
        this.setState({
            upperBound: + e.target.value
        });
    }
    buildFilters(){
        var filter = '"filters":[{"and":['
        filter = filter + '{"or":['
        if (this.state.value.length) {
            var states = this
                .state
                .value
                .split(',')
            if (states.length) {
                for (var i = 0; i < states.length; i++) {
                    var filt = states[i]
                    if (i != states.length - 1) {
                        filter = filter + ('{"name":"name","op":"like","val":"%25' + filt + '"},');
                    } else {
                        filter = filter + ('{"name":"name","op":"like","val":"%25' + filt + '"}');
                    }
                }
            }
        }
        filter = filter + "]}"
        if(this.state.upperBound===0){
            filter = filter + ',{"and":['
            filter = filter + '{"name":"population","op":"gt","val":"' + this.state.lowerBound + '"},'
            filter = filter + '{"name":"population","op":"lt","val":' + 10000000 + '}'
            filter = filter + "]}]}]}"
        } else{
            filter = filter + ',{"and":['
            filter = filter + '{"name":"population","op":"gt","val":"' + this.state.lowerBound + '"},'
            filter = filter + '{"name":"population","op":"lt","val":' + this.state.upperBound + '}'
            filter = filter + "]}]}],"
        }

        console.log(filter)
        this.setState({filters: filter})

        this.getCities(1, this.state.sort.field, this.state.sort.direction, filter)


    }
    render() {
        var elements = []
        for (var city of this.state.cities) {
            elements.push(this.renderCity(city));

        }
        const {disabled, stayOpen, value} = this.state;
        return (
            <div>
                <section id="portfolio" className="section-bg">
                    <div className="container">
                        <header className="section-header" style={{marginBottom: "60px"}}>
                            <h3 className="section-title">Cities</h3>

                        </header>
                        <div className="row portfolio-container">
                            <div className="section">
                                <div className="selector-small">
                                    <Select
                                        closeOnSelect={!stayOpen}
                                        disabled={disabled}
                                        multi
                                        onChange={this.handleSelectChange}
                                        options={STATES}
                                        placeholder="State"
                                        removeSelected={this.state.removeSelected}
                                        simpleValue
                                        value={value}/>
                                </div>
                                <div>
                                    <label className="selector-label">Population:</label>
                                    <div className="selector-very-small">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={this.state.lowerBound}
                                            onChange={this.onLowerBoundChange}/>
                                    </div>
                                    <label className="selector-label">–</label>
                                    <div class="selector-very-small">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={this.state.upperBound}
                                            onChange={this.onUpperBoundChange}/>
                                    </div>
                                </div>
                                <button className="btn btn-default filter-btn" onClick={this.buildFilters}>Filter</button>
                                <div style={{float: "right", display: "inline"}}>
                                    <DropdownButton class="sort-dropdown" title="Sort">
                                        <MenuItem eventKey="1" onSelect={this.sortby}>Name: A-Z</MenuItem>
                                        <MenuItem eventKey="2" onSelect={this.sortby}>Name: Z-A</MenuItem>
                                        <MenuItem eventKey="3" onSelect={this.sortby}>Population: High-Low</MenuItem>
                                        <MenuItem eventKey="4" onSelect={this.sortby}>Population: Low-High</MenuItem>
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
                        totalItemsCount={this.state.totCities}
                        activePage={this.state.activePage}
                        itemsCountPerPage={15}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}/>
                </div>
            </div>
        );
    }

}