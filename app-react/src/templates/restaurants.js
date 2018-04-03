import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";



var config = {
    headers: {'Access-Control-Allow-Origin': '*'}

};

export default class Restaurants extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totRestaurants: 0,
            activePage: 1,
            restaurants: []
          }
          this.handlePageChange = this.handlePageChange.bind(this)

    }
    getRestaurants(page) {
        axios.get('http://test.roadtripr.fun/restaurant?page=' + page + '&results_per_page=15')
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
            <a href={"restaurants/" + restaurant.name}><img src={restaurant.image} className="img-fluid" alt /></a>
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
         this.getRestaurants(1);
    }
    handlePageChange(data){
        this.setState({activePage: data})
        this.getRestaurants(data)
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
                <header className="section-header">
                  <h3 className="section-title">Restaurants</h3>
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