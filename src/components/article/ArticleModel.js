class ArticleModel {

    constructor(){
        this.earase_prev_data()
    }

    earase_prev_data(){
        this.title = ''
        this.heading = ''
        this.paragraphs =[]
        this.images = []
        this.list = []
    }

    build_data(raw_data){
        this.earase_prev_data()
        this.title = raw_data.title
        raw_data.body.forEach(element => {
            if(element.type === "heading"){
                this.heading = element.model.text;
            }else if(element.type === "paragraph"){
                this.paragraphs.push(element.model.text);
            }else if(element.type === "image"){
                this.images.push(
                        {
                            url: element.model.url,
                            altText: element.model.altText,
                            height: element.model.height,
                            width: element.model.width
                        });
            }else if(element.type === "list"){
                this.list.push(element.model);
            }
        });
    }
}

export default ArticleModel;