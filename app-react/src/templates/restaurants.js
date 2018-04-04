import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { DropdownButton, MenuItem } from "react-bootstrap";


var config = {
    headers: {'Access-Control-Allow-Origin': '*'}

};

export default class Restaurants extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totRestaurants: 0,
            activePage: 1,
            sort: {"field": "rating", "direction": "desc"},
            restaurants: []
          }
          this.handlePageChange = this.handlePageChange.bind(this)
          this.sortby = this.sortby.bind(this)

    }
    getRestaurants(page, field, direction) {
        axios.get('http://api.roadtripr.fun/restaurant?page=' + page + '&results_per_page=15&q={"order_by":[{"field":"' + field + '","direction":"' + direction + '"}]}')
        .then(res => {
            console.log(res)
            this.setState({restaurants: res.data.objects, totRestaurants:res.data.num_results})
            console.log(this.state.restaurants)
            console.log(this.state.totRestaurants)
        });


    }
    renderRestaurants(){
        for (var restaurant of this.state.restaurants){
            this.renderRestaurant(restaurant);
        }

    }
    renderRestaurant(restaurant){
        var num = Math.round(restaurant.rating);
        var stars = "\u2605".repeat(num);

        const element = (
        <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
        <div className="portfolio-wrap">
          <figure>
            <a href={"/restaurants/" + restaurant.name}><img src={restaurant.image} className="img-fluid" alt /></a>
            {/* <a href={restaurant.image} data-lightbox="portfolio" data-title="restaurant" className="link-preview" title="Preview"><i className="ion ion-eye" /></a>
            <a href={"restaurants/" + restaurant.name} className="link-details" title="More Details"><i className="ion ion-android-open" /></a> */}
          </figure>
          <div className="portfolio-info">
            <p><Link to={'/restaurants/' + restaurant.name}>{restaurant.name}</Link></p>
            {restaurant.pricing} | {restaurant.cuisine} | {stars}
          </div>
        </div>
      </div>)
      return element;


    }
    componentDidMount(){
         this.getRestaurants(1, "rating", "desc");
    }
    handlePageChange(data){
        this.setState({activePage: data})
        var field = this.state.sort.field
        var dir = this.state.sort.direction
        this.getRestaurants(data, field, dir)
    }
    sortby(key) {
        var translation = {"1": {"field": "name", "direction": "asc"},
                           "2": {"field": "name", "direction": "desc"},
                           "3": {"field": "cuisine", "direction": "asc"},
                           "4": {"field": "cuisine", "direction": "desc"},
                           "5": {"field": "pricing", "direction": "desc"},
                           "6": {"field": "pricing", "direction": "asc"},
                           "7": {"field": "rating", "direction": "desc"},
                           "8": {"field": "rating", "direction": "asc"},};
        var values = translation[key];
        this.setState({sort: values});
        this.getRestaurants(1, values.field, values.direction)
    }

    render() {
        var elements = []
        var i = 0
        for(var restaurant of this.state.restaurants){
            console.log(restaurant)
            elements.push(this.renderRestaurant(restaurant));
        }

        return (
            <div>
            <section id="portfolio" className="section-bg">
              <div className="container">
                <header className="section-header" style={{marginBottom:"60px"}}>
                  <h3 style={{display:"inline"}}className="section-title">Restaurants</h3>
                  <div style={{float:"right", display:"inline"}}>
                    <DropdownButton class="sort-dropdown" title="Sort">
                        <MenuItem eventKey="1" onSelect={this.sortby}>Name: A-Z</MenuItem>
                        <MenuItem eventKey="2" onSelect={this.sortby}>Name: Z-A</MenuItem>
                        <MenuItem eventKey="3" onSelect={this.sortby}>Cuisine: A-Z</MenuItem>
                        <MenuItem eventKey="4" onSelect={this.sortby}>Cuisine: Z-A</MenuItem>
                        <MenuItem eventKey="5" onSelect={this.sortby}>Pricing: $$$$-$</MenuItem>
                        <MenuItem eventKey="6" onSelect={this.sortby}>Pricing: $-$$$$</MenuItem>
                        <MenuItem eventKey="7" onSelect={this.sortby}>Rating: High-Low</MenuItem>
                        <MenuItem eventKey="8" onSelect={this.sortby}>Rating: Low-High</MenuItem>
                    </DropdownButton>
                    </div>
                </header>

                <div className="row portfolio-container">
                    {elements}
                </div>
              </div>
            </section>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Pagination
                totalItemsCount={this.state.totRestaurants}
                activePage={this.state.activePage}
                itemsCountPerPage={15}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange} />
            </div>
          </div>


        );
    }
}