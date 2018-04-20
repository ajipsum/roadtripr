import React from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Highlight from 'react-highlight-words';
import _ from 'lodash';
import Cities from './cities';
import Restaurants from './restaurants';
import Parks from './parks';



export default class Search extends React.Component {
    constructor(props) {

        super(props)

        this.state = {
            query: this.props.match.params.term,
            activePage: 1,
            results: 0,
            elem: [],
            active: [],
            tot: []
        }
        this.handlePageChange = this
            .handlePageChange
            .bind(this)
        this.startSearch = this
            .startSearch
            .bind(this)

    }
    search(word) {
        var query = "\"%25" + word + "%25\"";
        var numQuery = ""
        var moneyQuery = "\"" + word + "\""
        if (word.charAt(0) === "$") {
            console.log(word.charAt(0))
            axios
                .get('http://api.roadtripr.fun/restaurant?page=1&&results_per_page=1000&q={"filters":[' +
                    '{"or": [{"name":"pricing","op":"eq","val":' + moneyQuery + '}]}]}')
                .then(res => {
                    console.log(res)
                    for (var obj of res.data.objects) {
                        this
                            .state
                            .tot
                            .push(obj)

                    }
                    this.setState({
                        results: this.state.tot.length,
                        tot: _.shuffle(this.state.tot)
                    })
                    var temp = []
                    var max = this.state.results > 15
                        ? 15
                        : this.state.results
                    for (var i = 0; i < max; i++) {
                        temp.push(this.state.tot[i])
                    }
                    this.setState({active: temp})
                })
        } else if (!isNaN(word)) {
            numQuery = word
            axios
                .get('http://api.roadtripr.fun/city?page=1&&results_per_page=100&q={"filters":[{"or": ' +
                    '[{"name":"population","op":"like","val":' + numQuery + '}]}]}')
                .then(res => {
                    for (var obj of res.data.objects) {
                        this
                            .state
                            .tot
                            .push(obj)
                    }

                })
        } else {
            axios
                .get('http://api.roadtripr.fun/city?page=1&&results_per_page=100&q={"filters":[{"or": ' +
                    '[{"name":"name","op":"like","val":' + query + '},{"name":"population","op":"like","val":' + query + '}]}]}')
                .then(res => {
                    for (var obj of res.data.objects) {
                        this
                            .state
                            .tot
                            .push(obj)
                    }
                    axios
                        .get('http://api.roadtripr.fun/restaurant?page=1&&results_per_page=100&q={"filters":[{' +
                            '"or": [{"name":"name","op":"like","val":' + query + '},{"name":"rating","op":"like","val":' + query + '}, {"name":"cuisine","op":"like","val":' + query + '}, {"name":"pricing","op":"like","val":' + query + '}]}]}')
                        .then(res => {
                            console.log(res)
                            for (var obj of res.data.objects) {
                                this
                                    .state
                                    .tot
                                    .push(obj)
                            }
                            axios
                                .get('http://api.roadtripr.fun/park?page=1&&results_per_page=100&q={"filters":[{"or": ' +
                                    '[{"name":"name","op":"like","val":' + query + '},{"name":"designation","op":"like","val":' + query + '}, {"name":"states","op":"like","val":' + query + '}]}]}')
                                .then(res => {
                                    for (var obj of res.data.objects) {
                                        this
                                            .state
                                            .tot
                                            .push(obj)
                                    }
                                    this.setState({
                                        results: this.state.tot.length,
                                        tot: _.shuffle(this.state.tot)
                                    })
                                    var temp = []
                                    var max = this.state.results > 15
                                        ? 15
                                        : this.state.results
                                    console.log("max " + max + "results: " + this.state.results)
                                    for (var i = 0; i < max; i++) {
                                        temp.push(this.state.tot[i])
                                    }
                                    this.setState({active: temp})
                                    console.log(this.state.active)
                                });
                        });
                });
        }
        console.log(this.state.results)
    }
    highlight(term){
        return (
            <Highlight
               searchWords = {this.state.query.split(" ")}
               autoEscape={false}
               textToHighlight= {term}
            />)
    }
    handlePageChange(data) {
        this.setState({activePage: data})
        this.setState({active: []});
        var temp = []
        if (data > 0) {
            for (var i = 1; i <= 15; i++) {
                temp.push(this.state.tot[i * data])
            }
        } else {
            for (i = 0; i < 15; i++) {
                temp.push(this.state.tot[i * data])
            }
        }
        this.setState({active: temp})
    }
    startSearch() {
        var q = this.state.query
        if (q.indexOf(" ") >= 0) {
            var words = q.split(" ")
            for (var word of words) {
                this.search(word);
            }
        } else {
            this.search(this.state.query);
        }
    }
    componentDidMount() {
        console.log("componentDidMount")
        this.startSearch()
    }
    render() {
        var elements = []

        console.log(this.state.active)
        for (var element of this.state.active) {
            if (element.hasOwnProperty('population')) {
                console.log(element.name);
                elements.push(Cities.renderCity(element))
            } else if (element.hasOwnProperty('cuisine')) {
                elements.push(Restaurants.renderRestaurant(element))
            } else {
                elements.push(Parks.renderPark(element))
            }
        }
        return (

            <section id="portfolio" className="section-bg">
                <div className="container">
                    <header className="section-header">
                        <h3 className="section-title">Search</h3>
                    </header>
                    <div className="row portfolio-container">
                        {elements.length
                            ? elements
                            : <p className="noresults">No results found.</p>}
                    </div>
                </div>
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Pagination
                        totalItemsCount={this.state.results}
                        activePage={this.state.activePage}
                        itemsCountPerPage={15}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}/>
                </div>
            </section>
        );
    }
}