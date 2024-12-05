//项目根组件
import React, {useState} from 'react';
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

function App() {
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
    let [count3, setCount3] = useState(0)
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
    return (
        <div className="App">
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
        </div>
    );
}

export default App;
