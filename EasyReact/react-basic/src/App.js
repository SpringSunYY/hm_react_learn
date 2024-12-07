//项目根组件
import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import './index.css';

const xc = '乖乖'

function getName() {
    return '小猜'
}

const list = [
    {id: 1001, name: 'Vue'},
    {id: 1002, name: 'React'},
    {id: 1003, name: 'Angular'},
    {id: 1004, name: '小猜'}
]

const flag = true
const loading = true

const type = 1  // 0|1|3

function getArticleJSX() {
    if (type === 0) {
        return <div>无图模式模版</div>
    } else if (type === 1) {
        return <div>单图模式模版</div>
    } else if (type === 3) {
        return <div>三图模式模版</div>
    }
}

// 1. 定义组件
function Button() {
    return <button>click me</button>
}

const MsgContext = createContext()

const URL = 'http://geek.itheima.net/v1_0/channels'

function useToggle() {
    //可复用逻辑代码
    //自定义hook
    const [hookValue, setHookValue] = useState(true)
    const toggle = () => {
        setHookValue(!hookValue)
    }
    //哪些状态和回调函数需要使用就返回
    return [hookValue, toggle]
}

function App() {
    //自定义hook
    const [hookValue, setHookValue] = useState(true)
    const [toggleValue, toggle] = useToggle();
    useEffect(() => {
        //获取频道列表
        async function getList() {
            const res = await fetch(URL)
            const list = await res.json()
            console.log(list)
        }

        getList()
    }, []);
    // const clickHandler = () => {
    //     console.log('button按钮点击了')
    // }
    const clickHandler1 = (e) => {
        console.log('button按钮点击了', e)
    }
    const clickHandler2 = (name) => {
        console.log('button按钮点击了', name)
    }
    const clickHandler3 = (name, e) => {
        console.log('button按钮点击了', name, e)
    }
    // 定义状态 count状态变量 setCount函数
    const [count1, setCount] = React.useState(0)
    const [count2, setCount2] = useState(0)
    let [count3] = useState(0)
    const handlerClickCount2 = () => {
        setCount2(count2 + 1)
    }
    //直接修改，无法引发视图更新
    const handlerClickCount3 = () => {
        count3++
        console.log(count3)
    }

    //修改对象状态
    const [from, setFrom] = useState({name: '小猜', age: 18})
    const handlerClickFrom = () => ({
        ...from,
        age: 22
    })

    //样式
    const style = {
        color: 'red',
        fontSize: '50px',
    }

    //受控表单
    const [inputValue, setInputValue] = useState('小猜')

    //ref dom 通过获取DOM的方式获取表单的输入数据
    const inputRef = useRef(null)
    const showDom = () => {
        console.log(inputRef.current.value)
    }
    const [msg, setMsg] = useState('')
    const getMsg = (msg) => {
        setMsg(msg)
    }

    const [aname, setAName] = useState('')
    const getAName = (aname) => {
        setAName(aname)
    }


    const msgContent = 'this is app msg'
    return (
        <div className="App">
            <div>自定义hook</div>
            {toggleValue && <div>toggleValue</div>}
            <button onClick={() => toggle()}>toggleValue</button>

            {hookValue && <div>hookValue</div>}
            <button onClick={() => setHookValue(!hookValue)}>hookValue</button>
            <br/>

            <h1>My First React App,Hello 小猜</h1>
            {`小猜小猜`}{xc}
            <div style={{color: "red"}}>{getName()}</div>
            {new Date().toLocaleTimeString()}
            <br/>
            <div>循环</div>
            <ul>
                {list.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
            <br/>
            <div>三元</div>
            <>
                {flag && <span>this is 小猜</span>}
                {loading ? <span>耶...</span> : <span>this is not 小猜</span>}
            </>
            <br/>
            <div>条件渲染</div>
            <>
                {getArticleJSX()}
            </>
            <br/>
            <div>事件</div>
            <button onClick={clickHandler1}>click me</button>
            <button onClick={() => clickHandler2('小猜')}>click 小猜</button>
            <button onClick={(e) => clickHandler3('jack', e)}>click me</button>
            <br/>
            <div>组件</div>
            <div>
                {/* 自闭和 */}
                <Button/>
                {/* 成对标签 */}
                <Button></Button>
            </div>
            <br/>
            <div>状态</div>
            <div>
                <button onClick={() => setCount(count1 + 1)}>{count1}</button>
                <button onClick={handlerClickCount2}>{count2}</button>
                <button onClick={handlerClickCount3}>{count3}</button>
                <button onClick={() => setFrom(handlerClickFrom())}>{from.age}</button>
            </div>
            <br/>
            <div>样式</div>
            <div style={{color: 'red', fontSize: '20px'}}>内联样式 {getName()}</div>
            <div style={style}>内联样式 {getName()}</div>
            <div className="foo">外联样式 {getName()}</div>
            <br/>
            <div>受控表单</div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            {inputValue}
            <br/>
            <div>非受控表单</div>
            <input type="text" ref={inputRef}/>
            <button onClick={showDom}>获取dom</button>
            <br/>
            <div>父子组件</div>
            <Son name={'小猜'}></Son>
            <div>
                <Son2><span>这是小猜</span></Son2>
            </div>
            <div>子传父</div>
            <Son3 onGetMsg={getMsg}></Son3>{msg}
            <div>兄弟组件</div>
            <div>
                this is App
                <A onGetAName={getAName}/>
                <B name={aname}/>
            </div>
            <br/>
            <div>Context</div>
            <div>
                {/* 2. 在顶层组件 通过Provider组件提供数据 */}
                <MsgContext.Provider value={msgContent}>
                    this is App
                    <AContent/>
                </MsgContext.Provider>
            </div>
        </div>
    );
}

function AContent() {
    return (
        <div>
            this is A AContent
            <BContent/>
        </div>
    )
}

function BContent() {
    // 3. 在底层组件 通过useContext钩子函数使用数据
    const msg = useContext(MsgContext)
    return (
        <div>
            this is B BContent,{msg}
        </div>
    )
}

function A({onGetAName}) {
    // Son组件中的数据
    const name = 'this is A name'
    return (
        <div>
            this is A compnent,
            <button onClick={() => onGetAName(name)}>send</button>
        </div>
    )
}

function B({name}) {
    return (
        <div>
            this is B compnent,
            {name}
        </div>
    )
}

function Son(props) {
    console.log(props)
    return <div>我是{props.name}</div>
}

function Son2(props) {
    return <div>我是{props.children}</div>
}

function Son3({onGetMsg}) {
    const sonMsg = 'this is son msg'
    return (
        <div>
            {/* 在子组件中执行父组件传递过来的函数 */}
            <button onClick={() => onGetMsg(sonMsg)}>send</button>
        </div>
    )
}

export default App;
