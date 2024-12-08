import {useDispatch, useSelector} from "react-redux";
import {addToNum, decrement, inscrement} from "./store/modules/counterStore";
import {useEffect} from "react";
import {fetchChannlList} from "./store/modules/channelStore";

function App() {
    const {count} = useSelector(state => state.counter)
    const dispatch = useDispatch()

    const {channelList} = useSelector(state => state.channel)
    //使用useEffect触发异步执行
    useEffect(() => {
        dispatch(fetchChannlList())
    }, [dispatch]);
    return (
        <div className="App">
            <button onClick={() => dispatch(decrement())}>-</button>
            {count}
            <button onClick={() => dispatch(inscrement())}>+</button>
            <br/>
            <button onClick={() => dispatch(addToNum(10))}>add To 10</button>
            {count}
            <button onClick={() => dispatch(addToNum(20))}>add To 20</button>
            <br/>
            <ul>
                {channelList.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    );
}

export default App;
