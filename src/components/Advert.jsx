import styles from '../static/components/advert.module.css';
import {Image}from 'antd'
 const Advert = ()=>{
    return (
        <div className={`${styles.ad_div} ${styles.ad_box}`}>
          <div className={styles.ad_div_div}><Image preview={false} src="http://blogimages.jspang.com/flutter_ad2.jpg" width="100%" alt="广告图片"/></div>
          <div className={styles.ad_div_div}><Image preview={false} src="http://blogimages.jspang.com/Vue_koa_ad1.jpg" width="100%" alt="广告图片"/></div>
          <div className={styles.ad_div_div}><Image preview={false} src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" alt="广告图片"/></div>
        </div>
    )
 }

 export default Advert