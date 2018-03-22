import React from 'react';
import { Switch, Route } from 'react-router-dom'
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
        console.log("hello")
       //var res = $.getJSON('http://api.roadtripr.fun/cities/?latitude=32.7791&longitude=-96.8003&length=10');
        axios.get('http://api.roadtripr.fun/cities/?name=' + this.props.city)
        .then(res => {
          this.setState({city: res.data.data})
          console.log(this.state.city)

        });
      /*  axios.get('http://api.roadtripr.fun/restaurants/?latitude=' + this.state.city.latitude + '&longitude=' + this.state.city.longitude + '3&length=4')
        .then(res => {
          this.setState({city: res.data.data})

        });
        axios.get('http://api.roadtripr.fun/parks/?latitude=' + this.state.city.latitude + '&longitude=' + this.state.city.longitude + '3&length=4')
        .then(res => {
          this.setState({city: res.data.data})

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
    componentDidMount(){
        this.getCity();
   }
    render() {
        var city = this.state.city
        return (
            <div>
            <section id="about">
                <div className="container">
                <header className="section-header">
                    <h3>Cities</h3>
                </header>
                <div className="row about-cols" align="center">
                    <div className="col-md-6 wow" align="center">
                    <div className="about-col">
                        <div className="img">
                        <img className="img-fluid" />
                        </div>
                        <h2 className="title">{city.name}</h2>
                        <p>{city.population}</p>
                        <hr />
                        <p>Nearby restaurants</p>
                        <p className="small"><a href="/fricanos"></a></p>
                        <hr />    
                        <p>Nearby parks</p>
                        <p className="small"><a href="/bigbend">Big Bend National Park</a></p>
                        <p className="small"><a href="/fortdavis">Fort Davis</a></p>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            </div>
        );
    }
  
}