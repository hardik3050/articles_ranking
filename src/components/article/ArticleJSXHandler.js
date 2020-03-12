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
                <Ranker />
            </div>
                )
        }
        if(this.state.loading){
            return <div>Loading...</div>
        }
        else{
        return(
            <div id="Article" className='conatiner'>
                <div id="Navbar">
                    <button className="Button" id="Prev" onClick={this.prevNews.bind(this)}>&lt;</button>
                    <h1>{this.state.heading}</h1>
                    <button className="Button" id="Next" onClick={this.nextNews.bind(this)}>&gt;</button>
                </div>  
                <div id="Article-Header">
                    
                </div>

                <div className="row" id="Article-Body">
                    <div className="one-half column" id="Article-Paragraphs">{this.state.paragraphs}</div>
                    <div className="one-half column" id="Article-List">{this.state.lists}</div>
                </div>

            </div>
        );
        }
}