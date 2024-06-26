import service from "./service";
//登录
export function Login(data) {
    return service({
        method: 'post',
        url: '/user/login',
        data
    })
}
//注册
export function Register(data) {
    return service({
        method: 'post',
        url: '/user/register',
        data
    })
}
//发送验证码
export function SendCode(params) {
    return service({
        method: 'post',
        url: '/user/verification',
        params: {
            'email': params.email
        }
    })
}

export function GetUserInfo(params, token) {
    return service({
        method: 'get',
        url: '/user/get_user',
        params: {
            'username': params
        },
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

export function UpdateUserInfo(data, token) {
    return service({
        method: 'post',
        url: '/user/update_user',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}
