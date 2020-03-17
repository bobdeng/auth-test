const {Then} = require('cucumber');
const {When} = require('cucumber');
const {Given} = require('cucumber');
const {expect} = require("chai");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function importFile(file) {
    const formData = new FormData();
    formData.append("file", fs.createReadStream('./test_data/' + file));
    await axios.post(getUrl('/dbtool/import'), formData, {
        headers: formData.getHeaders()
    })
}

function getUrl(url) {
    url = "http://localhost:8080/" + url;
    log(url);
    return url;
}


function log(content) {
    //console.log(content)
}

Given(/^导入数据 "([^"]*)"$/, async function (name) {
    await importFile(name)
});
When(/^初始化管理员$/, async function () {
    await axios.post(getUrl("/auth/init_admin"), {
        loginName: "admin",
        password: "123456"
    });
});
Then(/^使用管理员登录成功$/, async function () {
    let resp = await axios.post(getUrl('/auth/login'), {
        loginName: "admin",
        password: "123456"
    });
    expect(resp.data.code).to.equal(0);
});
Then(/^使用管理员登录失败$/, async function () {
    let resp = await axios.post(getUrl('/auth/login'), {
        loginName: "admin",
        password: "123456"
    });
    expect(resp.data.code).to.not.equal(0);
});
When(/^注册用户$/, async function () {
    await axios.post(getUrl("/auth/register"), {
        loginName: "bobdeng",
        password: "123456",
        mobile: "18657124116",
        name: "dzg"
    });
});
Then(/^用户登录成功$/, async function () {
    let resp = await axios.post(getUrl('/auth/login'), {
        loginName: "bobdeng",
        password: "123456"
    });
    expect(resp.data.code).to.equal(0);
});
When(/^修改密码$/, async function () {
    await axios.post(getUrl('/profile/change_password'), {
        oldPassword: "123456",
        newPassword: "123455"
    }, {
        headers: {
            'Identity': '123'
        }
    });
});
Then(/^用户新密码登录成功$/, async function () {
    let resp = await axios.post(getUrl('/auth/login'), {
        loginName: "bobdeng",
        password: "123455"
    });
    expect(resp.data.code).to.equal(0);
});
