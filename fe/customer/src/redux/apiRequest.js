import axios from "axios";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const userLogin = {
            username: user.username,
            email: "",
            phone: "",
            password: user.password,
        };
        const res = await axios.post(
            "http://localhost:9000/general/auth/signin/",
            {
                username: user.username,
                email: "-1",
                phone: "-1",
                password: user.password,
            }
        );

        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        // console.log(error.response.data.message);
        alert(error.response.data.message);
    }
};
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(
            "http://localhost:9000/general/auth/signup/",
            {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                birthday: user.birthday,
                gender: user.gender,
                provinceId: user.provinceId,
                districtId: user.districtId,
                wardId: user.wardId,
                userStatusId: user.userStatusId,
            }
        );
        dispatch(registerSuccess(user));
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const logout = (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
        // const res = await axios.post("/login",user);
        // dispatch(registerSuccess(res.data));
        dispatch(logOutSuccess());
        navigate("/");
    } catch (error) {
        dispatch(logOutFailed());
    }
};
