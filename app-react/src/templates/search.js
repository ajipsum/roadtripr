import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Highlight from 'react-highlighter';

export default class Search extends React.Component {
    constructor(props) {
        
        super(props)

        this.state = {
            query:this.props.match.params.term,
            restaurants: [],
            activePage: 1,
            cities: [],
            results: 0,
            parks: []
          }
          this.handlePageChange = this.handlePageChange.bind(this)
    }
    search(page){
        var query = "\"%" + this.state.query + "%\"";
        var numQuery = ""
        var nan = isNaN(this.state.query)
        if(!isNaN(this.state.query)){
            numQuery = this.state.query
            axios.get('http://test.roadtripr.fun/city?q={"filters":[{"or": [{"name":"population","op":"like","val":' + numQuery + '}]}]}')
            .then(res => {
                this.setState({cities: res.data.objects, results:this.state.results + res.data.num_results})
            })
        }
        else{
            axios.get('http://test.roadtripr.fun/city?page=' + page + '&results_per_page=5&q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"population","op":"like","val":' + query + '}]}]}')
            .then(res => {
                this.setState({cities: res.data.objects, results:this.state.results + res.data.num_results})
                axios.get('http://test.roadtripr.fun/restaurant?page=' + page + '&results_per_page=5&q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"rating","op":"like","val":' + query + '}, {"name":"cuisine","op":"like","val":' + query + '}, {"name":"pricing","op":"like","val":' + query + '}]}]}')
                    .then(res => { 
                        this.setState({restaurants: res.data.objects}); 
                            axios.get('http://test.roadtripr.fun/park?page=' + page + '&results_per_page=5&q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"designation","op":"like","val":' + query + '}, {"name":"states","op":"like","val":' + query + '}]}]}')
                            .then(res => { 
                                this.setState({parks: res.data.objects, results:this.state.results + res.data.num_results})
                            });
                    
                    });
                
            });}
        var cities = this.state.cities.length
        var parks = this.state.parks.length
        var restaurants = this.state.restaurants.length
        this.setState({results: cities + parks + restaurants})
       
        
        
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
      return element;


    }
    renderCity(city){
        var cityName = city.name//.split(",")[0]
        var state = city.name//.split(",")[1]
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
    handlePageChange(data){
        this.setState({activePage: data})
        this.search(data)
    }
    componentDidMount(){
        this.search(1)
    }
    render(){
        var elements = []
        
        var cityCount = 0;
        var context = document.getElementById("portfolio");
        // var instance = new Mark(context);
        // instance.mark([this.state.query], {
        //     accuracy: "exactly",
        //     separateWordSearch: false,
        // });


        if(this.state.cities.length!=0){
            for(var city of this.state.cities){
                elements.push(this.renderCity(city))
            }
        }
        if(this.state.restaurants.length!=0){
            for(var rest of this.state.restaurants){
                elements.push(this.renderRestaurant(rest))
            }
        }
        if(this.state.parks.length!=0){
            for(var park of this.state.parks){
                elements.push(this.renderPark(park))
            }
        }   

        return(
            
            <section id="portfolio" className="section-bg">
            <div className="container">
                <header className="section-header">
                <h3 className="section-title">Search</h3>
                </header>
                <div className="row portfolio-container">
                    {elements}
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Pagination 
                totalItemsCount={this.state.results}
                activePage={this.state.activePage}
                itemsCountPerPage={15}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange} />
            </div>
            </section>
        );
    }
}