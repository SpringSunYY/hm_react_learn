import {Layout, Menu, Popconfirm} from 'antd'
import {DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined,} from '@ant-design/icons'
import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearUserInfo, fetchUserInfo} from "@/store/modules/user";

const {Header, Sider} = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined/>,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined/>,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined/>,
    },
]

const GeekLayout = () => {

    // 路由
    const navigate = useNavigate();
    const onMenuClick = (router) => {
        console.log('onMenuClick', router)
        const path = router.key
        navigate(path)
    }

    //反向高亮
    const location = useLocation();
    const selectedKey = location.pathname;

    //触发获取个人用户信息
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);

    const name = useSelector(state => state.user.userInfo.name);

    const onConfirm = () => {
        dispatch(clearUserInfo())
        navigate('/login')
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <div className="user-info">
                    <span className="user-name">{name}</span>
                    <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={[selectedKey]}
                        onClick={onMenuClick}
                        items={items}
                        style={{height: '100%', borderRight: 0}}></Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}}>
                    <Outlet/> {/*路由出口*/}
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout
