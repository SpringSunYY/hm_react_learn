import UseReducer from "./useReducer";
import UseMemo from "./useMemo";
import MemoProps from "./memo-props比较机制";
import Memo from "./memo-基础用法";
import UseCallback from "./useCallback";
import ForwardRef from "./forwardRef";
import UseInperativeHandle from "./useInperativeHandle";
import ClassApi from "./class-实现counter";
import ClassApiS from "./class-生命周期函数";
import ClassApiT from "./class-组件通信";
import Zustand from "./zustand-基础使用";
import ZustandY from "./zustand-异步支持";
import ZustandQ from "./zustand-切片模式";

function App() {

    return (
        <>
            <UseReducer/>
            <UseMemo/>
            <MemoProps/> {/*memo-props比较机制*/}
            <Memo/> {/*memo-基础用法*/}
            <UseCallback/>{/*UseCallback*/}
            <ForwardRef/> {/*forwardRef*/}
            <UseInperativeHandle/> {/*useInperativeHandle*/}
            <ClassApi/>{/*ClassApi*/}
            <ClassApiS/>{/*ClassApi生命周期*/}
            <ClassApiT/>{/*ClassApi组件通信*/}
            <Zustand/>{/*Zustand基础使用*/}
            <ZustandY/>{/*Zustand异步支持*/}
            <ZustandQ/>{/*Zustand切片模式*/}
        </>
    )
}

export default App
