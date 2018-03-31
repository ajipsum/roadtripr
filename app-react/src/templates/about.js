import React from 'react'
import matt from '../img/headshot-matt.png'
import jon from '../img/headshot-jon.png'
import jose from '../img/headshot-jose.png'
import yvonne from '../img/headshot-yvonne.jpg'
import axios from 'axios'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
export default class About extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            issues: [],
            commits: []
            }
        }
    getContribs(){
        axios.get('http://api.roadtripr.fun/contribs/')
        .then(res => {
            console.log(res.data.issues)
            console.log(res.data.commits)
          this.setState({issues: res.data.issues, commits: res.data.commits})
        });
    }
    componentDidMount(){
        this.getContribs()
    }

    render() {
        var issues = 0
        var commits = 0
       for (var issue in this.state.issues){
            issues += this.state.issues[issue]
        }
        for (var commit in this.state.commits){
            commits += this.state.commits[commit]
        }
        return (
<div>
  <section> {/* manual padding */}
    <p>
    </p>
  </section>
  <section id="about">
    <div className="container">
      <header className="section-header">
        <h3>About Us</h3>
        <p>A road trip, in its most primitive definition, is a long journey undertaken
          on the road. It is the epitome of the 90's family vacation, but a lot has
          changed since then. Technological advances, construction headway, and
          development progress have all played a role in changing our society and
          thereby altering much of our old conduct of various activities. Gone are the
          days of flipping through maps and printing out directions, yet the
          sentimentality and metamorphosis associated with road-trips have not changed.
          Nowadays, planning a road-trip incorporates much of the tech aspects that are
          supposed to bring ease and simplicity to a once chaotic task, however these
          applications normally have to be used separately. With this site, users will
          be able to access all relevant information in relation to their interests in
          each component. We hope to widen the breadth of their knowledge regarding the
          sites they plan to visit by including additional facts and invaluable reviews.
          Our team consists of travel aficionados who are rather well versed in the art
          of road-tripping. Thus, this project is the culmination of our experiences -
          understanding some of the problems that can arise when planning and
          incorporating our own solutions to such problems.</p>
      </header>
      <h4 align="center">Are We There Yet? Team</h4>
      <div className="row about-cols counters">
        <div className="col-sm-3 wow" align="center">
          <div className="about-col">
            <div className="img">
              <img src={jon} alt className="rounded mx-auto d-block" style={{maxWidth: 200}} />
            </div>
            <h2 className="title"> Jonathan Brewer</h2>
            <p>Jon is a computer science student at UT.</p>
            <p>Major responsibilities: Full Stack</p>
            <p>Commits: <span data-toggle="counter-up">{this.state.commits['jonbrew']}</span></p>
            <p>Issues: <span data-toggle="counter-up">{this.state.issues['jonbrew']} </span></p>
            <p>Unit tests: 0</p>
          </div>
        </div>
        <div className="col-sm-3 wow" align="center">
          <div className="about-col">
            <div className="img">
              <img src={matt} alt className="rounded mx-auto d-block" style={{maxWidth: 200}} />
            </div>
            <h2 className="title"> Matthew Savignano</h2>
            <p>Matt is a computer science student at UT.</p>
            <p>Major responsibilities: Full Stack</p>
            <p>Commits: <span data-toggle="counter-up">{this.state.commits['savi975']}</span></p>
            <p>Issues: <span data-toggle="counter-up">{this.state.issues['savi975']} </span></p>
            <p>Unit tests: 0</p>
          </div>
        </div>
        <div className="col-sm-3 wow" align="center">
          <div className="about-col">
            <div className="img">
              <img src={jose} alt className="rounded mx-auto d-block" style={{maxWidth: 200}} />
            </div>
            <h2 className="title"> Jose Magana</h2>
            <p>Jose is a computer science student at UT.</p>
            <p>Major responsibilities: Full Stack</p>
            <p>Commits: <span data-toggle="counter-up">{this.state.commits['Magana']}</span></p>
            <p>Issues: <span data-toggle="counter-up">{this.state.issues['Magana']} </span></p>
            <p>Unit tests: 0</p>
          </div>
        </div>
        <div className="col-sm-3 wow" align="center">
          <div className="about-col">
            <div className="img">
              <img src={yvonne} alt className="rounded mx-auto d-block" style={{maxWidth: 200}} />
            </div>
            <h2 className="title"> Yvonne Huang</h2>
            <p>Yvonne is a computer science student at UT.</p>
            <p>Major responsibilities: Full Stack</p>
            <p>Commits: <span data-toggle="counter-up">{this.state.commits['huangyvonnee']}</span></p>
            <p>Issues: <span data-toggle="counter-up">{this.state.issues['huangyvonnee']} </span></p>
            <p>Unit tests: 0</p>
          </div>
        </div>
    </div>
    </div>
  </section>{/* #about */}
  <section id="facts" className="wow">
    <div className="container">
      <header className="section-header">
        <h3>Stats</h3>
      </header>
      <div className="row counters">
        <div className="col-lg-4 col-6 text-center">
          <span data-toggle="counter-up">{commits}</span>
          <p>Total Commits</p>
        </div>
        <div className="col-lg-4 col-6 text-center">
          <span data-toggle="counter-up">{issues}</span>
          <p>Total Issues</p>
        </div>
        <div className="col-lg-4 col-6 text-center">
          <span data-toggle="counter-up">0</span>
          <p>Total Tests</p>
        </div>
      </div>
    </div>
  </section>{/* #facts */}
  <section id="contact" className="section-bg wow">
    <div className="container">
      <div className="section-header">
        <h3>Features</h3>
      </div>
      <div className="row contact-info">
        <div className="col-lg-4">
          <div className="contact-address">
            <i className="ion-ios-location-outline" />
            <h3>Data</h3>
            <p><a href="https://developers.google.com/maps/documentation/">Google Maps</a></p>
            <p className="small">Used to get location data</p>
            <p><a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">National Parks Service</a></p>
            <p className="small">Used for getting information regarding National Parks</p>
            <p><a href="https://www.yelp.com/developers/documentation/v3">Yelp</a></p>
            <p className="small">Pulled data to get reviews and restaurant information</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div>
            <i className="ion-wrench" />
            <h3>Tools</h3>
            <p className="small">Amazon Web Services: hosts our site</p>
            <p className="small">Bootstrap: our CSS framework</p>
            <p className="small">Flask: our Web framework</p>
            <p className="small">Github: used to collaborate during coding</p>
            <p className="small">Namecheap: provides our custom domain name</p>
            <p className="small">Postman: used to design our API documentation</p>
            <p className="small">Slack: used to communicate within our team</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="contact-email">
            <i className="ion-social-github-outline" />
            <h3>Links</h3>
            <p><a href="https://www.gitbook.com/book/huangyvonnee/roadtripr/">Gitbook</a></p>
            <p><a href="https://github.com/Magana/roadtripr/">Github Repo</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>{/* #contact */}

</div>

        );
    }
}
