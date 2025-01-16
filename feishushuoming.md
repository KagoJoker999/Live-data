# 飞书API使用说明

## 完整实现步骤

### 1. 创建必要文件
首先需要创建以下文件：
```
project/
  ├── manifest.json      // Chrome扩展配置文件
  ├── popup.html         // 用户界面
  ├── popup.js          // 界面交互逻辑
  ├── feishu_api.js     // 飞书API实现
  └── feishushuoming.md  // 本说明文档
```

### 2. manifest.json 配置
```json
{
  "manifest_version": 3,
  "name": "飞书写入工具",
  "version": "1.0",
  "permissions": [
    "storage"
  ],
  "host_permissions": [
    "https://open.feishu.cn/*"
  ],
  "action": {
    "default_popup": "popup.html"
  }
}
```

### 3. feishu_api.js 实现
```javascript
// 基础配置
const APP_ID = 'cli_a7f5f4dd28ff5013';
const APP_SECRET = 'HmhpNW5GenirT6oFIOe3DdjgcJS50Dwb';
const BASE_ID = 'HVnlblCt9aXkI7spOv8cK5wenEe';
const TABLE_ID = 'tbl8vDt0B9mYLpRH';

// 获取访问令牌
async function getTenantAccessToken() {
  try {
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'app_id': APP_ID,
        'app_secret': APP_SECRET
      })
    });

    const data = await response.json();
    if (data.code === 0) {
      return data.tenant_access_token;
    } else {
      throw new Error(`获取访问令牌失败: ${data.msg}`);
    }
  } catch (error) {
    console.error('获取访问令牌错误:', error);
    throw error;
  }
}

// 获取今天的时间戳
function getTodayTimestamp() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
}

// 查找今天的记录
async function findTodayRecord(token) {
  try {
    const todayStart = getTodayTimestamp();
    const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.code === 0) {
      return data.data.items.find(item => {
        const recordDate = item.fields['开播日期'];
        return recordDate === todayStart;
      });
    }
    return null;
  } catch (error) {
    console.error('查找今日记录错误:', error);
    throw error;
  }
}

// 创建新记录
async function createRecord(token, fields) {
  try {
    const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records`;
    
    const requestBody = {
      fields: {
        ...fields,
        '开播日期': getTodayTimestamp()
      }
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    return data.code === 0;
  } catch (error) {
    console.error('创建记录错误:', error);
    throw error;
  }
}

