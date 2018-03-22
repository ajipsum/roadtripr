import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import CityMapper from './citymapper'
import ParkMapper from './parkmapper';
import RestaurantMapper from './restaurantmapper';
import Cities from './cities';
import City from './city';
import About from './about'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/cities' component={Cities}/>
      <Route path='/city/:city' component={City}/>
      <Route path='/parks' component={ParkMapper}/>
      <Route path='/restaurants' component={RestaurantMapper}/>
      <Route path='/about' component={About}/>

    </Switch>
  </main>
)

export default Main
