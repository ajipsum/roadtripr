import React from 'react';
import axios from 'axios';
import Restaurants from './restaurants';
import Parks from './parks';

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

    googleMaps(lat, long) {
        var link = "https://www.google.com/maps/?q=" + lat + "," + long;
        return link;
    }

    render() {
        var city = this.state.city

        var parksEle = []
        var restaurantEle = []
        for (var restaurant of this.state.restaurants) {
            restaurantEle.push(Restaurants.renderRestaurant(restaurant))
        }
        for (var park of this.state.parks) {
            parksEle.push(Parks.renderPark(park))
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
                                    <p><a href={this.googleMaps(city.latitude, city.longitude)} target="#">View on Google Maps</a></p>
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