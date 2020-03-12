import React from 'react';
import NewsImage from '../../news.png';
// --------------------------------------------------------------------------------
// JSX Helper Functions
// --------------------------------------------------------------------------------

function get_paragraphs(){
    if(!this.article_model.paragraphs){
        return
    }
    return this.article_model.paragraphs.map((para, ind)=>{
        return (<p key={String(ind)}>{para}</p>)
    })
}

function prepare_list(l_items){
    return l_items.map((itm, ind)=>{
        return (<ul key={String(ind)}><li key={String(ind)}>{itm}</li></ul>)
    })
}

function get_lists() {
    if(!this.article_model.list){
        return
    }
    return this.article_model.list.map((l, ind)=>{
        if (l.type === "unordered")
            return (<ul key={String(ind)}>{this.prepare_list(l.items)}</ul>)
        else
            return (<ol key={String(ind)}>{this.prepare_list(l.items)}</ol>)
    })
}


// --------------------------------------------------------------------------------
// onClick event Helper Functions
// --------------------------------------------------------------------------------

function nextNews(){
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

function prevNews(){
    if (this.article_number>1){
        this.article_number--
        this.load_news()
    }
}


// --------------------------------------------------------------------------------
// Background image updation function
// --------------------------------------------------------------------------------

function update_images() {
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

// Exporting All The Functions
// Make sure to export function berfore using it
export {
    get_paragraphs,
    prepare_list,
    get_lists,
    nextNews,
    prevNews,
    update_images
};