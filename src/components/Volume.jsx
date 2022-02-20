
import { Card, List } from 'antd'
import styles from '../static/components/volume.module.css'
import {useState ,useEffect} from 'react'
import axios from 'axios';
import servicePath from '../config/apiUrl'
import { useHistory } from 'react-router-dom'
const Volume = () => {
  let [data, setData] = useState([])
  const history = useHistory()
  useEffect(() => {
    const fetchData = async () => {
        const result = await axios(servicePath.getBooks).then(
            (res) => {
                setData(res.data.data)
                return res.data.data
            }
        )
        setData(result)
    }
    fetchData()
  }, [])
  const itemClick=(book)=>{
    console.log(book)
    const{bookname,bookid}=book
    history.push(`/book?bookname=${bookname}&bookid=${bookid}`)
  }
  return (
    <div style={{ margin: 10 }}>
      <Card bordered={false} className={styles.card}>
      <List
      header={<div style={{
        color: '#1e90ff',
        fontSize: '1rem',
        fontWeight:'bold'
      }}>小册</div>}
      size="small"
      dataSource={data}
      renderItem={item => (
        <List.Item
        onClick={()=>{
          itemClick(item)
        }} 
        className={styles.item}
        > {item.bookname}</List.Item>
      )}
    />
      </Card>
    </div>
  )

}

export default Volume