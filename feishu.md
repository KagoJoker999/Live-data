# 飞书API配置信息

## 应用凭证
ID: cli_a7f5f4dd28ff5013
SECRET: HmhpNW5GenirT6oFIOe3DdjgcJS50Dwb

## 多维表格信息
Base ID (多维表格ID): HVnlblCt9aXkI7spOv8cK5wenEe
Table ID (表格ID): tbl8vDt0B9mYLpRH

# API集成经验总结

## 字段映射规则
1. 使用字段名称而不是字段ID进行映射，例如：
   - 千次 (而不是 fldI6ohnoZ)
   - 进入率 (而不是 fldJMCaBG8)
   - 成交粉丝占比 (而不是 fldTDQPFLg)
   - 日志 (而不是 fldNugSS5Y)
   - 开播日期 (而不是 fldFPIkE8H)

## 数据格式要求
1. 数值字段 (type: 2)
   - 直接传入数字类型
   - 示例: fields['千次'] = 100

2. 文本字段 (type: 1)
   - 直接传入字符串
   - 示例: fields['日志'] = '日志内容'

3. 日期字段 (type: 5)
   - 必须使用Unix时间戳（秒级）
   - 示例: fields['开播日期'] = 1736352000

## 请求体格式
```json
{
  "fields": {
    "字段名1": 值1,
    "字段名2": 值2
  }
}
```

## 常见错误处理
1. FieldNameNotFound
   - 原因：使用了字段ID而不是字段名称
   - 解决：使用字段的显示名称

2. DatetimeFieldConvFail
   - 原因：日期格式不正确
   - 解决：使用Unix时间戳（秒级）

## API调用流程
1. 获取访问令牌 (tenant_access_token)
2. 查找今日记录
3. 如果存在今日记录则更新，否则创建新记录

## 注意事项
1. 所有请求都需要包含正确的Authorization头
2. Content-Type应该设置为application/json
3. 日期字段必须使用Unix时间戳
4. 字段映射要使用显示名称而不是字段ID
5. 数值字段需要确保传入数字类型而不是字符串




字段名: 开播日期, ID: fldFPIkE8H, 类型: 5
字段名: 是否为大促, ID: fldwWI75a4, 类型: 2
字段名: 是否为节假日, ID: fld9im0ysK, 类型: 2
字段名: 自觉流量如何, ID: fld6mezSeK, 类型: 1
字段名: S单金额, ID: fldx3Jf59Y, 类型: 2
字段名: 实际成交额, ID: fldLPKVfNs, 类型: 20
字段名: 千次, ID: fldI6ohnoZ, 类型: 2
字段名: 直播推荐千次, ID: fldLmPa6sI, 类型: 2
字段名: 千川PC千次, ID: fldkkl7kwj, 类型: 2
字段名: 随心推千次, ID: fldbgu95TM, 类型: 2
字段名: 直播间曝光次数（万）, ID: fld0MPy656, 类型: 2
字段名: 下播5分钟进线数量, ID: fldTzf2irJ, 类型: 2
字段名: 在线峰值人数, ID: fldk9leqVT, 类型: 2
字段名: 直播推荐的下播5分钟进线数量, ID: fldoGtBLmr, 类型: 2
字段名: 进入率, ID: fldJMCaBG8, 类型: 2
字段名: 互动率, ID: fld7KhLQXh, 类型: 2
字段名: 加粉率, ID: fld7LqoWNf, 类型: 2
字段名: 开播时间, ID: fld2RtG64x, 类型: 2
字段名: 开播时长, ID: fldE0CMpTo, 类型: 2
字段名: 周几, ID: fldXOxnFcB, 类型: 20
字段名: 直播间观看人数, ID: fldCdxh1rU, 类型: 2
字段名: 直播间观看人次, ID: fldsOa0Tl0, 类型: 2
字段名: 最高在线人数, ID: flda2ppMVO, 类型: 2
字段名: 平均在线人数, ID: fldkyCQXUN, 类型: 2
字段名: 人均观看时长, ID: fldd9Vzczj, 类型: 2
字段名: 评论次数, ID: fldAeJBOos, 类型: 2
字段名: 新增粉丝数, ID: fldAlX7esP, 类型: 2
字段名: 上一场新增粉丝数, ID: fldMrWjnxJ, 类型: 2
字段名: 看播粉丝占比, ID: fldQfrVHyq, 类型: 2
字段名: 成交粉丝占比, ID: fldTDQPFLg, 类型: 2
字段名: 直播间成交金额, ID: fld9ssqku7, 类型: 2
字段名: 直播间成交件数, ID: fldkZ5gt0i, 类型: 2
字段名: 直播间成交人数, ID: fldKxDsnDf, 类型: 2
字段名: 商品点击率(次数), ID: fldk28OVIU, 类型: 2
字段名: 点击成交转化率(次数), ID: fldVyhVxGx, 类型: 2
字段名: 成交件单价, ID: fld2hgX6Vg, 类型: 2
字段名: 看播成交转化率(次数), ID: flduZklbR2, 类型: 2
字段名: 看播成交转化率(人数), ID: fld1THpnGX, 类型: 2
字段名: 日志, ID: fldNugSS5Y, 类型: 1