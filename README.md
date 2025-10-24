# TVBox番茄短剧源

这是一个适用于TVBox的番茄短剧源配置。

## 使用方法

1. 在TVBox应用中添加订阅链接
2. 选择"番茄短剧[js]"源
3. 享受短剧内容

## 文件说明

- `tvbox_fanqie_duanju_v2.json` - TVBox主配置文件
- `tvbox_fanqie_duanju_v3.json` - 更兼容的TVBox配置文件（推荐）
- `js/番茄短剧.js` - 番茄短剧的JS源文件（已更新为函数格式）

## 订阅链接

### 推荐链接（已修复）
```
https://raw.githubusercontent.com/MYTPONS/tvbox-fanqie-duanju-source/main/tvbox_fanqie_duanju_v3.json
```

### 备用链接
```
https://cdn.jsdelivr.net/gh/MYTPONS/tvbox-fanqie-duanju-source@main/tvbox_fanqie_duanju_v3.json
```

## 更新日志

### v3.0
- 修复了"无数据"问题
- 更新JS源为函数格式，提高兼容性
- 修正了URL路径和数据处理逻辑
- 添加了错误检查和数据验证

### v2.0
- 初始版本发布
- 基本TVBox配置和JS源文件

## 注意事项

- 确保TVBox支持JS源（需要drpy2.min.js库）
- 如果遇到问题，请检查网络连接和API可用性
- 推荐使用v3版本的配置文件，已修复已知问题