import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Cities extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            city: "",
            restaurants: [],
            parks: []
        }
    }
    getCity() {
        console.log(this.props.match.params.city)
        axios
            .get('http://api.roadtripr.fun/city?q={"filters":[{"name":"name","op":"equals","val":"' + this.props.match.params.city + '"}]}')
            .then(res => {
                this.setState({city: res.data.objects[0]})
                console.log(this.state.city)
                axios
                    .get('http://api.roadtripr.fun/park/nearby?latitude=' + this.state.city.latitude + '&longitude=' + this.state.city.longitude + '&length=6')
                    .then(parkData => {
                        this.setState({parks: parkData.data.data})
                        console.log(this.state.restaurants)
                        axios
                            .get('http://api.roadtripr.fun/restaurant/nearby?latitude=' + this.state.city.latitude + '&longitude=' + this.state.city.longitude + '&length=6')
                            .then(restData => {
                                console.log(restData.data)
                                this.setState({restaurants: restData.data.data})
                                console.log(this.state.restaurants)
                            });

                    });
            });
    }

    componentDidMount() {
        this.getCity();
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
    render() {
        var city = this.state.city

        var parksEle = []
        var restaurantEle = []
        for (var restaurant of this.state.restaurants) {
            restaurantEle.push(this.renderRestaurant(restaurant))
        }
        for (var park of this.state.parks) {
            parksEle.push(this.renderPark(park))
        }

        var pop = city.population;
        var pop_formatted = 0;
        if (pop) {
            pop_formatted = city.population.toLocaleString();
        }

        return (
            <div style ={{
                align: "center"
            }}>
                <section id="about">
                    <div className="container">
                        <header className="section-header">
                            <h3>{city.name}</h3>
                        </header>
                        <div className="row about-cols" align="center">
                            <div className="col-md-6 wow" align="center">
                                <div className="about-col">
                                    <div style={{overflow: "auto"}}>
                                        <img src={city.image} alt="" className="img-fluid"/>
                                    </div>
                                    <h2 className="title">{city.name}</h2>
                                    <p>Pop. {pop_formatted}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <div>
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
                    <section id="portfolio" className="section-bg">
                    <div className="container">
                        <header className="section-header" style={{marginBottom: "60px"}}>
                            <h3 className="section-title">Nearby Parks</h3>
                        </header>
                        <div className="row portfolio-container">
                            {parksEle}
                        </div>
                    </div>
                    </section>
                </div>
            </div>

        );
    }

}