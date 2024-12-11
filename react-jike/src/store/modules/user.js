import {createSlice} from "@reduxjs/toolkit";
import {getToken, request, setToken as _setToken} from '@/utils'

const userStore = createSlice({
    name: "user",
    //数据状态
    initialState: {
        token: getToken() || ''
    },
    //修改数据的方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // 存入本地
            _setToken(state.token)
        }
    }
});

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        //调用接口
        const res = await request.post('/authorizations', loginForm);
        //存入token
        dispatch(setToken(res.data.token));
    }
}

const {setToken} = userStore.actions;

//暴露方法
const userReducer = userStore.reducer;
export {setToken, fetchLogin};
export default userReducer;
