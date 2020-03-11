import React, { Component } from 'react';
import './Ranker.css';

class Ranker extends Component {

    handleChange(e, ind){
        let dummy_dict = this.state.ratings
        dummy_dict[ind] = e.target.value
        localStorage.setItem(ind, dummy_dict[ind])
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
                // rank[i] = 0
                // let field_name = "" + i + "_" + element
                // rank[i] = rank[i] + parseInt(localStorage.getItem(field_name))
                // rank.concat(this.state.rank_headers.map((element)=>{
                //     return parseInt(localStorage.getItem(field_name))
                // }))
            }

        this.setState({
            done:true
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
        // return <br/>
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

    render() {
        if(this.state.done){
            return(
                <div>
                    Thank You!!<br/>
                    We appriciate your feedback!!
                </div>
            )
        }
        return (
            <div>
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
                    {/* <subi onClick={this.submitRanking.bind(this)}>Submit</button> */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Ranker;