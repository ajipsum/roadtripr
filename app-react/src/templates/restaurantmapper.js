import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Restaurants from './restaurants'
import Restaurant from './restaurant'

const RestaurantMapper = () => (
  <Switch>
    <Route exact path='/restaurants/' component={Restaurants}/>
    <Route path='/restaurants/:restaurant' component={Restaurant}/>
  </Switch>
)

export default RestaurantMapper
