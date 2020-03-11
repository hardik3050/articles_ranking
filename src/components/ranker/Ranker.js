import React, {Component} from 'react';
import './Ranker.css';

class Ranker extends Component {
    
    state={
        titles:[]
    }

    componentDidMount(){
        var titles = []
        for(var i=0;i<5;i++){
            var ls_key="article-" + String(i+1)
            titles.push(localStorage.getItem(ls_key))
        }
        this.setState({
            titles:titles
        })
    }

    render(){
        return(
            <div>
                This is Ranker Component..
                <br />
                {this.state.titles}
            </div>
        )
    }
}

export default Ranker;