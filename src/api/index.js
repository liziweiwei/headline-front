import request from "../utils/request/"
import pinia from "../stores/index.js";
import {useUserInfoStore} from "../stores/userInfo.js";

// 获取分类列表
export const getfindAllTypes = () => {
    return request.get("portal/findAllTypes");
};
// 分页带条件查询所有头条
export const getfindNewsPageInfo = (info) => {
    return request.post("portal/findNewsPage", info);
};

// 查看头条详情
export const getshowHeadlineDetail = (id) => {

    // 获取用户id
    const userInfoStore = useUserInfoStore(pinia)
    const uid = userInfoStore.uid
    return request({
        method: "post",
        url: "portal/showHeadlineDetail",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: `hid=${id}&uid=${uid}`
    });
};

// 查询浏览历史
export const findHistory = (info) => {
    return request.post("headline/history", info);
};

// 删除的回调
export const removeByHid = (id) => {
    return request({
        method: "post",
        url: "headline/removeByHid",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: `hid=${id}`
    })
};

// 登录
export const getLogin = (info) => {
    return request.post("user/login", info);
};
// 获取用户信息
export const getUserInfo = (info) => {
    return request.get("user/getUserInfo");
};

// 注册校验
export const registerValidateApi = (username) => {
    return request({
        method: "post",
        url: "user/checkUserName",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: `username=${username}`
    })
};

// 注册
export const registerApi = (userInfo) => {
    return request.post("user/regist", userInfo)
}
// 判断用户登录过期
export const isUserOverdue = () => {
    return request.get("user/checkLogin")
}

// 修改密码
export const editPassword = (data) => {
    return request.post("/user/editPassword", data)
}

// 修改头条回显
export const getFindHeadlineByHid = (id) => {
    return request({
        method: "post",
        url: "headline/findHeadlineByHid",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: `hid=${id}`
    });
};

// 对新闻做总结
export const getHeadlineSummary = (id) => {
    return request({
        method: "post",
        url: "ai/summary",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: `hid=${id}`
    });
}

// 对新闻做润色
export const getHeadlinePolish = (id) => {
    return request({
        method: "post",
        url: "ai/polish",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        data: `hid=${id}`
    });
}

// 点击保存修改的回调
export const saveOrAddNews = (news) => {
    return request.post("headline/update", news)
}

// 发布头条信息
export const issueNews = (news) => {
    return request.post("headline/publish", news)
}


