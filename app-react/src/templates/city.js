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
        console.log(this.props.match.params.city)
       //var res = $.getJSON('http://api.roadtripr.fun/cities/?latitude=32.7791&longitude=-96.8003&length=10');
       axios.get('http://api.roadtripr.fun/cities/?name=' + this.props.match.params.city)
       .then(res => {
           this.setState({city: res.data.data[0]})
           console.log(this.state.city)
           axios.get('http://api.roadtripr.fun/parks/?latitude=' + this.state.city.latitude + '&longitude=' + this.state.city.longitude + '&length=4')
               .then(parkData => {
               this.setState({parks: parkData.data.data})
               //console.log(data.data)
               console.log(this.state.restaurants)
               axios.get('http://api.roadtripr.fun/restaurants/?latitude=' + this.state.city.latitude + '&longitude=' + this.state.city.longitude + '&length=4')
                   .then(restData => {
                       console.log(restData.data)
                       this.setState({restaurants: restData.data.data})
                       console.log(this.state.restaurants)
                   });

           });
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

    componentDidMount(){
        this.getCity();
    }
    setParks(name){
        var url = encodeURI(name);
        return <p className="small"><a href={"/parks/"+ url}>{name}</a></p>
    }
    setRestaurant(name){
        var url = encodeURI(name);
        return <p className="small"><a href={"/restaurants/"+ url}>{name}</a></p>
    }
    render() {
        var city = this.state.city
    
        var parksEle = []
        var restaurantEle = []
        for(var restaurant of this.state.restaurants){
            restaurantEle.push(this.setRestaurant(restaurant.name))
        }
        for(var park of this.state.parks){
            parksEle.push(this.setParks(park.name))
        }
        //console.log(parkNames)
        //console.log(restaurantNames)
        return (
            <div style ={{align:"center"}}> 
            <section id="about">
                <div className="container">
                <header className="section-header">
                    <h3>City</h3>
                </header>
                <div className="row about-cols" align="center">
                    <div className="col-md-6 wow" align="center">
                    <div className="about-col">
                        <div className="img">
                            <img src={city.image} alt className="img-fluid" />
                        </div>
                        <h2 className="title">{city.name}</h2>
                        <p>Population: {city.population}</p>
                        <hr />
                        <p>Nearby Restaurants</p>
                        {restaurantEle}
                        <hr />    
                        <p>Nearby Parks</p>
                        {parksEle}
                    </div>
                    </div>
                </div>
                </div>
            </section>
            </div>);
    }
  
}