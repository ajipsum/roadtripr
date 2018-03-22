import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery'; 
import { Link } from 'react-router-dom';


var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
    
};

export default class Cities extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cities: []
          }
    }
    getCities() {
        axios.get('http://api.roadtripr.fun/cities/10')
        .then(res => {
          this.setState({cities: res.data.data})
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
                <img src={city.image} className="img-fluid" alt />
                <a href={city.image} data-lightbox="portfolio" data-title="city" className="link-preview" title="Preview"><i className="ion ion-eye" /></a>
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
    componentDidMount(){
        console.log("component");
        this.getCities();
         
    }
    // componentWillMount(){
    //     console.log(this.props.location.pathname)
    // }
    
    render() {
        //var cities = this.renderCities()
        var elements = []
        for(var city of this.state.cities){ 
            elements.push(this.renderCity(city));
            
        }
        //console.log("cities + ")
        //console.log(cities)
        return (
            <div>
            <section id="portfolio" className="section-bg">
              <div className="container">
                <header className="section-header">
                  <h3 className="section-title">Cities</h3>
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