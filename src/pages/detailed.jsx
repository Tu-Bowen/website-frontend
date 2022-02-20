import React, {  useState, useEffect } from 'react'
import Author from '../components/Auther'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import styles from '../static/pages/detailed.module.css'
import marked from 'marked'
import hljs from "highlight.js";
import MarkNav from 'markdown-navbar';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Volume from '../components/Volume'
import { Link,withRouter } from 'react-router-dom'


//import Markdown from '../components/Markdown'
//import Markdown from 'react-markdown'
//const theContext = createContext()
let getQuery=(search)=>{
  let query=search.split("?")[1],queryObj={}
  if(!query)return
  let keyValues=query.split('&')
  if(!keyValues)return
  keyValues.forEach(item=>{
    let kv = item.split("=")
    let key=kv[0],value=kv[1]
    queryObj[key]=value
  })
  return queryObj
}
const Detailed = (props) => {
  const renderer = new marked.Renderer();
  let [html, setHtml] = useState('')
  let [typeName,setTypeName] = useState()
  let [typeId,setTypeId]=useState()
  let [addTime,setAddTime]=useState()
  let [viewcount,setViewcount]=useState()
  let [title,setTitle]=useState()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  useEffect(() => {
    let {search}=props.location
    let id=decodeURIComponent(getQuery(search).id)
    axios(servicePath.getArticleById + id).then(
      (res) => {
        const _html=marked(res.data.data[0].article_content)
        setHtml(_html?_html:res.data.data[0].article_content)
        if(res.data.data[0].typeId===1){
          setTypeName("技术博客")
        }else if(res.data.data[0].typeId===2){
          setTypeName("开源项目")
        }else if(res.data.data[0].typeId===3){
          setTypeName("源码分析")
        }
        setTypeId(res.data.data[0].typeId)
        setAddTime(res.data.data[0].addTime)
        setViewcount(res.data.data[0].view_count)
        setTitle(res.data.data[0].title)

      }
    ).catch(err=>{
      console.log(err)
    })
  }, [props.location])
  return (<>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        <div>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to={"list?id=" +typeId}>{typeName}</Link></Breadcrumb.Item>
              <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <div className={styles.detailed_title}>
              {title}
            </div>

            <div className="list-icon center">
              <span><CalendarOutlined /> {addTime}</span>
              <span><FolderOutlined /> {typeName}</span>
              <span><FireOutlined /> {viewcount}</span>
            </div>

            <div className={styles.detailed_content} id="content" dangerouslySetInnerHTML={{ __html: html }}>
              {
                /*<theContext.Provider value={markdown}>
                  <Markdown theContext={theContext}></Markdown>
                  </theContext.Provider>*/
              }
              {
                /*<Markdown children={article} />*/
              }
            </div>
          </div>

        </div>
      </Col>

      <Col xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        <Volume/>
        {/* <Advert /> */}
        <Affix offsetTop={5}>
          <div className="detailed-nav comm-right">
            <div className="nav-title">文章目录</div>
            <MarkNav
              className="article-menu"
              source={props.article_content}
            />
          </div>
        </Affix>
      </Col>
    </Row>
    <Footer />

  </>)
}
export default withRouter(Detailed)