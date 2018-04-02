import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import About from '../../src/templates/about.js'
import Cities from '../../src/templates/cities.js'
import City from '../../src/templates/city.js'
import Parks from '../../src/templates/parks.js'
//import Park from '../src/templates/park.js'
import Restaurants from '../../src/templates/restaurants.js'
//import Restaurant from '../src/templates/restaurant.js'
/*
describe('Test About Page', () => {
    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<About />);
    it('exists', () => {
      expect(wrapper.find('#about').exists()).to.eql(true);
    });
});
*/

describe('Test Cities Page', () => {
    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<Cities />);
    it('exists', () => {
      expect(wrapper.find('#cities').exists()).to.eql(true);
    });
});

describe('Test Parks Page', () => {
    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<Parks />);
    it('exists', () => {
      expect(wrapper.find('#parks').exists()).to.eql(true);
    });
});

describe('Test Restaurants Page', () => {
    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<Restaurants />);
    it('exists', () => {
      expect(wrapper.find('#restaurants').exists()).to.eql(true);
    });
});

// Testing Instance
describe("Test Park", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it('Test park instance for website', function () {
    const wrapper = mount(<Park restaurants={{state: {restaurants: ['McDonalds']}}} />);
    expect(wrapper.state().restaurants).contains({restaurants: ['McDonalds']});
  });
});
