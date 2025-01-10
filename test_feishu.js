// 飞书API测试脚本
import { getTenantAccessToken } from './feishu_api.js';

const BASE_ID = 'HVnlblCt9aXkI7spOv8cK5wenEe';
const TABLE_ID = 'tbl8vDt0B9mYLpRH';

async function testFeishuFields() {
    try {
        // 获取访问令牌
        const token = await getTenantAccessToken();
        console.log('获取访问令牌成功:', token);

        // 获取表格元数据
        const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/fields`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.code === 0) {
            console.log('\n字段列表:');
            data.data.items.forEach(field => {
                console.log(`字段名: ${field.field_name}, ID: ${field.field_id}, 类型: ${field.type}`);
            });
        } else {
            console.error('获取字段列表失败:', data.msg);
        }
    } catch (error) {
        console.error('测试过程出错:', error);
    }
}

// 运行测试
testFeishuFields(); 