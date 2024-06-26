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
        'company_id': company_id
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

// 查询企业信息
export function getCompany(company_id) {
    console.log("调用 getCompany，company_id:", company_id);
    if (!company_id) {
        console.log("缺少 company_id 参数", company_id);
    }
    return service({
        method: 'get',
        url: '/company/get_company',
        params: {
            'company_id': company_id
        }
    });
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