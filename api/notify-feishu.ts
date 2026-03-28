import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customerName, inputData, type, details } = req.body;
  console.log(`[API] Received ${type} request for ${customerName}`);

  const webhookUrl = process.env.FEISHU_WEBHOOK_URL;
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;

  try {
    // 1. Save to Feishu Base if credentials are provided
    await saveToFeishuBase(req.body);
    
    // 2. Send Webhook Notification (Optional)
    if (webhookUrl) {
      try {
        const cardPayload = {
          msg_type: "interactive",
          card: {
            config: { wide_screen_mode: true },
            header: {
              title: {
                tag: "plain_text",
                content: type === 'payment' ? '💰 收到打赏意向' : `🔮 新订单: ${
                  type === 'oracle' ? '三数占卜' : 
                  type === 'bazi' ? '八字排盘' : 
                  type === 'marriage' ? '夫妻合婚' : '人生规划'
                }`,
              },
              template: type === 'payment' ? 'orange' : 'gold',
            },
            elements: [
              {
                tag: "div",
                text: {
                  tag: "lark_md",
                  content: type === 'payment' 
                    ? `**支付方式:** ${customerName}\n**状态:** 用户已点击支付二维码，请留意到账。`
                    : `**客户姓名:** ${customerName}\n**详细数据:**\n${inputData}`,
                },
              },
              {
                tag: "action",
                actions: [
                  {
                    tag: "button",
                    text: { tag: "plain_text", content: "进入管理后台" },
                    type: "primary",
                    url: "https://bz49.estt.online/admin",
                  },
                ],
              },
            ],
          },
        };

        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cardPayload),
        });
      } catch (error) {
        console.warn("Feishu Webhook failed:", error);
      }
    }

    return res.json({ success: true });
  } catch (error: any) {
    console.error("[API Error]", error.message);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

// Helper to save data to Feishu Base (Multidimensional Table)
async function saveToFeishuBase(data: any) {
  const { customerName, details, type } = data;
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;
  const baseId = process.env.FEISHU_BASE_ID;
  
  const tableIds: Record<string, string> = {
    oracle: process.env.FEISHU_TABLE_ORACLE || '',
    bazi: process.env.FEISHU_TABLE_BAZI || '',
    marriage: process.env.FEISHU_TABLE_MARRIAGE || '',
    planning: process.env.FEISHU_TABLE_PLANNING || '',
  };

  const tableId = tableIds[type];
  
  console.log(`[Feishu Debug] Type: ${type}, TableID: ${tableId ? 'Found' : 'NOT FOUND'}`);

  if (!baseId || !tableId || !appId || !appSecret) {
    const missing = [];
    if (!baseId) missing.push('FEISHU_BASE_ID');
    if (!tableId) missing.push(`FEISHU_TABLE_${type.toUpperCase()}`);
    if (!appId) missing.push('FEISHU_APP_ID');
    if (!appSecret) missing.push('FEISHU_APP_SECRET');
    
    const msg = `Missing credentials for ${type}: ${missing.join(', ')}`;
    console.warn(`[Feishu Debug] ${msg}`);
    throw new Error(msg);
  }

  // 1. Get Tenant Access Token
  console.log(`[Feishu Debug] Fetching token for AppID: ${appId}`);
  const tokenRes = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  
  const tokenData = await tokenRes.json() as any;
  console.log(`[Feishu Debug] Token Response Code: ${tokenData.code}, Msg: ${tokenData.msg}`);
  const { tenant_access_token } = tokenData;

  if (!tenant_access_token) {
    const msg = "Failed to get tenant_access_token from Feishu.";
    console.error(`[Feishu Debug] ${msg}`);
    throw new Error(msg);
  }

  // 2. Map fields based on type
  let fields: any = {
    "提交时间": Date.now(),
    "状态": "待处理"
  };

  try {
    if (type === 'bazi') {
      fields["客户姓名"] = customerName;
      fields["性别"] = details.gender === 'male' ? '乾 (男)' : '坤 (女)';
      const birthDateTs = new Date(details.birthDate).getTime();
      if (!isNaN(birthDateTs)) fields["出生日期"] = birthDateTs;
      fields["出生时间"] = details.birthTime;
      fields["出生城市"] = details.city;
      fields["诉求内容"] = details.intent;
    } else if (type === 'oracle') {
      fields["客户姓名"] = customerName;
      fields["诉求内容"] = details.intent;
      fields["占卜数字"] = details.numbers?.join(', ');
    } else if (type === 'marriage') {
      fields["男方姓名"] = details.maleName;
      const maleBirthTs = new Date(details.maleBirthDate).getTime();
      if (!isNaN(maleBirthTs)) fields["男方生日"] = maleBirthTs;
      fields["男方时间"] = details.maleBirthTime;
      fields["男方城市"] = details.maleCity;
      fields["女方姓名"] = details.femaleName;
      const femaleBirthTs = new Date(details.femaleBirthDate).getTime();
      if (!isNaN(femaleBirthTs)) fields["女方生日"] = femaleBirthTs;
      fields["女方时间"] = details.femaleBirthTime;
      fields["女方城市"] = details.femaleCity;
      fields["合婚诉求"] = details.intent;
    } else if (type === 'planning') {
      fields["客户姓名"] = customerName;
      fields["性别"] = details.gender === 'male' ? '乾 (男)' : '坤 (女)';
      const birthDateTs = new Date(details.birthDate).getTime();
      if (!isNaN(birthDateTs)) fields["出生日期"] = birthDateTs;
      fields["出生时间"] = details.birthTime;
      fields["手机号码"] = details.phone;
      fields["目前城市"] = details.city;
      fields["当前身份"] = details.status === 'student' ? '在校生' : '社会人士';
      fields["就读学校"] = details.currentSchool;
      fields["期望专业"] = details.expectedMajor;
      fields["期望城市"] = details.expectedCity;
      fields["性格描述"] = details.personality;
      fields["人生目标"] = details.lifeGoals;
      fields["家庭情况"] = details.familySituation;
    }
  } catch (e) {
    console.error("[Feishu Debug] Error mapping fields:", e);
  }

  // 3. Insert Record
  console.log(`[Feishu Debug] Inserting record into Table: ${tableId}`);
  
  let currentFields = { ...fields };
  let success = false;
  let finalResponse: any = null;
  let attempts = 0;
  const maxAttempts = 15; // Prevent infinite loops

  while (!success && attempts < maxAttempts) {
    attempts++;
    const insertRes = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${baseId}/tables/${tableId}/records`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${tenant_access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: currentFields }),
    });

    const resData = await insertRes.json() as any;

    if (insertRes.ok && resData.code === 0) {
      success = true;
      finalResponse = resData;
      console.log(`[Feishu Debug] Successfully saved ${type} record on attempt ${attempts}.`);
    } else {
      // Check for FieldNameNotFound (code 1254045)
      if (resData.code === 1254045 && resData.error?.message) {
        const match = resData.error.message.match(/fields\.([^']+)/);
        const faultyField = (match && match[1]) || "";
        
        if (faultyField && currentFields[faultyField] !== undefined) {
          console.warn(`[Feishu Debug] Field "${faultyField}" not found. Removing and retrying...`);
          delete currentFields[faultyField];
          continue; // Try again with one less field
        }
      }
      
      // If it's another error or we couldn't identify the field, throw
      const msg = `Feishu Insert Failed: ${resData.msg || JSON.stringify(resData)}`;
      console.error(`[Feishu Debug] ${msg}`);
      throw new Error(msg);
    }
  }

  if (success && finalResponse) {
    console.log(`[Feishu Debug] Full Response:`, JSON.stringify(finalResponse));
    console.log(`[Feishu Debug] Record ID: ${finalResponse.data?.record?.record_id || finalResponse.data?.record_id || 'Unknown'}`);
  }
}
