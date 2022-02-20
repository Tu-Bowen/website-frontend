import {Link} from "react-router-dom"
import axios from 'axios'
import Header from '../components/Header'
import Auther from '../components/Auther'
import Volume from '../components/Volume'
import Footer from '../components/Footer'
import { Row, Col, List,Tag } from 'antd'
import React, { useState ,useEffect} from 'react'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import marked from 'marked'
import hljs from 'highlight.js'
import styles from '../static/pages/home.module.css'
import servicePath from '../config/apiUrl.js'
export default function Home(list) {
  const [mylist, setMylist] = useState([])
  const renderer = new marked.Renderer();
  useEffect(() => {
    axios(servicePath.getArticleList).then(
      (res) => {
        setMylist(res.data.data)
      }
    )
  }, [])
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return (
    <div>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className={styles.list_title}>
                    <Link to={`/detailed?id=${item.id}`}>
                      {item.title}
                    </Link>
                    <Tag color="#108ee9" style={{marginLeft:'10px'}}>{item.bookName}</Tag>
                  </div>
                  <div className={styles.list_icon}>
                    <span className={styles.list_icon_span}><CalendarOutlined /> {item.addTime}</span>
                    <span className={styles.list_icon_span}><FolderOutlined />{item.typeName}</span>
                    <span className={styles.list_icon_span}><FireOutlined /> {item.view_count}</span>
                  </div>
                  <div className={styles.list_context} dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col xs={0} sm={0} md={7} lg={5} xl={4}>
          <Auther />
          <Volume />
          {/*<Advert />*/} 
        </Col>
      </Row>
      <Footer />
    </div>
  )
}
