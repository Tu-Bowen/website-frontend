//let ipUrl = 'http://localhost:7001/default/' 
let ipUrl = 'http://47.97.26.45:7001/default/' 

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleById:ipUrl + 'getArticleById?id=',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo:ipUrl+'getTypeinfo',// 文章主页的头部分类
    getListById:ipUrl+'getListById/',//根据分类获取文章列表
    getBooks:ipUrl+'getBooks',//获取小册
    getListByBookid:ipUrl+'getListByBookid/',//获取小册对应文章列表
}
export default servicePath;