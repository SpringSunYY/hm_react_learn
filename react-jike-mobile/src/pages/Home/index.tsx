import './style.css'
import {Tabs} from "antd-mobile";
import {useTabs} from "@/pages/Home/useTables";
import HomeList from "@/pages/Home/HomeList";

const Home = () => {
/*    const [channels, setChannels] = useState<ChannelItem[]>([])

    useEffect(() => {
        const getChannels = async () => {
            try {
                // 获取频道数据
                const res = await fetchChannelAPI();
                setChannels(res.data.data.channels)
            } catch (e) {
                console.log(e)
                throw new Error('fetch error channel')
            }
        }
        getChannels()
    }, [])*/
    const { channels } = useTabs()
    return (
        <div>
            <div className="tabContainer">
                {/* tab区域 */}
                <Tabs defaultActiveKey={'0'}>
                    {channels.map((item) => (
                        <Tabs.Tab title={item.name} key={item.id}>
                            {/*/!* list组件 *!/*/}
                            {/*/!* 别忘嘞加上类名 严格控制滚动盒子 *!/*/}
                            <div className="listContainer">
                                <HomeList channelId={'' + item.id}/>
                            </div>
                        </Tabs.Tab>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}

export default Home
