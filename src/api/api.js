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

export function GetUserInfo(params) {
    return service({
        method: 'get',
        url: '/user/get_user',
        params: {
            'username': params
        }
    })
}


//忘记密码
export function ForgetPassword(data) {
    return service({
        method: 'put',
        url: '/user/forget_password',
        data
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
export function leaveCompany(token, username, company_id) {
    let data = {
        "username": username,
        "company_id": company_id
    }

    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/company/leave_company',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

// 员工关注企业
export function followCompany(token, company_id) {
    let data = {
        'company_id': company_id
    }
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/subscribe/subscribe_company',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

// 员工取消关注企业
export function unFollowCompany(token, company_id) {
    let data = {
        'company_id': company_id
    }
    data = JSON.stringify(data)
    return service({
        method: 'delete',
        url: '/subscribe/unsubscribe_company',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

//查询用户是否关注企业
export function isFollowCompany(token, company_id) {
    let data = {
        "company_id": company_id
    }
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/subscribe/do_subscribed_company',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

//查询是否为该企业员工
export function isStaff(token, company_id) {
    let data = {
        "company_id": company_id
    }
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/company/is_staff',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

//查询企业信息
export function getCompany(company_id) {
    return service({
        method: 'get',
        url: '/company/get_company',
        params: {
            "company_id":company_id
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

// 添加企业员工
export function addEmployee(token, username, company_id){
    return service({
        method: 'post',
        url: '/company/send_join_verification',
        headers: {
            'Authorization': `Token ${token}`,
        },
        data: {
            username,
            company_id
        }
    })
}

// 员工是否收到企业邀请
export function haveJoinCompany(token, company_id) {
    let data = {
        "company_id": company_id
    }
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/company/is_to_join',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

// 员工验证加入企业
export function joinCompany(token, company_id) {
    let data = {
        "company_id": company_id
    }
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/company/accept_join_verification',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

// 获取企业员工
export function getCompanyEmployee(company_id) {
    return service({
        method: 'get',
        url: '/company/get_staff',
        params: {
            'company_id': company_id
        }
    });
}

export function UpdateUserInfo(data, token) {
    return service({
        method: 'put',
        url: '/user/update_user',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 搜索企业
export function SearchCompany(data){
    data = JSON.stringify(data)
    return service({
        method:'post',
        url:'/company/search_company',
        data
    })
}

export function SubscribeUser(data, token) {
    return service({
        method: 'post',
        url: '/subscribe/subscribe_user',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

export function UnSubscribeUser(data, token) {
    return service({
        method: 'delete',
        url: '/subscribe/unsubscribe_user',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

export function DoSubscribeUser(data, token) {
    return service({
        method: 'post',
        url: '/subscribe/do_subscribed_user',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 获取员工
export function getUser(username) {
    return service({
        method: 'get',
        url: '/user/get_user',
        params: {
            'username': username
        }
    });
}
