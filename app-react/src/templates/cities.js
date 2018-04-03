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
var self = this;
export default class Cities extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totCities: 0,
            activePage: 1,
            cities: []
          }
          this.handlePageChange = this.handlePageChange.bind(this)
    }
    getCities(page) {
        axios.get('http://test.roadtripr.fun/city?page=' + page + '&results_per_page=15')
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
        this.getCities(1);

    }
    handlePageChange(data){
        this.setState({activePage: data})
        this.getCities(data)

    }
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