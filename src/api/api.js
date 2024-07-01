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

//查询用户
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
export function SearchUser(params) {
    return service({
        mathod: 'get',
        url: '/user/search_users',
        params: {
            'keyword': params
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
    }).catch(error => {
        if (error.response.status === 405) {
            console.log('管理员无法退出企业！');
            throw error;
        }
    });
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
            "company_id": company_id
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
export function addEmployee(token, username, company_id) {
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

// 修改用户信息
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
export function SearchCompany(data) {
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/company/search_company',
        data
    })
}

// 关注用户
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

// 取消关注用户
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

// 查询是否关注用户
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

// 上传简历
export function uploadResume(data, token) {
    return service({
        method: 'put',
        url: '/user/upload_resume',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 发布动态
export function publishTweet(data, token) {
    return service({
        method: 'post',
        url: '/tweet/create_tweet',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 获取联系人列表
export function getConversation(token) {
    return service({
        method: 'get',
        url: '/user/get_conversations',
        headers: {
            'Authorization': `Token ${token}`
        }
    });
}

// 获取聊天内容
export function getMessage(token, conversation_id) {
    return service({
        method: 'get',
        url: '/user/get_messages',
        headers: {
            'Authorization': `Token ${token}`
        },
        params: {
            'conversation_id': conversation_id
        }
    });
}


// 获取公司所有岗位
export function getPositionList(company_id) {
    return service({
        method: 'get',
        url: '/position/get_position_list',
        params: {
            'company_id': company_id
        }
    });
}

// 获取岗位所有信息
export function getPosition(position_id) {
    return service({
        method: 'get',
        url: '/position/get_position',
        params: {
            'position_id': position_id
        }
    });
}

// 获取关注的企业和用户
export function getRecommendSubscribe(token) {
    const headers = {};
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    } else {
        headers['Authorization'] = '';
    }
    return service({
        method: 'get',
        url: '/recommend/recommend_subscribe',
        headers: headers
    });
}

// 获取推荐的岗位
export function getRecommendPosition(token) {
    const headers = {};
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    } else {
        headers['Authorization'] = '';
    }
    return service({
        method: 'get',
        url: '/recommend/recommend_position',
        headers: headers
    });
}

//提交简历
export function submitCV(token, position_id) {
    let data = {
        "position_id": position_id
    }
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/position/apply_position',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

// 发送消息
export function saveMessage(sender, receiver, conversation_id, content) {
    return service({
        method: 'post',
        url: '/user/save_message',
        data: {
            'sender_uname': sender,
            'receiver_uname': receiver,
            'conversation_id': conversation_id,
            'content': content
        }
    })
}

// 创建职位
export function createPost(data, token) {
    console.log(token)
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/position/create_position',
        headers: {
            'Authorization': `Token ${token}`
        },
        data
    })
}
// 创建聊天
export function createConversation(token, username) {
    return service({
        method: 'post',
        url: '/user/create_conversation',
        headers: {
            'Authorization': `Token ${token}`
        },
        data: {
            'username':username
        }
    })
}

export function getConversationById(token, conversation_id) {
    return service({
        method: 'get',
        url: '/user/get_conversation',
        headers: {
            'Authorization': `Token ${token}`
        },
        params: {
            'conversation_id': conversation_id
        }
    })
}


// 删除职位
export function deletePost(data, token) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'delete',
        url: '/position/delete_position',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

// 获取职位全部申请信息

export function getPostApply(position_id,token){
    console.log(position_id)
    return service({
        method:'get',
        url:'/position/get_pos_apy',
        params:{
            "position_id":position_id
        },
        headers: {
            'Authorization': `Token ${token}`
        }

    })
}


//判断是否是Admin
export function IsAdmin(username){
    return service({
        method: 'get',
        url: '/user/get_user',
        params: {
            'username': username
        }
    });
}

// 获取相似岗位
export function getSimilarPost(position_id) {
    return service({
        method: 'get',
        url: '/recommend/recommend_simposition',
        params:{
            'position_id':position_id
        }
    });
}

// 获取企业动态
export function getCompanyTweetList(company_id) {
    return service({
        method: 'get',
        url: '/tweet/get_company_tweet',
        params:{
            'company_id':company_id
        }
    });
}


// 动态点赞/取消点赞
export function likeTweet(data, token) {
    return service({
        method: 'post',
        url: '/tweet/switch_tweetlike',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 获取动态详细信息
export function getTweetDetail(params, token) {
    return service({
        method: 'get',
        url: '/tweet/get_tweet',
        params: {
            'tweet_id': params.tweet_id
        },
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 获取评论信息
export function getComments(params) {
    return service({
        method: 'get',
        url: '/tweet/get_comment',
        params: {
            'comment_id': params.comment_id
        }
    })
}

// 发表一级评论
export function commentTweet(data, token) {
    return service({
        method: 'post',
        url: '/tweet/comment_tweet',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 发表二级评论
export function commentComment(data, token) {
    return service({
        method: 'post',
        url: '/tweet/comment_comment',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 发表三级评论
export function commentComment2(data, token) {
    return service({
        method: 'post',
        url: '/tweet/comment_user',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

//删除动态
export function deleteTweet(data, token) {
    return service({
        method: 'post',
        url: '/tweet/delete_tweet',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

//获取个人动态列表
export function getTweetList(params,token) {
    return service({
        method: 'get',
        url: '/tweet/get_user_tweet',
        params: {
            'username': params.username
        },
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 修改职位
export function editPost(data,token){
    data = JSON.stringify(data)
    return service({
        method:'put',
        url:'/position/update_position',
        headers: {
            'Authorization': `Token ${token}`
        },
        data
    })
}



// 获取用户某一类型信息
export function getUserMessage(require_type, token) {
    return service({
        method: 'get',
        url: '/notification/get_user_notifications',
        headers: {
            'Authorization': `Token ${token}`
        },
        params: {
            'require_type': require_type
        }
    })
}

// 获取通知具体信息
export function getNotification(token, notification_id) {
    return service({
        method: 'get',
        url: '/notification/get_notification',
        headers: {
            'Authorization': `Token ${token}`
        },
        params: {
            'notification_id': notification_id
        }
    })
}

// 用户接受或拒绝offer
export function updateOffer(token, offer_id, state) {
    let data = {
        "offer_id": offer_id,
        "state": state
    }
    data = JSON.stringify(data)
    return service({
        method: 'put',
        url: '/position/update_offer',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

// 更新通知已读状态
export function updateNotification(token, notification_id, is_read) {
    return service({
        method: 'put',
        url: '/notification/update_notification',
        headers: {
            'Authorization': `Token ${token}`,
        },
        params: {
            'notification_id': notification_id,
            'is_read': is_read
        }
    })
}

// 获取用户动态
export function getUserTweet(username, token) {
    return service({
        method: 'get',
        url: '/tweet/get_user_tweet',
        params: {
            'username': username
        },
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

//上传头像
export function uploadAvatar(data, token) {
    return service({
        method: 'put',
        url: '/user/set_avatar',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

//上传logo
export function uploadLogo(data, token) {
    return service({
        method: 'put',
        url: '/company/update_logo',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 拒绝职位申请
export function refuseApply(data,token){
    data = JSON.stringify(data)
    return service({
        method:'put',
        url:'/position/refuse_application',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })

}


// 创建offer
export function createOffer(data,token){
    data = JSON.stringify(data)
    return service({
        method:'post',
        url:'/position/create_offer',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 管理员删除员工 
export function deleteStaff(data, token) {
    return service({
        method: 'post',
        url: '/company/delete_staff',
        data,
        headers: {
            'Authorization': `Token ${token}`,
        }
    })
}

export function SearchPosition(data) {
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/position/search_position',
        data
    })
}

// 转让管理员权限

export function TransAdmin(data, token){
    return service({
        method:'post',
        url:'/company/transfer_admin',
        data,
        headers: {
            'Authorization': `Token ${token}`,
        }
    })
}

// 跳过验证直接添加员工
export function addStaff(token, company_id) {
    let data = {
        'company_id': company_id
    }
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/company/add_staff',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data
    })
}

// 查询关注用户列表
export function getSubscribeUser(username) {
    return service({
        method: 'get',
        url: '/subscribe/get_subscribe_user',
        params: {
            'username': username
        }
    })
}

// 查询关注企业列表
export function getSubscribeEp(username) {
    return service({
        method: 'get',
        url: '/subscribe/get_subscribe_company',
        params: {
            'username': username
        }
    })
}
