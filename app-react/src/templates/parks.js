import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';


var config = {
    headers: {'Access-Control-Allow-Origin': '*'}

};

export default class Parks extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            parks: []
          }
    }
    getParks() {
        axios.get('http://test.roadtripr.fun/parks?page=1&results_per_page=15')
        .then(res => {
          this.setState({parks: res.data.objects})
        });
    }
    renderParks(){
        console.log("in renderparks")
        for (var park of this.state.parks){
            this.renderPark(park);
        }

    }
    renderPark(park){
        const element = (
            <div className="col-lg-4 col-md-6 portfolio-item filter-app wow">
                <div className="portfolio-wrap">
                    <figure>
                        <a href={"parks/" + park.name}><img src={park.image} className="img-fluid" alt /></a>
                        {/* <a href={park.image} data-lightbox="portfolio" data-title="park" className="link-preview" title="Preview"><i className="ion ion-eye" /></a>
                        <a href={"parks/" + park.name} className="link-details" title="More Details"><i className="ion ion-android-open" /></a> */}
                    </figure>
                    <div className="portfolio-info">
                        <p><Link to={'/parks/' + park.name}>{park.name}</Link></p>
                        <a href="{park.website}" className="website">Website <i className="ion ion-android-open" /></a>
                    </div>
                </div>
            </div>)
      console.log(element);
      return element;


    }
    componentDidMount(){
         this.getParks();
    }
    render() {
        var elements = []
        // var i = 0
        for(var park of this.state.parks){
            elements.push(this.renderPark(park));
        }

        return (
            <div>
            <section id="portfolio" className="section-bg">
              <div className="container">
                <header className="section-header">
                  <h3 className="section-title">Parks</h3>
                </header>
                <div className="row portfolio-container">
                    {elements}
                </div>
              </div>
            </section>
          </div>


        );
    }
}