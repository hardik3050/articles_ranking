import React, {Component} from 'react';
import './Article.css';
import NewsImage from '../../news.png';
import Ranker from '../ranker/Ranker';

class Article extends Component {

    total_article = 5
    article_number = 1

    get_article_link(){
        return 'https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-'+ this.article_number +'.json'
    }

    nextNews(){
        var ls_key="article-" + String(this.article_number)
        localStorage.setItem(ls_key, this.state.title)

        if(this.article_number===this.total_article){
            this.setState({
                end_of_articles:true        
            })
            return
        }

        if (this.article_number<this.total_article)
            this.article_number++
            this.load_news()
    }

    prevNews(){
        if (this.article_number>1){
            this.article_number--
            this.load_news()
        }
    }
    
    state = {
            loading: true,
            title: '',
            heading: '',
            paragraphs: [],
            images: [],
            lists: [],
            end_of_articles:false
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
                image_tag.style.backgroundImage = "url("+ image.url + "=" +  (this.article_number+1)*(i+1) +")";
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
        1500)
    }

    async load_news(){
        let link = this.get_article_link()
        const res1 = await fetch(link)
        var json_resp1 = await res1.json()
        this.build_data(json_resp1)
        this.setState({
            loading: false,
            title: this.article.title,
            heading: this.article.heading,
            paragraphs: this.get_paragraphs(),
            images: this.article.images,
            lists: this.get_lists()
        })
        this.article=null
        clearInterval(this.interval)
        document.getElementById("Article-Header").style.backgroundImage = `url(${NewsImage})`
        this.update_images()

    }

    componentDidMount(){
        this.load_news()
    }

    render() {
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
}

export default Article;