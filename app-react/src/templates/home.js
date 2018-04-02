import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopBase from './top_base.js'
import BottomBase from './bottom_base.js'
// import { Carousel } from 'react-responsive-carousel';
import { Carousel, Button } from 'react-bootstrap'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import header from '../img/header.jpg'
import city from '../img/city.jpg'
import park from '../img/park.jpg'
import restaurant from '../img/restaurant.jpg'
var innerDiv =
{
     margin: "auto",
}
export default class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }
  render() {
    const { index, direction } = this.state;
    return (
      <div>
            <Carousel
              activeIndex={index}
              direction={direction}
              onSelect={this.handleSelect}
            >
            <Carousel.Item>
              <img src={header}/>
              <Carousel.Caption>
                <h2>Discover the freedom of the open road</h2>
                <h4>Time to embark on a timeless recreational tradition</h4>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={city}/>
              <Carousel.Caption>
                <a href="/cities" className="explore-btn">Explore Cities</a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={park}/>
              <Carousel.Caption>
                <a href="/parks" className="explore-btn">Explore Parks</a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={restaurant}/>
              <Carousel.Caption>
                <a href="/restaurants" className="explore-btn">Explore Restaurants</a>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
      </div>
      );
  }
};
