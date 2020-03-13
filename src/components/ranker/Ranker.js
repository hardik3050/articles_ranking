import React, { Component } from 'react';
import './Ranker.css';
import '../../App.css'
const axios = require('axios').default;

class Ranker extends Component {

    handleChange(e, ind){
        let dummy_dict = this.state.ratings
        dummy_dict[ind] = e.target.value
        localStorage.setItem(ind, dummy_dict[ind])
        axios.post(' http://localhost:3001/ranking_data',{ dummy_dict })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        this.setState({
            ratings:dummy_dict
        })
        dummy_dict=null
    }


    state = {
        done:false,
        titles: [],
        rank_headers: ["Informative","Timeliness","Content-Quality","Length of Article(Time to read)"],
        ratings: {}
    }

    state = {
        ...this.state,
        headers: [
            "Title",
            ...this.state.rank_headers
        ],
    }

    calculate_rank(rank_score){
        let rank = {}
        for(let i=0;i<5;i++){
            let r = 1
            let checked=[]
                
                for(let j=0;j<5;j++){
                    if(i!==j && rank_score[i]<rank_score[j]){
                        r++;
                        checked.push(rank_score[j])
                    }
            }
            rank[i]=r
        }
        return rank
    }

    submitRanking(e){
        e.preventDefault()
        let rank = {}
            for(let i=0;i<5;i++){
                rank[i]=0
                this.state.rank_headers.map((element)=>{
                    let field_name = "" + i + "_" + element
                    rank[i] = rank[i] + parseInt(localStorage.getItem(field_name))
                    return null
                })
                rank[i] = rank[i]/4;
            }
        

        this.setState({
            done:true,
            ratings:this.calculate_rank(rank)
        })
    }

    get_input_fields(title_ind){
        return this.state.rank_headers.map((element, ind)=>{
            let ip_field_name="" + title_ind + "_" + element
                return(
                    <td key={String(ind)}>
                        <input type="number" id={ip_field_name} name={ip_field_name} onChange={(e)=>{
                            this.handleChange(e, ip_field_name)
                        }} min="0" max="5" required/>
                    </td>
                )
        })
    }

    get_headers(){
        return this.state.headers.map((element, ind)=>{
            return (<th key={String(ind)}> {element} </th>)
        })
    }

    get_rows(){
        return this.state.titles.map((element, ind)=>{
            return(
                <tr key={String(ind)}>
                    <td key={String(ind*2)}>
                        {element}
                    </td>
                    {this.get_input_fields(ind)}
                </tr>
            )
        })
        
    }

    componentDidMount() {
        var titles = []
        for (var i = 0; i < 5; i++) {
            var ls_key = "article-" + String(i + 1)
            titles.push(localStorage.getItem(ls_key))
        }
        this.setState({
            titles: titles
        })
    }

    get_rank(){
        return this.state.titles.map((element, ind)=>{
            return(
                <tr key={String(ind+1)}>
                    <td key={String((ind+1)*2)}>
                        {element}
                    </td>
                    <td key={String((ind+1)*3)}>
                        {this.state.ratings[ind]}
                    </td>
                </tr>
            )
        })
    }

    render() {
        if(this.state.done){
            return(
                <div class='container center'>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.get_rank()}
                        </tbody>
                    </table>
                </div>
            )
        }

        return (
            
            <div className='container'>
            <div id="Navbar">
                    
                    <h1>Give your Feedback!</h1>
                    
                </div> 
                <form onSubmit={this.submitRanking.bind(this)}>
                    <table>
                        <thead>
                            <tr>
                                {this.get_headers()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.get_rows()}
                        </tbody>
                    </table>
                    
                    <button type="submit" value='submit input'>Submit</button>
                </form>
            </div>
       
            
        )
    }
}

export default Ranker;