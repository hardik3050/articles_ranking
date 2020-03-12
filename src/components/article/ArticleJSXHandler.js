import Ranker from '../ranker/Ranker';
import React from 'react';

export default function render_jsx(){
    document.title = this.state.title;
        if(this.state.end_of_articles){
            document.title = "Rank our articles and help us do better job!!"
            if(clearInterval)
                clearInterval(this.interval)

            return (
            <div>
                <Ranker/>
            </div>
                )
        }
        if(this.state.loading){
            return <div>Loading...</div>
        }
        else{
        return(
            <div id="Article">
                <div id="Navbar">
                    <button className="Button" id="Prev" onClick={this.prevNews.bind(this)}>&lt;</button>
                    <h1>News Ranker</h1>
                    <button className="Button" id="Next" onClick={this.nextNews.bind(this)}>&gt;</button>
                </div>  
                <div id="Article-Header">
                    <div id="Article-Heading">
                        {this.state.heading}
                    </div>
                </div>
                <div id="Article-Body">
                    <div id="Article-Paragraphs">
                        {this.state.paragraphs}
                    </div>
                    <div id="Article-List">
                        <ul>{this.state.lists}</ul>
                    </div>
                </div>
            </div>
        );
        }
    }