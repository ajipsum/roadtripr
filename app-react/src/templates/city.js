import React from 'react';
import {Switch, Route} from 'react-router-dom'
import axios from 'axios';

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
                    .get('http://api.roadtripr.fun/park/nearby?latitude=' + this.state.city.latitude + '&longitude=' + this.state.city.longitude + '&length=4')
                    .then(parkData => {
                        this.setState({parks: parkData.data.data})
                        console.log(this.state.restaurants)
                        axios
                            .get('http://api.roadtripr.fun/restaurant/nearby?latitude=' + this.state.city.latitude + '&longitude=' + this.state.city.longitude + '&length=4')
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
    setParks(name) {
        var url = encodeURI(name);
        return <p className="small">
            <a href={"/parks/" + url}>{name}</a>
        </p>
    }
    setRestaurant(name) {
        var url = encodeURI(name);
        return <p className="small">
            <a href={"/restaurants/" + url}>{name}</a>
        </p>
    }
    render() {
        var city = this.state.city

        var parksEle = []
        var restaurantEle = []
        for (var restaurant of this.state.restaurants) {
            restaurantEle.push(this.setRestaurant(restaurant.name))
        }
        for (var park of this.state.parks) {
            parksEle.push(this.setParks(park.name))
        }
        return (
            <div style ={{
                align: "center"
            }}>
                <section id="about">
                    <div className="container">
                        <header className="section-header">
                            <h3>City</h3>
                        </header>
                        <div className="row about-cols" align="center">
                            <div className="col-md-6 wow" align="center">
                                <div className="about-col">
                                    <div className="img">
                                        <img src={city.image} alt className="img-fluid"/>
                                    </div>
                                    <h2 className="title">{city.name}</h2>
                                    <p>Population: {city.population}</p>
                                    <hr/>
                                    <p>Nearby Restaurants</p>
                                    {restaurantEle}
                                    <hr/>
                                    <p>Nearby Parks</p>
                                    {parksEle}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}