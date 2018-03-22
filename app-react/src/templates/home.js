import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopBase from './top_base.js'
import BottomBase from './bottom_base.js'
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import header from '../img/header.jpg'
import city from '../img/city.jpg'
import park from '../img/park.jpg'
import restaurant from '../img/restaurant.jpg'
var innerDiv = 
{
     margin: "auto",    
}
export default class Base extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div style={{overflow:"none !important"}}>
        {/*==========================
          Intro Section
        ============================*/}
          <Carousel
              showThumbs={false}
              showStatus={false}
              width={window.innerWidth.toString}
              useKeyboardArrows
              infiniteLoop
              className="presentation-mode"
            >
              <div> 
                <img src={header}  /> 
                <div className="legend">
                  <p>Discover the freedom of the open road</p>
                  <p>Time to embark on a timeless recreational tradition</p>
                </div>
              </div>
              <div>
                    <img src={city} />
                    <p className="legend">Explore Cities</p>
                </div>
                <div>
                    <img src={park} />
                    <p className="legend">Explore Parks</p>
                </div>
                <div>
                    <img src={restaurant} />
                    <p className="legend">Explore Restaurants</p>
                </div>
            </Carousel>
       <BottomBase />
      </div>
      );
  }
};