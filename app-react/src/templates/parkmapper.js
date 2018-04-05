import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Parks from './parks'
import Park from './park'

const ParkMapper = () => (
  <Switch>
    <Route exact path='/parks/' component={Parks}/>
    <Route path='/parks/:park' component={Park}/>
  </Switch>
)

export default ParkMapper
