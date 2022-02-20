import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import { Row, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import styles from '../static/pages/home.module.css'
import { Link } from 'react-router-dom'
export default function TheList(props) {
  const [mylist, setMylist] = useState()
  useEffect(() => {
    //   axios().then(
    //     (res)=>{
    //       console.log(res)
    //       setMylist(res.data.data)
    //     }
    //   )
  }, [])
  return (
    <div>
      <Header bug={true}></Header>
      <Row className="comm-main" type="flex" justify="center">
        <div className="comm-left" style={{ width: "60%" }}>
          <List
            header={<div style={{
              color: '#1e90ff',
              fontSize: '1rem'
            }}>BUG与你都是生活的一部分</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <div className={styles.list_title}>
                    <Link to={{ pathname: '/detailed?id=' + item.id }}>
                      {item.title}
                    </Link>
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
      </Row>
      <Footer />
    </div>
  )
}
