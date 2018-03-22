import React from 'react';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';


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
       //var res = $.getJSON('http://api.roadtripr.fun/cities/?latitude=32.7791&longitude=-96.8003&length=10');
        axios.get('http://api.roadtripr.fun/parks/?name=' + this.props.match.params.park)
        .then(res => {
            this.setState({park: res.data.data[0]})
            console.log(this.state.park)
            axios.get('http://api.roadtripr.fun/restaurants/?latitude=' + this.state.park.latitude + '&longitude=' + this.state.park.longitude + '&length=4')
                .then(restData => {
                this.setState({restaurants: restData.data.data})
                //console.log(data.data)
                console.log(this.state.restaurants)
                axios.get('http://api.roadtripr.fun/cities/?latitude=' + this.state.park.latitude + '&longitude=' + this.state.park.longitude + '&length=4')
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
    componentDidMount(){
        this.getPark();
   }
    setCity(name){
        var url = encodeURI(name);
        return <p className="small"><a href={"/city/"+ url}>{name}</a></p>
    }
    setRestaurant(name){
        var url = encodeURI(name);
        return <p className="small"><a href={"/restaurants/"+ url}>{name}</a></p>
    }
    render() {
        var park = this.state.park
       
        var cityEle = []
        var restaurantEle = []
        for(var restaurant of this.state.restaurants){
            restaurantEle.push(this.setRestaurant(restaurant.name))
        }
        for(var city of this.state.cities){
            cityEle.push(this.setCity(city.name))
        }
        //console.log(parkNames)
        //console.log(restaurantNames)
        return (
            <div style ={{align:"center"}}> 
            <section id="about">
                <div className="container">
                <header className="section-header">
                    <h3>Parks</h3>
                </header>
                <div className="row about-cols" align="center">
                    <div className="col-md-6 wow" align="center">
                    <div className="about-col">
                        <div className="img">
                            <img src={park.image} alt className="img-fluid" />
                        </div>
                        <h2 className="title">{park.name}</h2>
                        <p><a href="{park.website}">Website</a></p>
                        <hr />
                        <p>Nearby Restaurants</p>
                        {restaurantEle}
                        <hr />    
                        <p>Nearby Cities</p>
                        {cityEle}
                    </div>
                    </div>
                </div>
                </div>
            </section>
            </div>
        );
    }
  
}