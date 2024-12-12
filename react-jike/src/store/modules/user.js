import {createSlice} from "@reduxjs/toolkit";
import {getToken, removeToken, request, setToken as _setToken} from '@/utils'

const userStore = createSlice({
    name: "user",
    //数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    //修改数据的方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // 存入本地
            _setToken(state.token)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state){
            state.token = ''
            state.userInfo = {}
            removeToken()
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
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request('/user/profile');
        dispatch(setUserInfo(res.data));
    }
}

const {setToken, setUserInfo,clearUserInfo} = userStore.actions;

//暴露方法
const userReducer = userStore.reducer;
export {setToken, fetchLogin, fetchUserInfo,clearUserInfo};
export default userReducer;
