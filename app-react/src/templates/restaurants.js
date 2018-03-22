import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery'; 
import { Link } from 'react-router-dom';


var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
    
};

export default class Restaurants extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            restaurants: []
          }
    }
    getRestaurants() {
        axios.get('http://api.roadtripr.fun/restaurants/10')
        .then(res => {
          this.setState({restaurants: res.data.data})

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
        console.log(stars);
        const element = (
        <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
        <div className="portfolio-wrap">
          <figure>
            <img src={restaurant.image} className="img-fluid" alt />
            <a href={restaurant.image} data-lightbox="portfolio" data-title="restaurant" className="link-preview" title="Preview"><i className="ion ion-eye" /></a>
            <a href={"restaurants/" + restaurant.name} className="link-details" title="More Details"><i className="ion ion-android-open" /></a>
          </figure>
          <div className="portfolio-info">
            <p><Link to={'/restaurants/' + restaurant.name}>{restaurant.name}</Link></p>
            {restaurant.pricing} | {restaurant.cuisine} | {stars}
          </div>
        </div>
      </div>)
      console.log(element)
      return element;
      
      
    }
    componentDidMount(){
         this.getRestaurants();
    }
    render() {
        var elements = []
        var i = 0
        for(var restaurant of this.state.restaurants){ 
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
          </div>
          
          
        );
    }
}