import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

export default class Search extends React.Component {
    constructor(props) {
        
        super(props)

        this.state = {
            query:this.props.match.params.term,
            restaurants: [],
            cities: [],
            results: [],
            parks: []
          }
    }
    search(){
        var query = "\"%" + this.state.query + "%\"";

        axios.get('http://test.roadtripr.fun/city?q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"population","op":"like","val":' + query + '}]}]}')
          .then(res => {console.log(res)});
    
        axios.get('http://test.roadtripr.fun/park?q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"designation","op":"like","val":' + query + '}, "name":"states","op":"like","val":' + query + '}, "name":"cost","op":"like","val":' + query + '}]}]}')
        .then(res => { this.state.results.push(res); console.log('Park results: ' + this.state.results);});
        axios.get('http://test.roadtripr.fun/restaurant?q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"rating","op":"like","val":' + query + '}, "name":"cuisine","op":"like","val":' + query + '}, "name":"pricing","op":"like","val":' + query + '}]}]}')
        .then(res => { this.state.results.push(res); console.log('Park results: ' + this.state.results);});
    }
    renderPark(park){
        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
                <div className="portfolio-wrap">
                    <figure>
                        <a href={"parks/" + park.name}><img src={park.image} className="img-fluid" alt /></a>
                        {/* <a href={park.image} data-lightbox="portfolio" data-title="park" className="link-preview" title="Preview"><i className="ion ion-eye" /></a>
                        <a href={"parks/" + park.name} className="link-details" title="More Details"><i className="ion ion-android-open" /></a> */}
                    </figure>
                    <div className="portfolio-info">
                        <p><Link to={'/parks/' + park.name}>{park.name}</Link></p>
                        <a href="{park.website}" className="website">Website <i className="ion ion-android-open" /></a>
                    </div>
                </div>
            </div>)
      console.log(element);
      return element;


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
                <p>{state}</p>
                Population: {city.population}
            </div>
            </div>
        </div>)

      console.log(element)
      return element;


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
        this.search()
    }
    render(){
        var elements = []
        for(var i=0; i<6; i++){
            if(this.state.cities[i]){
                elements.push(this.renderCity(this.state.cities[i]))
            }
            if(this.state.parks[i]){
                elements.push(this.renderPark(this.state.parks[i]))
            }
            if(this.state.restaurants[i]){
                elements.push(this.renderCity(this.state.restaurants[i]))
            }
        }

        return(
            <div>
                <section id="portfolio" className="section-bg">
                <div className="container">
                    <header className="section-header">
                    <h3 className="section-title">Parks</h3>
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