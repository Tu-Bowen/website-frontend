import axios from 'axios'
import Header from '../components/Header'
import Auther from '../components/Auther'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import { Row, Col, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import styles from '../static/pages/home.module.css'
import { Link } from 'react-router-dom'
let getQuery = ({ search }) => {
    let query = search.split("?")[1], queryObj = {}
    let keyValues = query.split('&')
    keyValues.forEach(item => {
        let kv = item.split("=")
        let key = kv[0], value = kv[1]
        queryObj[key] = value
    })
    return queryObj
}
const Book = (props) => {
    const [booklist, setBooklist] = useState([])
    const [bookname, setBookname] = useState()
    const [bookid, setBookid] = useState()
    useEffect(() => {
        let query = getQuery(props.location)
        setBookid(query.bookid)
        setBookname(decodeURIComponent(query.bookname))
        axios(servicePath.getListByBookid + query.bookid).then(
            (res) => {
                console.log(res)
                setBooklist(res.data.data)
            }
        )
    }, [])
    return (
        <div>
            <Header></Header>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <List
                            header={<div style={{
                                color: '#1e90ff',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                            }}>{bookname}</div>}
                            itemLayout="vertical"
                            dataSource={booklist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <div className={styles.list_title}>
                                            <Link to={`/detailed?id=${item.id}`}>
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
                </Col>

                <Col xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Auther />
                    {/* <Advert /> */}
                </Col>
            </Row>
            <Footer />
        </div>
    )
}
export default Book