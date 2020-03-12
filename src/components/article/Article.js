import {Component} from 'react';
import './Article.css';

// Components
import NewsImage from '../../news.png';

// Services and Helper Function
import RestApi from '../../services/RestApi';
import ArticleModel from './ArticleModel';
import render_jsx from './ArticleJSXHandler';
import {get_paragraphs,prepare_list,get_lists,
    nextNews,prevNews,update_images} from './HelperFunction';

class Article extends Component {

    constructor(props){
        super(props)
        // Rest Api Handler
        this.rest_handler = new RestApi()
        
        // Article Model Builder 
        this.article_model = new ArticleModel()

        // JSX Render Function
        this.render_jsx = render_jsx

        // JSX Helper Function
        this.get_paragraphs = get_paragraphs
        this.prepare_list = prepare_list
        this.get_lists = get_lists
        
        // On Click Handler Function
        this.nextNews = nextNews
        this.prevNews = prevNews

        // Background Image Updation function
        this.update_images = update_images

        // Intializing ins
        this.interval = null
        this.total_article = 5
        this.article_number = 1
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

    async load_news(){
        const res1 = await this.rest_handler.getArticleData(this.article_number);
            this.article_model.build_data(res1)
            this.setState({
                loading: false,
                title: this.article_model.title,
                heading: this.article_model.heading,
                paragraphs: this.get_paragraphs(),
                images: this.article_model.images,
                lists: this.get_lists()
            })
            clearInterval(this.interval)
            document.getElementById("Article-Header").style.backgroundImage = `url(${NewsImage})`
            this.update_images()
    }

    componentDidMount(){
        this.load_news()
    }

    render() {
        return this.render_jsx()
    }
}

export default Article;