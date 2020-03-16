Feature: 修改密码
  Scenario: 修改密码并成功
    Given 导入数据 "user_bobdeng.xls"
    When 修改密码
    Then 用户新密码登录成功
