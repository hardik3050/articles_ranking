import React, {Component} from 'react';
import './Article.css';
import NewsImage from '../news.png';

class Article extends Component {

    total_article = 5
    article_number = 0

    get_next_article_link(){
        if (this.article_number<this.total_article){
            this.article_number++
            return 'https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-'+ this.article_number +'.json'
        }
    }
    
    state = {
            loading: true,
            title: '',
            heading: '',
            paragraphs: [],
            images: [],
            lists: []
    }

    article={
        title: '',
        heading: '',
        paragraphs: [],
        images: [],
        list: []
    }

    interval = null

    build_data(obj){
        this.article={
                title: '',
                heading: '',
                paragraphs: [],
                images: [],
                list: []
        }
        this.article.title = obj.title
        obj.body.forEach(element => {
        if(element.type === "heading"){
            this.article.heading = element.model.text;
        }else if(element.type === "paragraph"){
            this.article.paragraphs.push(element.model.text);
        }else if(element.type === "image"){
            this.article.images.push(
                    {
                        url: element.model.url,
                        altText: element.model.altText,
                        height: element.model.height,
                        width: element.model.width
                    });
        }else if(element.type === "list"){
            this.article.list.push(element.model);
        }
        });
    }

    get_paragraphs(){
        if(!this.article.paragraphs){
            return
        }
        return this.article.paragraphs.map((para)=>{
            return (<p>{para}</p>)
        })
    }

    prepare_list(l_items){
        return l_items.map((itm)=>{
        return (<li>{itm}</li>)
        })
    }

    get_lists() {
        if(!this.article.list){
            return
        }
        return this.article.list.map((l)=>{
            if (l.type === "unordered")
                return (<ul>{this.prepare_list(l.items)}</ul>)
            else
                return (<ol>{this.prepare_list(l.items)}</ol>)
        })
    }

    update_images() {
        var i = 0;
        this.interval = setInterval(()=>{
            var image_tag = document.getElementById("Article-Header")
            if (this.state.images.length!==0){
                var image = this.state.images[i]
                image_tag.style.backgroundImage = "url("+ image.url +")";
                image_tag.alt = image.altText
                if(i < this.state.images.length - 1){
                    i++;
                }else {
                    i = 0;
                }
            }else{
                image_tag.style.backgroundImage = `url(${NewsImage})`
                image_tag.alt = 'News Icon'
            }
        },
        1000)
    }

    async load_news(){
        const res1 = await fetch(this.get_next_article_link())
        var json_resp1 = await res1.json()
        this.build_data(json_resp1)
        // if(this.article.paragraphs.length == 0){
        //     var para_tag = document.getElementById("Article-Paragraphs");
        //     para_tag.style.display = 'none'

        // }
        // if(this.article.list.length == 0){
        //     var list_tag = document.getElementById("Article-List");
        //     list_tag.style.display = 'none'

        // }
        this.setState({
            loading: false,
            title: this.article.title,
            heading: this.article.heading,
            paragraphs: this.get_paragraphs(),
            images: this.article.images,
            lists: this.get_lists()
        })
        clearInterval(this.interval)
        this.update_images()
    }
    
    changeNews(){
        this.load_news()
    }

    componentDidMount(){
        this.load_news()
    }

    render() {
        document.title = this.state.title;
        if(this.state.loading){
            return <div>Loading...</div>
        }
        else{
        return(
            <div id="Article">
                <div id="Navbar">
                    <button className="Button" id="Prev">&lt;</button>
                    <h1>News Ranker</h1>
                    <button className="Button" id="Next" onClick={this.changeNews.bind(this)}>&gt;</button>
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
}

export default Article;