const SQL = [
  "add column oncall_enable_guide tinyint(1) DEFAULT '0' COMMENT '是否开启欢迎语'",
  "add column oncall_guide varchar(2048) DEFAULT '' COMMENT 'oncall 欢迎语'",
  "add column oncall_enable_suggest_qs tinyint(1) DEFAULT '0' COMMENT '是否开启推荐问题'",
  "add column oncall_enable_suggest_catalog tinyint(1) DEFAULT '0' COMMENT '是否开启推荐分类'",
  "add column oncall_enable_satisfaction tinyint(1) DEFAULT '0' COMMENT '是否开启满意度'",
  "add column oncall_session_timeout int(11) DEFAULT '60' COMMENT '会话停留时长'",
  "add column oncall_answer_type tinyint(1) DEFAULT '1' COMMENT '机器人回答方式，1 群内回答，2 转私聊回答'",
  "add column oncall_manual_type tinyint(1) DEFAULT '1' COMMENT '无答案转人工范式，1 手动触发，2自动转人工'",
  "add column oncall_qs_suggest_type tinyint(1) DEFAULT '1' COMMENT '推荐问题类型，1 自动推荐，2手动设置'",
  "add column oncall_enable_qs_completion tinyint(1) DEFAULT '0' COMMENT '手动设置时，不够10条是否自动补全到10条'",
  "add column web_enable_guide tinyint(1) DEFAULT '0' COMMENT '是否开启欢迎语'",
  "add column web_guide varchar(2048) DEFAULT '' COMMENT 'oncall 欢迎语'",
  "add column web_enable_suggest_qs tinyint(1) DEFAULT '0' COMMENT '是否开启推荐问题'",
  "add column web_enable_suggest_catalog tinyint(1) DEFAULT '0' COMMENT '是否开启推荐分类'",
  "add column web_enable_satisfaction tinyint(1) DEFAULT '0' COMMENT '是否开启满意度'",
  "add column web_session_timeout int(11) DEFAULT '60' COMMENT '会话停留时长'",
  "add column web_qs_suggest_type tinyint(1) DEFAULT '1' COMMENT '推荐问题类型，1 自动推荐，2手动设置'",
  "add column web_enable_qs_completion tinyint(1) DEFAULT '0' COMMENT '手动设置时，不够10条是否自动补全到10条'",
  "add column web_enable_advanced tinyint(1) DEFAULT '0' COMMENT '是否开启推荐问题的高级配置'"
]

// console.log(SQL.split('\n'))
const map = new Map()
map.set('tinyint(1)', 'BooleanField')
map.set('varchar(2048)', 'CharField')
map.set('int(11)', 'IntegerField')

const res = SQL.map(sql => sql.replace(/^add column /, ''))
  .map(sql => sql.split(' '))
  .map(arr => ({
    name: arr[0],
    type: map.get(arr[1]),
    default: arr[3],
    verbose_name: arr[5]
  }))
// console.log(res)
// models.IntegerField(null=False, default=60, verbose_name=u'会话停留时长')

const m = res
  .map(item => {
    return `'${item.name}'`
    // return `${item.name} = models.${item.type}(null=False, default=${item.default}, verbose_name=u${item.verbose_name})`
  })
  .join(', ')

console.log(m)
