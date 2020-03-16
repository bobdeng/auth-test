Feature: 初始化管理员

  Scenario: 系统初期初始化管理员
    Given 导入数据 "empty_user.xls"
    When 初始化管理员
    Then 使用管理员登录成功
