class RestApi {
    constructor(){
        this.base_url = 'https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/'
        this.rank_url = 'http://localhost:3001/ranking_data'
    }

    handleReqError(res){
        if(!res.ok){
            throw Error(res.statusText);

        }
        return res
    }

    async getArticleData(article_number){
        return fetch(this.base_url+'article-'+ article_number +'.json',
        )
        .then((res)=>{
            return this.handleReqError(res)
        }).then((resp)=>{
            return resp.json()
        })
    }

     async getRankingData(){
        return fetch(this.rank_url+'.json',
        )
        .then((res)=>{
            return this.handleReqError(res)
        }).then((resp)=>{
            return resp.json()
        })
    
    }
    


 




}




export default RestApi;