// 更新记录
async function updateRecord(token, recordId, fields) {
  try {
    const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records/${recordId}`;
    
    const requestBody = {
      fields: {
        ...fields,
        '开播日期': getTodayTimestamp()
      }
    };
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    return data.code === 0;
  } catch (error) {
    console.error('更新记录错误:', error);
    throw error;
  }
}

// 写入数据到飞书表格
export async function writeToFeishuTable(data) {
  try {
    const token = await getTenantAccessToken();
    
    const fields = {
      '是否为大促': data.isPromotion ? 1 : 0,
      '是否为节假日': data.isHoliday ? 1 : 0,
      'S单金额': data.sAmount ? parseFloat(data.sAmount) : null,
      '自觉流量如何': data.trafficStatus || '',
      '日志': data.diary || ''
    };

    const todayRecord = await findTodayRecord(token);
    
    if (todayRecord) {
      return await updateRecord(token, todayRecord.record_id, fields);
    } else {
      return await createRecord(token, fields);
    }
  } catch (error) {
    console.error('写入飞书表格错误:', error);
    throw error;
  }
}

// 测试连接
export async function testFeishuConnection() {
  try {
    const token = await getTenantAccessToken();
    return !!token;
  } catch (error) {
    console.error('测试飞书连接错误:', error);
    return false;
  }
}
```

### 4. popup.html 实现
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    /* 添加你的样式 */
  </style>
</head>
<body>
  <div class="form-group">
    <label>是否为大促</label>
    <select id="isPromotion">
      <option value="0">否</option>
      <option value="1">是</option>
    </select>
  </div>
  <div class="form-group">
    <label>是否为节假日</label>
    <select id="isHoliday">
      <option value="0">否</option>
      <option value="1">是</option>
    </select>
  </div>
  <div class="form-group">
    <label>S单金额</label>
    <input type="number" id="sAmount" step="0.01">
  </div>
  <div class="form-group">
    <label>自觉流量如何</label>
    <select id="trafficStatus">
      <option value="">请选择</option>
      <option value="好">好</option>
      <option value="一般">一般</option>
      <option value="差">差</option>
    </select>
  </div>
  <div class="form-group">
    <label>日志内容</label>
    <textarea id="diaryContent"></textarea>
  </div>
  <button id="sendToFeishu">发送到飞书</button>
  <div id="sendStatus" style="display: none;">
    <span class="message"></span>
  </div>
  <script type="module" src="popup.js"></script>
</body>
</html>
```

### 5. popup.js 实现
```javascript
import { writeToFeishuTable, testFeishuConnection } from './feishu_api.js';

document.addEventListener('DOMContentLoaded', async function() {
  const isPromotionSelect = document.getElementById('isPromotion');
  const isHolidaySelect = document.getElementById('isHoliday');
  const sAmountInput = document.getElementById('sAmount');
  const trafficStatusSelect = document.getElementById('trafficStatus');
  const diaryContent = document.getElementById('diaryContent');
  const sendToFeishu = document.getElementById('sendToFeishu');
  const sendStatus = document.getElementById('sendStatus');
  const statusMessage = sendStatus.querySelector('.message');

  // 测试连接
  const isConnected = await testFeishuConnection();
  if (!isConnected) {
    alert('飞书API连接失败，请检查网络和配置');
    return;
  }

  // 发送按钮点击事件
  sendToFeishu.addEventListener('click', async function() {
    try {
      sendToFeishu.disabled = true;
      
      const data = {
        isPromotion: parseInt(isPromotionSelect.value),
        isHoliday: parseInt(isHolidaySelect.value),
        sAmount: sAmountInput.value,
        trafficStatus: trafficStatusSelect.value,
        diary: diaryContent.value.trim()
      };

      if (!data.diary) {
        throw new Error('请输入日志内容');
      }

      const success = await writeToFeishuTable(data);

      if (success) {
        statusMessage.textContent = '发送成功';
        sendStatus.style.display = 'block';
        
        // 清空表单
        isPromotionSelect.value = '0';
        isHolidaySelect.value = '0';
        sAmountInput.value = '';
        trafficStatusSelect.value = '';
        diaryContent.value = '';

        setTimeout(() => {
          sendStatus.style.display = 'none';
        }, 3000);
      } else {
        throw new Error('发送失败');
      }
    } catch (error) {
      statusMessage.textContent = `发送失败: ${error.message}`;
      sendStatus.style.display = 'block';
      console.error('发送到飞书失败:', error);
    } finally {
      sendToFeishu.disabled = false;
    }
  });
});
```

## 使用方法
1. 创建一个新的目录，将上述所有文件复制到该目录中
2. 在Chrome浏览器中打开扩展管理页面（chrome://extensions/）
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"，选择你的目录
5. 点击扩展图标，填写数据并点击"发送到飞书"按钮

## 注意事项
1. 确保所有文件使用UTF-8编码保存
2. 检查网络连接是否正常
3. 确保飞书API的配置信息（APP_ID等）正确
4. 如遇到跨域问题，检查manifest.json中的权限配置
5. 如遇到模块导入问题，确保使用了type="module"

## 常见问题排查
1. 连接失败：
   - 检查网络连接
   - 验证APP_ID和APP_SECRET是否正确
   - 查看控制台错误信息

2. 写入失败：
   - 检查必填字段是否已填写
   - 验证数据格式是否正确
   - 查看API返回的具体错误信息

3. 跨域问题：
   - 检查manifest.json中的host_permissions
   - 确认飞书API域名已添加到允许列表

4. 模块导入错误：
   - 确认使用了type="module"
   - 检查文件路径是否正确
   - 验证import/export语法 