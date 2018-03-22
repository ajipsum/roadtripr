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
       //var res = $.getJSON('http://api.roadtripr.fun/cities/?latitude=32.7791&longitude=-96.8003&length=10');
        axios.get('http://api.roadtripr.fun/cities/')
        .then(res => {
          this.setState({cities: res.data.data})

        });
        /*var res2 = JSON.parse(JSON.stringify(res))
        console.log(res)
        this.setState({cities: res2.responseJSON.data});*/
        
    }
    renderCities(){
        console.log("in rendercities")
        for (var city of this.state.cities){
            this.renderCity(city);
        }

    }
    renderCity(city){
        const element = (
        <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
        <div className="portfolio-wrap">
          <figure>
            <img src={city.image} className="img-fluid" alt />
            <a href={city.image} data-lightbox="portfolio" data-title="city" className="link-preview" title="Preview"><i className="ion ion-eye" /></a>
            <a href={"/" + city.name} className="link-details" title="More Details"><i className="ion ion-android-open" /></a>
          </figure>
          <div className="portfolio-info">
            <h4><a href={"cities/" + city.name} >{city.name}</a></h4>
          </div>
        </div>
      </div>)
      console.log(element)
      return element;
      
      
    }
    componentDidMount(){
         this.getCities();
    }
    render() {
        //var cities = this.renderCities()
        var elements = []
        var i = 0
        for(var city of this.state.cities){ 
            if(i>10){
                break
            }
            elements.push(this.renderCity(city));
            i++;
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