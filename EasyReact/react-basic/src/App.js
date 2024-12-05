//项目根组件
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
    const clickHandler3 = (name,e)=>{
        console.log('button按钮点击了', name,e)
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
        </div>
    );
}

export default App;
