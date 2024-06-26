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

// 员工退出企业
export function leaveCompany(token, username, company_id) {
    let data = {
        'username': username,
        'company_id': company_id
    }
    data = JSON.stringify(data)
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
export function followCompany(token, username, company_id) {
    let data = {
        'username': username,
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
export function unFollowCompany(token, username, company_id) {
    let data = {
        'username': username,
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