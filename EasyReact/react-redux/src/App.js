import {useDispatch, useSelector} from "react-redux";
import {addToNum} from "./store/modules/counterStore";

function App() {
    const {count} = useSelector(state => state.counter)
    const dispatch = useDispatch()
    return (
        <div className="App">
            <button onClick={() => dispatch(addToNum(10))}>add To 10</button>
            {count}
            <button onClick={() => dispatch(addToNum(20))}>add To 20</button>
        </div>
    );
}

export default App;
