import React from 'react';
import Output from './components/output'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {current_url : "", old_url : "", did_get_url: ""}
  }


  searchButtonHandler(event) {
    event.preventDefault();
    this.setState({
      did_get_url: "processing"
    })
    const proxy_url = "https://cors-anywhere.herokuapp.com/";
    const web_archive_url = "http://web.archive.org/cdx/search/cdx?url=" + this.state.current_url + "&limit=1&output=json"
    fetch(proxy_url + web_archive_url)
    .then(response => response.json())
    .then((jsonData) => {
      this.setState({
        // jsonData[1][1] -> timestamp |  jsonData[1][2] -> url  
        old_url: 'http://web.archive.org/web/' + jsonData[1][1] + '/' + jsonData[1][2],
        did_get_url: "yes"
      })
    })
    .catch((error) => {
      console.error(error)
      this.setState({
        did_get_url: "no"
      })
    });

  }

  // Get URL from urlTextBox
  urlTextBoxOnChangeHandler(event) {
    this.setState({
      current_url : event.target.value
    });
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <div className="row">

            <div className="col-sm-12 header">
             <h4> <img src="https://img.icons8.com/dusk/30/000000/add-link.png" alt="icon"/> Broken Links</h4>
            </div>
            

            
              <div className="col-sm-4 left-box">
                <h4>Online tool for viewing first version of web page in PDF Format</h4>
                <h6>This tool is using web archive API to get older version of web pages and pdflayer api to display them in PDF format </h6>
              </div>
              <div className="col-sm-1"></div>
              <div className="col-sm-7 right-box">
                <div className="card">
                  <div className="card-body">
                  <p className="card-text text-muted"> This search may or may not find your request. Its totally depends on weather web archive snapshot web page previouslly or not. <a href="http://web.archive.org/" target="_blank" rel="noopener noreferrer">know more</a></p>
                  
                    <div className="input-group mb-3 mt-3">
                    <input type="text" placeholder="Enter URL" autoComplete="off" className="form-control" name="urlTextBox" value={this.state.current_url} onChange={event => this.urlTextBoxOnChangeHandler(event)} />
                    <div className="input-group-append">
                      <button type="button" name="searchButton" className="btn btn-outline-info" onClick={event => this.searchButtonHandler(event)}> Search </button>
                     </div>
                    </div>

                    { this.state.did_get_url === "processing" ? <p>Status : Searching ... </p> : null } 
                    { this.state.did_get_url === "yes" ? <Output old_url={this.state.old_url} /> : null }
                    { this.state.did_get_url === "no" ? <p>Status : Not Found </p> : null } 
                  
                </div>
              </div>
                
              </div>
            </div>
          </div>
            
          <div className="col-sm-2"></div>
          


        </div>
      </div>
    );
  }
}

export default App;
