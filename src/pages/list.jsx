import axios from 'axios'
import Header from '../components/Header'
import Auther from '../components/Auther'
import Footer from '../components/Footer'
import  servicePath  from '../config/apiUrl'
import { Row, Col, List ,Breadcrumb,Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import styles from '../static/pages/home.module.css'
import Volume from '../components/Volume'
import {Link} from 'react-router-dom'
let getQuery=(search)=>{
  let query=search.split("?")[1],queryObj={}
  let keyValues=query.split('&')
  keyValues.forEach(item=>{
    let kv = item.split("=")
    let key=kv[0],value=kv[1]
    queryObj[key]=value
  })
  return queryObj
}
export default function TheList(list) {
  const [mylist, setMylist] = useState()
  const [breaditem,setBreaditem]=useState()
  useEffect(()=>{
    let {search}=list.location
    let id=parseInt(getQuery(search).id)
    let _breaditem=""
    if(id===1){
      _breaditem="技术博客"
    }
    if(id===2){
      _breaditem="开源项目"
    }
    if(id===3){
      _breaditem="源码分析"
    }
    const promise = new Promise((resolve)=>{
      axios(servicePath.getListById+id).then(
        (res)=>{
          console.log(res)
          setMylist(res.data.data)
          setBreaditem(_breaditem)
        }
      )
    })
  },[list.location])
  return (
    <div>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                  <Breadcrumb.Item>
                  {breaditem}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                  <div className={styles.list_title}>
                    <Link to={`/detailed?id=${item.id}`}>{/**Link标签这里有个坑 */}
                      {item.title}
                    </Link>
                    <Tag color="#108ee9" style={{marginLeft:'10px'}}>{item.bookName}</Tag>
                  </div>
                  </div>
                  <div className={styles.list_icon}>
                    <span className={styles.list_icon_span}><CalendarOutlined /> {item.addTime}</span>
                    <span className={styles.list_icon_span}><FolderOutlined />{item.typeName}</span>
                    <span className={styles.list_icon_span}><FireOutlined /> {item.view_count}</span>
                  </div>
                  <div className={styles.list_context}>{item.introduce}</div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col xs={0} sm={0} md={7} lg={5} xl={4}>
          <Auther />
          <Volume/>
          {/* <Advert /> */}
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}
