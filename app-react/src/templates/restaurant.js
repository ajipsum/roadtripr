import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class Restaurant extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            restaurant: Object,
            parks: [],
            cities: []
        }
    }
    getRestaurant() {
        console.log(this.props.restaurant)
        // var res =
        // $.getJSON('http://api.roadtripr.fun/cities/?latitude=32.7791&longitude=-96.800
        // 3&length=10');
        axios
            .get('http://api.roadtripr.fun/restaurant?q={"filters":[{"name":"name","op":"equals","' +
                'val":"' + this.props.match.params.restaurant + '"}]}')
            .then(res => {
                this.setState({restaurant: res.data.objects[0]})
                console.log(this.state.restaurant)
                axios
                    .get('http://api.roadtripr.fun/park/nearby?latitude=' + this.state.restaurant.latitude + '&longitude=' + this.state.restaurant.longitude + '&length=6')
                    .then(parkData => {
                        this.setState({parks: parkData.data.data})
                        //console.log(data.data)
                    });
                console.log(this.state.restaurants)
                axios
                    .get('http://api.roadtripr.fun/city/nearby?latitude=' + this.state.restaurant.latitude + '&longitude=' + this.state.restaurant.longitude + '&length=6')
                    .then(cityData => {
                        //console.log(data2.data)
                        this.setState({cities: cityData.data.data})
                        console.log(this.state.cities)
                    });

            });
        /*var res2 = JSON.parse(JSON.stringify(res))
        console.log(res)
        this.setState({cities: res2.responseJSON.data});*/

    }
    x
    componentDidMount() {
        this.getRestaurant();
    }
    renderPark(park) {
        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
                <div className="portfolio-wrap">
                    <figure>
                        <a href={"/parks/" + park.name}><img src={park.image} className="img-fluid" alt=""/></a>
                    </figure>
                    <div className="portfolio-info">
                        <p>
                            <Link to={'/parks/' + park.name}>{park.name}</Link>
                        </p>
                        {park.states} | {park.designation}
                    </div>
                </div>
            </div>
        )
        return element;
    }
    renderCity(city) {
        var cityName = city
            .name
            .split(",")[0]
        var state = city
            .name
            .split(",")[1]
        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
                <div className="portfolio-wrap">
                    <figure>
                        <a href={"/city/" + city.name}><img src={city.image} className="img-fluid" alt=""/></a>
                    </figure>
                    <div className="portfolio-info">
                        <p>
                            <Link to={'/city/' + city.name}>{cityName}</Link>
                        </p>
                        {state} | Pop. {city.population.toLocaleString()}
                    </div>
                </div>
            </div>
        )
        return element;
    }
    render() {
        var restaurant = this.state.restaurant
        var stars = "\u2605".repeat(restaurant.rating);

        var cityEle = []
        var parkEle = []
        for (var park of this.state.parks) {
            parkEle.push(this.renderPark(park))
        }
        for (var city of this.state.cities) {
            cityEle.push(this.renderCity(city))
        }
        return (
            <div style ={{
                align: "center"
            }}>
                <section id="about">
                    <div className="container">
                        <header className="section-header">
                            <h3>{restaurant.name}</h3>
                        </header>
                        <div className="row about-cols" align="center">
                            <div className="col-md-6 wow" align="center">
                                <div className="about-col">
                                    <div style={{overflow: "auto"}}>
                                        <img src={restaurant.image} alt="" className="img-fluid"/>
                                    </div>

                                    <h2 className="title">{restaurant.name}</h2>
                                    <p>Type: {restaurant.cuisine}</p>
                                    <p>{stars}</p>
                                    <p>Pricing: {restaurant.pricing}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div>
                    <section id="portfolio" className="section-bg">
                    <div className="container">
                        <header className="section-header" style={{marginBottom: "60px"}}>
                            <h3 className="section-title">Nearby Parks</h3>
                        </header>
                        <div className="row portfolio-container">
                            {parkEle}
                        </div>
                    </div>
                    </section>
                    <section id="portfolio" className="section-bg">
                    <div className="container">
                        <header className="section-header" style={{marginBottom: "60px"}}>
                            <h3 className="section-title">Nearby Cities</h3>
                        </header>
                        <div className="row portfolio-container">
                            {cityEle}
                        </div>
                    </div>
                    </section>
                </div>
            </div>
        );
    }

}