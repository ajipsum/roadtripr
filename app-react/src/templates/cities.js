import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery'; 

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
       //var res = $.getJSON('http://api.roadtripr.fun/parks/?latitude=32.7791&longitude=-96.8003&length=10');
        axios.get('http://api.roadtripr.fun/parks/?latitude=32.7791&longitude=-96.8003&length=10')
        .then(res => {
            console.log(res)
          this.setState({cities: res.data.data})
          console.log(this.state.cities)

        });
        console.log(this.state.cities)
        /*var res2 = JSON.parse(JSON.stringify(res))
        console.log(res)
        this.setState({cities: res2.responseJSON.data});*/
        
    }
    renderCities(){
        
        for (var city of this.state.cities){
            console.log(this.state.cities)
            this.renderCity(city);
            console.log(city)
        }

    }
    renderCity(city){
        console.log(city)
        const element = (
        <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
        <div className="portfolio-wrap">
          <figure>
            <img src={city.image} className="img-fluid" alt />
            <a href={city.image} data-lightbox="portfolio" data-title="city" className="link-preview" title="Preview"><i className="ion ion-eye" /></a>
            <a href={"/" + city.name} className="link-details" title="More Details"><i className="ion ion-android-open" /></a>
          </figure>
          <div className="portfolio-info">
            <h4><a href={"/" + city.name} >{city.name}</a></h4>
          </div>
        </div>
      </div>)
      ReactDom.render(element);
      
      
    }
    componentDidMount(){
         this.getCities();
    }
    render() {
        return (
            <div>
            <section id="portfolio" className="section-bg">
              <div className="container">
                <header className="section-header">
                  <h3 className="section-title">Cities</h3>
                </header>
                <div className="row portfolio-container">
                    {this.renderCities()}
                </div>
              </div>
            </section>
          </div>
          
          
        );
    }
}