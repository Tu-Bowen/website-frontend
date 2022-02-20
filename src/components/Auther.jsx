import { Avatar, Divider, Tooltip } from 'antd'
import styles from '../static/components/author.module.css'
import { createFromIconfontCN } from '@ant-design/icons'
const Author = () => {
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_2478211_bphe4hzdd1h.js',
    });
    return (
        <div className={`${styles.author_div} ${styles.author_box}`}>
            <div className={styles.author_div_div}> <Avatar size={100} src="http://47.97.26.45:7001/public/a.jpg" /></div>

            <div className={`${styles.author_introduction} ${styles.author_div_div}`}>
                <div><h2>Berwin</h2></div>
                喜欢打球，喜欢健身，喜欢技术，一个爱折腾的热血青年
                <Divider>社交账号</Divider>
                <Tooltip placement="left" title={"Github主页"}>
                    {/* <GithubOutlined /> */}
                    <a href="https://github.com/dunktu">
                        <Avatar size={23} className={styles.account}
                            icon={<IconFont type="icon-github1" />}
                            style={{ margin: '5px', cursor: 'pointer' }}>
                        </Avatar>
                    </a>
                </Tooltip>
                <Tooltip placement="top" title={"Gitee主页"}>
                    {/* <QqOutlined /> */}
                    <a href="https://gitee.com/boown">
                        <Avatar size={23} className={styles.account}
                            icon={<IconFont type="icon-gitee" />}
                            style={{ margin: '5px', cursor: 'pointer' }}>
                        </Avatar>
                    </a>
                </Tooltip>
                <Tooltip placement="top" title={"Gitlab主页"}>
                    {/* <WechatOutlined /> */}
                    <Avatar size={23} className={styles.account}
                        icon={<IconFont type="icon-gitlab" />}
                        style={{ margin: '5px', cursor: 'pointer' }}>
                    </Avatar>
                </Tooltip>
                <Tooltip placement="right" title={"稀土掘金主页"}>
                    <a href="https://juejin.cn/user/598576363471879">
                        <Avatar size={23} className={styles.account}
                            icon={<IconFont type="icon-juejin-logo" style={{ fontSize: '100%' }} />}
                            style={{ margin: '5px', cursor: 'pointer', textAlign: 'center' }}>
                        </Avatar>
                    </a>
                </Tooltip>

            </div>
        </div>
    )

}

export default Author