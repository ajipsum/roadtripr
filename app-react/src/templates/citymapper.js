import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Cities from './cities'
import City from './city'
//import Player from './Player'

// The Roster component matches one of two different routes
// depending on the full pathname
const CityMapper = () => (
  <Switch>
    <Route exact path='/cities/' component={Cities}/>
    <Route path='/cities/:city' component={City}/>
  </Switch>
)


export default CityMapper
