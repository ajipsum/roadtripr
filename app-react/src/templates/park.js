import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class Park extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            park: Object,
            restaurants: [],
            cities: []
        }
    }
    getPark() {
        console.log(this.props.park)
        // var res =
        // $.getJSON('http://api.roadtripr.fun/cities/?latitude=32.7791&longitude=-96.800
        // 3&length=10');
        axios
            .get('http://api.roadtripr.fun/park?q={"filters":[{"name":"name","op":"equals","val":"' + this.props.match.params.park + '"}]}')
            .then(res => {
                this.setState({park: res.data.objects[0]})
                console.log(this.state.park)
                axios
                    .get('http://api.roadtripr.fun/restaurant/nearby?latitude=' + this.state.park.latitude + '&longitude=' + this.state.park.longitude + '&length=6')
                    .then(restData => {
                        this.setState({restaurants: restData.data.data})
                        //console.log(data.data)
                        console.log(this.state.restaurants)
                        axios
                            .get('http://api.roadtripr.fun/city/nearby?latitude=' + this.state.park.latitude + '&longitude=' + this.state.park.longitude + '&length=6')
                            .then(cityData => {
                                //console.log(data2.data)
                                this.setState({cities: cityData.data.data})
                                console.log(this.state.cities)
                            });

                    });

            });
        /*var res2 = JSON.parse(JSON.stringify(res))
        console.log(res)
        this.setState({cities: res2.responseJSON.data});*/

    }
    x
    componentDidMount() {
        this.getPark();
    }
    renderRestaurant(restaurant) {
        var num = Math.round(restaurant.rating);
        var stars = "\u2605".repeat(num);

        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
                <div className="portfolio-wrap">
                    <figure>
                        <a href={"/restaurants/" + restaurant.name}><img src={restaurant.image} className="img-fluid" alt=""/></a>
                    </figure>
                    <div className="portfolio-info">
                        <p>
                            <Link to={'/restaurants/' + restaurant.name}>{restaurant.name}</Link>
                        </p>
                        {restaurant.pricing} | {restaurant.cuisine} | {stars}
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
        var park = this.state.park

        var cityEle = []
        var restaurantEle = []
        for (var restaurant of this.state.restaurants) {
            restaurantEle.push(this.renderRestaurant(restaurant))
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
                            <h3>{park.name}</h3>
                        </header>
                        <div className="row about-cols" align="center">
                            <div className="col-md-6 wow" align="center">
                                <div className="about-col">
                                    <div style={{overflow: "auto"}}>
                                        <img src={park.image} alt="" className="img-fluid"/>
                                    </div>
                                    <h2 className="title">{park.name}</h2>
                                    <p>
                                        <a href={park.website}>Website</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div>
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
                    <section id="portfolio" className="section-bg">
                    <div className="container">
                        <header className="section-header" style={{marginBottom: "60px"}}>
                            <h3 className="section-title">Nearby Restaurants</h3>
                        </header>
                        <div className="row portfolio-container">
                            {restaurantEle}
                        </div>
                    </div>
                    </section>

                </div>
            </div>
        );
    }

}