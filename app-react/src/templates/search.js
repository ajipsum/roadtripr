import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import _ from 'lodash'
import Mark from 'mark.js';

export default class Search extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            query:this.props.match.params.term,
            activePage: 1,
            results: 0,
            elem: [],
            active:[],
            tot: []
          }
          this.handlePageChange = this.handlePageChange.bind(this)

    }
    search(){
        var query = "\"%" + this.state.query + "%\"";
        var numQuery = ""
        var moneyQuery = "\"" + this.state.query + "\""
        if(this.state.query.charAt(0)==="$"){
            console.log(this.state.query.charAt(0))
            axios.get('http://test.roadtripr.fun/restaurant?page=1&&results_per_page=100&q={"filters":[{"or": [{"name":"pricing","op":"eq","val":' + moneyQuery + '}]}]}')
            .then(res => {
                console.log(res)
                for (var obj of res.data.objects){
                    this.state.tot.push(obj)

                }
                this.setState({results: this.state.tot.length, tot: _.shuffle(this.state.tot)})
                var temp=[]
                var max = this.state.results>15?15:this.state.results
                for(var i=0; i<max; i++){
                    temp.push(this.state.tot[i])
                }
                this.setState({active: temp})}
            )
        }
        else if(!isNaN(this.state.query)){
            numQuery = this.state.query
            axios.get('http://test.roadtripr.fun/city?q={"filters":[{"or": [{"name":"population","op":"like","val":' + numQuery + '}]}]}')
            .then(res => {
                for (var obj of res.data.objects){
                    this.state.tot.push(obj)}

            })
        }
        else{
            axios.get('http://test.roadtripr.fun/city?q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"population","op":"like","val":' + query + '}]}]}')
            .then(res => {
                for (var obj of res.data.objects){
                    this.state.tot.push(obj)}
                axios.get('http://test.roadtripr.fun/restaurant?q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"rating","op":"like","val":' + query + '}, {"name":"cuisine","op":"like","val":' + query + '}, {"name":"pricing","op":"like","val":' + query + '}]}]}')
                    .then(res => {
                        console.log(res)
                        for (var obj of res.data.objects){
                            this.state.tot.push(obj)}
                        axios.get('http://test.roadtripr.fun/park?q={"filters":[{"or": [{"name":"name","op":"like","val":' + query + '},{"name":"designation","op":"like","val":' + query + '}, {"name":"states","op":"like","val":' + query + '}]}]}')
                            .then(res => {
                                for (var obj of res.data.objects){
                                    this.state.tot.push(obj)}
                                this.setState({results: this.state.tot.length, tot: _.shuffle(this.state.tot)})
                                var temp=[]
                                var max = this.state.results>15?15:this.state.results
                                for(var i=0; i<max; i++){

                                    temp.push(this.state.tot[i])
                                }
                                this.setState({active: temp})
                                console.log(this.state.active)
                            });
                    });
            });}
        console.log(this.state.results)
    }
    renderPark(park){
        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
                <div className="portfolio-wrap">
                    <figure>
                        <a href={"/parks/" + park.name}><img src={park.image} className="img-fluid" alt /></a>
                        {/* <a href={park.image} data-lightbox="portfolio" data-title="park" className="link-preview" title="Preview"><i className="ion ion-eye" /></a>
                        <a href={"parks/" + park.name} className="link-details" title="More Details"><i className="ion ion-android-open" /></a> */}
                    </figure>
                    <div className="portfolio-info">
                        <p><Link to={'/parks/' + park.name}>{park.name}</Link></p>
                        {/* <a href="{park.website}" className="website">Website <i className="ion ion-android-open" /></a> */}
                        {park.states} | {park.designation}
                    </div>
                </div>
            </div>)
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
                {state} | Pop: {city.population}
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
    handlePageChange(data){
        this.setState({activePage: data})
        this.setState({active: []});
        var temp = []
        for(var i=0; i<15; i++){
            temp.push(this.state.tot[i*data])
        }
        this.setState({active:temp})
    }
    componentDidMount(){
        this.search()
    }
    highlight(){
        var context = document.getElementById("portfolio");
        var instance = new Mark(context);
        instance.mark([this.state.query], {
            separateWordSearch: false,
        });}
    render(){
        var elements = []
        var cityCount = 0;

        console.log(this.state.active)
        for(var element of this.state.active){
            if(element.hasOwnProperty('population')){
                elements.push(this.renderCity(element))
            }
            if(element.hasOwnProperty('cuisine')){
                elements.push(this.renderRestaurant(element))
            }
            else
                elements.push(this.renderPark(element))

         }
         this.highlight()

        // if(this.state.cities.length!=0){
        //     for(var city of this.state.cities){
        //         elements.push(this.renderCity(city))
        //     }
        // }
        // if(this.state.restaurants.length!=0){
        //     for(var rest of this.state.restaurants){
        //         elements.push(this.renderRestaurant(rest))
        //     }
        // }
        // if(this.state.parks.length!=0){
        //     for(var park of this.state.parks){
        //         elements.push(this.renderPark(park))
        //     }
        // }

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