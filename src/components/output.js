import React from 'react'
class Output extends React.Component {

    // Download web page as a PDF 
    downloadButtonHandler(event, task) {
        event.preventDefault();
        const ACCESS_KEY = "1d114d744f3cebe376fd9c120a621d2b"
        let inline = 0
        if (task === "view") {
            inline = 1
        }
        let base_url = "https://api.pdflayer.com/api/convert?access_key=" + ACCESS_KEY + "&document_url=" + this.props.old_url + "&test=1&inline=" + inline
        window.open(base_url)
    }
    render() {
        return (
            <div class="btn-group" role="group">
             <button type="button" className="btn btn-success" onClick={event => this.downloadButtonHandler(event, "view")}>View as PDF</button>
             <button type="button" className="btn btn-primary" onClick={event => this.downloadButtonHandler(event, "download")}>Download as PDF</button>
             <a href={ this.props.old_url } className="btn btn-warning" target="_blank" rel="noopener noreferrer">View in Web</a>
            </div>
        );
    }
}
export default Output;