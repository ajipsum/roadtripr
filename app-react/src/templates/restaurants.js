import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { DropdownButton, MenuItem } from "react-bootstrap";

import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

const CUISINE = [
    {label: 'Shanghainese', value: 'Shanghainese'},
    {label: 'Pizza', value: 'Pizza'},
    {label: 'Delis', value: 'Delis'},
    {label: 'Burgers', value: 'Burgers'},
    {label: 'Ramen', value: 'Ramen'},
    {label: 'Donuts', value: 'Donuts'},
    {label: 'French', value: 'French'},
    {label: 'Cajun/Creole', value: 'Cajun/Creole'},
    {label: 'Middle Eastern', value: 'Middle Eastern'},
    {label: 'Chinese', value: 'Chinese'},
    {label: 'American (New)', value: 'American (New)'},
    {label: 'Sandwiches', value: 'Sandwiches'},
    {label: 'Bakeries', value: 'Bakeries'},
    {label: 'Vietnamese', value: 'Vietnamese'},
    {label: 'Italian', value: 'Italian'},
    {label: 'Whiskey Bars', value: 'Whiskey Bars'},
    {label: 'Seafood', value: 'Seafood'},
    {label: 'Korean', value: 'Korean'},
    {label: 'Cocktail Bars', value: 'Cocktail Bars'},
    {label: 'Cuban', value: 'Cuban'},
    {label: 'Asian Fusion', value: 'Asian Fusion'},
    {label: 'Hot Pot', value: 'Hot Pot'},
    {label: 'Pubs', value: 'Pubs'},
    {label: 'Japanese', value: 'Japanese'},
    {label: 'Breakfast & Brunch', value: 'Breakfast & Brunch'},
    {label: 'Latin American', value: 'Latin American'},
    {label: 'Southern', value: 'Southern'},
    {label: 'Sushi Bars', value: 'Sushi Bars'},
    {label: 'Lounges', value: 'Lounges'},
    {label: 'Coffee & Tea', value: 'Coffee & Tea'},
    {label: 'Food Court', value: 'Food Court'},
    {label: 'Indian', value: 'Indian'},
    {label: 'Mexican', value: 'Mexican'},
    {label: 'Mediterranean', value: 'Mediterranean'},
    {label: 'Diners', value: 'Diners'},
    {label: 'Gelato', value: 'Gelato'},
    {label: 'Australian', value: 'Australian'},
    {label: 'Tapas/Small Plates', value: 'Tapas/Small Plates'},
    {label: 'Bars', value: 'Bars'},
    {label: 'Gastropubs', value: 'Gastropubs'},
    {label: 'Steakhouses', value: 'Steakhouses'},
    {label: 'Hot Dogs', value: 'Hot Dogs'},
    {label: 'Cafes', value: 'Cafes'},
    {label: 'Specialty Food', value: 'Specialty Food'},
    {label: 'Tapas Bars', value: 'Tapas Bars'},
    {label: 'Czech', value: 'Czech'},
    {label: 'Barbeque', value: 'Barbeque'},
    {label: 'Greek', value: 'Greek'},
    {label: 'Jazz & Blues', value: 'Jazz & Blues'},
    {label: 'Salad', value: 'Salad'},
    {label: 'Polish', value: 'Polish'},
    {label: 'Beer, Wine & Spirits', value: 'Beer, Wine & Spirits'},
    {label: 'Brewpubs', value: 'Brewpubs'},
    {label: 'Beer Gardens', value: 'Beer Gardens'},
    {label: 'Poke', value: 'Poke'},
    {label: 'Butcher', value: 'Butcher'},
    {label: 'American (Traditional)', value: 'American (Traditional)'},
    {label: 'Szechuan', value: 'Szechuan'},
    {label: 'Thai', value: 'Thai'},
    {label: 'Music Venues', value: 'Music Venues'},
    {label: 'Breweries', value: 'Breweries'},
    {label: 'Vegan', value: 'Vegan'},
    {label: 'Noodles', value: 'Noodles'},
    {label: 'Caribbean', value: 'Caribbean'},
    {label: 'Wine Bars', value: 'Wine Bars'},
    {label: 'Dim Sum', value: 'Dim Sum'},
    {label: 'Modern European', value: 'Modern European'},
    {label: 'Comfort Food', value: 'Comfort Food'},
    {label: 'Ice Cream & Frozen Yogurt', value: 'Ice Cream & Frozen Yogurt'},
    {label: 'Cheesesteaks', value: 'Cheesesteaks'},
    {label: 'Vegetarian', value: 'Vegetarian'},
    {label: 'Belgian', value: 'Belgian'},
    {label: 'Gluten-Free', value: 'Gluten-Free'},
    {label: 'Brazilian', value: 'Brazilian'},
    {label: 'Sports Bars', value: 'Sports Bars'},
    {label: 'Spanish', value: 'Spanish'},
    {label: 'Desserts', value: 'Desserts'},
    {label: 'Hookah Bars', value: 'Hookah Bars'},
    {label: 'Brasseries', value: 'Brasseries'},
    {label: 'Moroccan', value: 'Moroccan'},
    {label: 'Chicken Wings', value: 'Chicken Wings'},
    {label: 'Irish Pub', value: 'Irish Pub'},
    {label: 'Beer Bar', value: 'Beer Bar'},
    {label: 'German', value: 'German'},
    {label: 'Dive Bars', value: 'Dive Bars'},
    {label: 'Food Trucks', value: 'Food Trucks'},
    {label: 'Acai Bowls', value: 'Acai Bowls'},
    {label: 'Food Stands', value: 'Food Stands'},
    {label: 'Russian', value: 'Russian'},
    {label: 'Soul Food', value: 'Soul Food'},
    {label: 'Irish', value: 'Irish'},
    {label: 'Tacos', value: 'Tacos'},
    {label: 'Tex-Mex', value: 'Tex-Mex'},
    {label: 'Chicken Shop', value: 'Chicken Shop'},
    {label: 'Soup', value: 'Soup'},
    {label: 'Creperies', value: 'Creperies'},
    {label: 'Turkish', value: 'Turkish'},
    {label: 'Buffets', value: 'Buffets'},
    {label: 'Peruvian', value:'Peruvian'},
    {label: 'Cheese Shops', value: 'Cheese Shops'},
    {label: 'Juice Bars & Smoothies', value: 'Juice Bars & Smoothies'},
    {label: 'Restaurants', value: 'Restaurants'},
    {label: 'Gay Bars', value: 'Gay Bars'},
    {label: 'Ethiopian', value: 'Ethiopian'},
    {label: 'Portuguese', value: 'Portuguese'},
    {label: 'Bagels', value: 'Bagels'},
    {label: 'Speakeasies', value: 'Speakeasies'},
    {label: 'Social Clubs', value: 'Social Clubs'},
    {label: 'Venezuelan', value: 'Venezuelan'},
    {label: 'Farmers Market', value: 'Farmers Market'},
    {label: 'Tobacco Shops', value: 'Tobacco Shops'},
    {label: 'Internet Cafes', value: 'Internet Cafes'},
    {label: 'Argentine', value: 'Argentine'},
    {label: 'Waffles', value: 'Waffles'},
    {label: 'British', value: 'British'},
    {label: 'Hawaiian', value: 'Hawaiian'},
    {label: 'Tiki Bars', value: 'Tiki Bars'},
    {label: 'Distilleries', value: 'Distilleries'},
    {label: 'Persian/Iranian', value: 'Persian/Iranian'},
    {label: 'Shaved Ice', value: 'Shaved Ice'},
    {label: 'Afghan', value: 'Afghan'},
    {label: 'Street Vendors', value: 'Street Vendors'},
    {label: 'South African', value: 'South African'},
    {label: 'Empanadas', value: 'Empanadas'},
    {label: 'New Mexican Cuisine', value: 'New Mexican Cuisine'},
    {label: 'Fast Food', value: 'Fast Food'},
    {label: 'Teppanyaki', value: 'Teppanyaki'},
    {label: 'Basque', value: 'Basque'},
    {label: 'Laotian', value: 'Laotian'},
    {label: 'Fondue', value: 'Fondue'},
    {label: 'Colombian', value: 'Colombian'},
    {label: 'Falafel', value: 'Falafel'},
    {label: 'Catalan', value: 'Catalan'},
    {label: 'Cantonese', value: 'Cantonese'},
    {label: 'Cambodian', value: 'Cambodian'},
    {label: 'Izakaya', value: 'Izakaya'},
    {label: 'Himalayan/Nepalese', value: 'Himalayan/Nepalese'},
    {label: 'Bowling', value: 'Bowling'},
    {label: 'Health Markets', value: 'Health Markets'},
    {label: 'Pop-Up Restaurants', value: 'Pop-Up Restaurants'},
    {label: 'Honduran', value: 'Honduran'},
    {label: 'Seafood Markets', value: 'Seafood Markets'},
    {label: 'Bubble Tea', value: 'Bubble Tea'},
    {label: 'Filipino', value: 'Filipino'},
    {label: 'Lebanese', value: 'Lebanese'},
    {label: 'Public Markets', value: 'Public Markets'},
    {label: 'African', value: 'African'},
    {label: 'Chocolatiers & Shops', value: 'Chocolatiers & Shops'},
    {label: 'Smokehouse', value: 'Smokehouse'},
    {label: 'Halal', value: 'Halal'},
    {label: 'Casinos', value: 'Casinos'},
    {label: 'Salvadoran', value: 'Salvadoran'},
    {label: 'Meat Shops', value: 'Meat Shops'},
    {label: 'Egyptian', value: 'Egyptian'},
    {label: 'Japanese Curry', value: 'Japanese Curry'},
    {label: 'Burmese', value: 'Japanese Curry'},
    {label: 'Tea Rooms', value:'Tea Rooms'},
    {label: 'Poutineries', value: 'Poutineries'},
    {label: 'Puerto Rican', value: 'Puerto Rican'},
    {label: 'Cupcakes', value: 'Cupcakes'},
    {label: 'Fish & Chips', value: 'Fish & Chips'},
    {label: 'Mongolian', value: 'Mongolian'},
    {label: 'Pan Asian', value: 'Pan Asian'},
    {label: 'Piano Bars', value: 'Piano Bars'},
    {label: 'Live/Raw Food', value: 'Live/Raw Food'},
    {label: 'Dinner Theater', value: 'Dinner Theater'},
    {label: 'Scottish', value: 'Scottish'},
    {label: 'Indonesian', value: 'Indonesian'},
    {label: 'Arabian', value: 'Arabian'},
    {label: 'Wineries', value: 'Wineries'},
    {label: 'Cigar Bars', value: 'Cigar Bars'},
    {label: 'Food Delivery Services', value: 'Food Delivery Services'},
    {label: 'Pakistani', value: 'Pakistani'},
    {label: 'Taiwanese', value: 'Taiwanese'},
    {label: 'Candy Stores', value: 'Candy Stores'},
    {label: 'Nicaraguan', value: 'Nicaraguan'},
    {label: 'Cafeteria', value: 'Cafeteria'},
    {label: 'Dominican', value: 'Dominican'},
    {label: 'Pasta Shops', value: 'Pasta Shops'},
    {label: 'Senegalese', value: 'Senegalese'},
    {label: 'Haitian', value: 'Haitian'},
    {label: 'Fruits & Veggies', value: 'Fruits & Veggies'},
    {label: 'Nightlife', value: 'Nightlife'},
    {label: 'Comedy Clubs', value: 'Comedy Clubs'},
    {label: 'Coffee Roasteries', value: 'Coffee Roasteries'},
    {label: 'Themed Cafes', value: 'Themed Cafes'},
    {label: 'Vape Shops', value: 'Vape Shops'},
    {label: 'Wraps', value: 'Wraps'},
    {label: 'Herbs & Spices', value: 'Herbs & Spices'},
    {label: 'Cideries', value: 'Cideries'},
    {label: 'Tuscan', value: 'Tuscan'},
    {label: 'Malaysian', value: 'Malaysian'},
    {label: 'Armenian', value: 'Armenian'},
    {label: 'Do-It-Yourself Food', value: 'Do-It-Yourself Food'},
    {label: 'Syrian', value: 'Syrian'},
    {label: 'International Grocery', value: 'International Grocery'},
    {label: 'Singaporean', value: 'Singaporean'},
    {label: 'Wine Tasting Room', value: 'Wine Tasting Room'},
    {label: 'Conveyor Belt Sushi', value: 'Conveyor Belt Sushi'},
    {label: 'Organic Stores', value: 'Organic Stores'},
    {label: 'Sports Clubs', value: 'Sports Clubs'},
    {label: 'Hungarian', value: 'Hungarian'},
    {label: 'Trinidadian', value: 'Trinidadian'},
    {label: 'Kombucha', value: 'Kombucha'},
    {label: 'Drive-Thru Bars', value: 'Drive-Thru Bars'},
    {label: 'Patisserie/Cake Shop', value: 'Patisserie/Cake Shop'},
    {label: 'Ukrainian', value: 'Ukrainian'}
]

