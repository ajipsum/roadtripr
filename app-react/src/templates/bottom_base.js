import React from 'react';
import ReactDOM from 'react-dom';


export default class BottomBase extends React.Component {
  constructor(props) {
      super(props)
  }  
  render(){
    return (
        <div>
        <main id="main">
        <div className="container">
          <div className="copyright">
            <a href="https://bootstrapmade.com/">��</a> Are We There Yet?
          </div>
          <div className="credits">
            {/*
        All the links in the footer should remain intact.
        You can delete the links only if you purchased the pro version.
        Licensing information: https://bootstrapmade.com/license/
        Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=BizPage
      */}
          </div>
        </div>
        {/* #footer */}
        {/*<a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>*/}
        {/* JavaScript Libraries */}
        {/* Contact Form JavaScript File */}
        {/* Template Main Javascript File */}
      </main></div>
        
    );
  }
}