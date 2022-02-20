import React, { useEffect, useState } from 'react'
import styles from '../static/components/header.module.css'

import { Row, Col } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { Link, useHistory } from 'react-router-dom'
const Header = (props) => {
    const [navArray, setNavArray] = useState([])
    const history = useHistory()
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])
    //跳转到列表页
    const handleClick = (e) => {
        console.log(e)
        if (e < 0) {
            history.push('/bugknow')
            return
        }
        if (e === 0) {
            history.push('/')
        } else {
            history.push('/list?id=' + e)//{ pathname : '/list' ,query : { id: e.key} }
        }
    }
    return (< div className={styles.header} >
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className={styles.header_logo}><Link to='/'>Berwin</Link></span>
                <span className={styles.header_txt}>一个爱折腾的小伙子</span>
            </Col>

            <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                {!props.bug ? <div
                    className={styles.menu}
                >
                    {
                        navArray.map((item) => {
                            return (
                                <div key={item.id} className={styles.menuitem} onClick={() => { handleClick(item.id) }}>
                                    {item.typename}
                                </div>
                            )
                        })
                    }
                    <div key={-1} className={styles.menuitem} onClick={() => (handleClick(-1))}>
                        BUG知乎
                </div>
                </div> :
                    <span className={styles.header_logo}><Link to='/bugknow'>致那些年我们遇到的BUG</Link></span>
                }
            </Col>
        </Row>
    </div >)
}

export default Header