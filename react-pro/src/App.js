import UseReducer from "./useReducer";
import UseMemo from "./useMemo";
import MemoProps from "./memo-props比较机制";
import Memo from "./memo-基础用法";
import UseCallback from "./useCallback";

function App() {

    return (
        <>
            <UseReducer/>
            <UseMemo/>
            <MemoProps/> {/*memo-props比较机制*/}
            <Memo/> {/*memo-基础用法*/}
            <UseCallback/>{/*UseCallback*/}
        </>
    )
}

export default App
