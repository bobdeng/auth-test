var {Then} = require('cucumber');
var {When} = require('cucumber');
var {Given} = require('cucumber');
const {expect} = require("chai");
const axios = require('axios');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function importFile(file) {
    let command = 'curl -f -F \'file=@test_data/' + file + '\' ' + getUrl('dbtool/import')
    log(command)
    const {stdout, stderr} = await exec(command)
    console.log(stdout)
}

function getUrl(url) {
    url = "http://localhost:8080/" + url
    log(url)
    return url;
}


function log(content) {
    //console.log(content)
}

Given(/^导入数据 "([^"]*)"$/, async function (name) {
    await importFile(name)
});
When(/^初始化管理员$/, async function () {
    await axios.post(getUrl("/auth/init_admin"),{
        loginName:"admin",
        password:"123456"
    })
});
Then(/^使用管理员登录成功$/, async function () {
    let resp = await axios.post(getUrl('/auth/login'),{
        loginName:"admin",
        password:"123456"
    })
    expect(resp.data.code).to.equal(0)
});