const PRICING = [
    {label: '$', value: '$'},
    {label: '$$', value: '$$'},
    {label: '$$$', value: '$$$'},
    {label: '$$$$', value: '$$$$'}
]

const RATING = [
    {label: '\u2605', value: '\u2605'},
    {label: '\u2605\u2605', value: '\u2605\u2605'},
    {label: '\u2605\u2605\u2605', value: '\u2605\u2605\u2605'},
    {label: '\u2605\u2605\u2605\u2605', value: '\u2605\u2605\u2605\u2605'},
    {label: '\u2605\u2605\u2605\u2605\u2605', value: '\u2605\u2605\u2605\u2605\u2605'}
]

var config = {
    headers: {'Access-Control-Allow-Origin': '*'}

};

export default class Restaurants extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totRestaurants: 0,
            activePage: 1,
            sort: {"field": "rating", "direction": "desc"},
            restaurants: [],
            cuisineVal: [],
            priceVal: [],
            ratingVal: []
          }
          this.handlePageChange = this.handlePageChange.bind(this)
          this.sortby = this.sortby.bind(this)
          this.handleCuisineChange = this.handleCuisineChange.bind(this)
          this.handlePriceChange = this.handlePriceChange.bind(this)
          this.handleRatingChange = this.handleRatingChange.bind(this)
          this.handleApply = this.handleApply.bind(this)

    }
    getRestaurants(page, field, direction) {
        axios.get('http://api.roadtripr.fun/restaurant?page=' + page + '&results_per_page=15&q={"order_by":[{"field":"' + field + '","direction":"' + direction + '"}]}')
        .then(res => {
            console.log(res)
            this.setState({restaurants: res.data.objects, totRestaurants:res.data.num_results})
            console.log(this.state.restaurants)
            console.log(this.state.totRestaurants)
        });


    }
    renderRestaurants(){
        for (var restaurant of this.state.restaurants){
            this.renderRestaurant(restaurant);
        }

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
    componentDidMount(){
         this.getRestaurants(1, "rating", "desc");
    }
    handlePageChange(data){
        this.setState({activePage: data})
        var field = this.state.sort.field
        var dir = this.state.sort.direction
        this.getRestaurants(data, field, dir)
    }
    sortby(key) {
        var translation = {"1": {"field": "name", "direction": "asc"},
                           "2": {"field": "name", "direction": "desc"},
                           "3": {"field": "cuisine", "direction": "asc"},
                           "4": {"field": "cuisine", "direction": "desc"},
                           "5": {"field": "pricing", "direction": "desc"},
                           "6": {"field": "pricing", "direction": "asc"},
                           "7": {"field": "rating", "direction": "desc"},
                           "8": {"field": "rating", "direction": "asc"},};
        var values = translation[key];
        this.setState({sort: values});
        this.getRestaurants(1, values.field, values.direction)
    }
    handleRatingChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ ratingVal:value });
    }
    handlePriceChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ priceVal:value });
    }
    handleCuisineChange (value) {
		console.log('You\'ve selected:', value);
		this.state.cuisineVal.push(value);
    }
    handleApply = () => {
        const { lowerBound, upperBound } = this.state;
        this.setState({ value: [lowerBound, upperBound] });
      }
    render() {
        var elements = []
        var i = 0
        for(var restaurant of this.state.restaurants){
            console.log(restaurant)
            elements.push(this.renderRestaurant(restaurant));
        }

        const {disabled, stayOpen, value } = this.state;
        const cuisineV = this.state.cuisineVal
        const priceV = this.state.priceVal
        const ratingV = this.state.ratingVal

        return (
            <div>
            <section id="portfolio" className="section-bg">
              <div className="container">
                <header className="section-header" style={{marginBottom:"60px"}}>
                  <h3 style={{display:"inline"}}className="section-title">Restaurants</h3>
                  <div style={{float:"right", display:"inline"}}>
                    <DropdownButton class="sort-dropdown" title="Sort">
                        <MenuItem eventKey="1" onSelect={this.sortby}>Name: A-Z</MenuItem>
                        <MenuItem eventKey="2" onSelect={this.sortby}>Name: Z-A</MenuItem>
                        <MenuItem eventKey="3" onSelect={this.sortby}>Cuisine: A-Z</MenuItem>
                        <MenuItem eventKey="4" onSelect={this.sortby}>Cuisine: Z-A</MenuItem>
                        <MenuItem eventKey="5" onSelect={this.sortby}>Pricing: $$$$-$</MenuItem>
                        <MenuItem eventKey="6" onSelect={this.sortby}>Pricing: $-$$$$</MenuItem>
                        <MenuItem eventKey="7" onSelect={this.sortby}>Rating: High-Low</MenuItem>
                        <MenuItem eventKey="8" onSelect={this.sortby}>Rating: Low-High</MenuItem>
                    </DropdownButton>
                    </div>
                </header>

                <div className="row portfolio-container">
                <div className="section">
                    <h4 className="section-heading">Filter</h4>
                    <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        multi
                        onChange={this.handleCuisineChange}
                        options={CUISINE}
                        placeholder="Cuisine"
                        removeSelected={this.state.removeSelected}
                        simpleValue
                        value={cuisineV}
                    />
			    </div>
                <div className="section">
                    <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        multi
                        onChange={this.handlePriceChange}
                        options={PRICING}
                        placeholder="Price"
                        removeSelected={this.state.removeSelected}
                        simpleValue
                        value={priceV}
                    />
                </div>
                <div className="section">
                    <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        multi
                        onChange={this.handleRatingChange}
                        options={RATING}
                        placeholder="Rating"
                        removeSelected={this.state.removeSelected}
                        simpleValue
                        value={ratingV}
                    />
                    <button onClick={this.handleApply}>Apply</button>
                </div>
                    {elements}
                </div>
              </div>
            </section>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Pagination
                totalItemsCount={this.state.totRestaurants}
                activePage={this.state.activePage}
                itemsCountPerPage={15}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange} />
            </div>
          </div>


        );
    }
}