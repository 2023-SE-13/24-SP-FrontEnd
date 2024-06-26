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


// 搜索用户
export function SearchUser(params){
    return service({
        mathod:'get',
        url:'/user/search_users',
        params:{
            'keyword':params
        }
    })
}
// 员工退出企业
export function leaveCompany(token, params) {
    return service({
        method: 'post',
        url: '/company/leave_company',
        headers: {
            'Authorization': `Token ${token}`,
        },
        params: {
            'user_id': params.user_id,
            'company_id': params.company_id
        }
    })
}

// 员工关注企业
export function followCompany(token, username, company_id) {
    return service({
        method: 'post',
        url: '/subscribe/subscribe_company',
        headers: {
            'Authorization': `Token ${token}`,
        },
        data: {
            'username': username,
            'company_id': company_id
        }
    })
}

// 企业注册
export function registCompany(token, company_name, company_description) {
    return service({
        method: 'put',
        url: '/company/create_company',
        headers: {
            'Authorization': `Token ${token}`,
        },
        data: {
            company_name,
            company_description
        }
    })
}
