import UseReducer from "./useReducer";
import UseMemo from "./useMemo";
import MemoProps from "./memo-props比较机制";
import Memo from "./memo-基础用法";

function App() {

    return (
        <>
            <UseReducer/>
            <UseMemo/>
            <MemoProps/> {/*memo-props比较机制*/}
            <Memo/> {/*memo-基础用法*/}
        </>
    )
}

export default App
