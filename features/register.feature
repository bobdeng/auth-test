Feature: 用户注册并登录
  Scenario: 注册并登录成功
    Given 导入数据 "empty_user.xls"
    When 注册用户
    Then 用户登录成功
