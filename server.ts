import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Feishu Webhook Integration
app.post("/api/notify-feishu", async (req, res) => {
  const { customerName, inputData, type } = req.body;
  const webhookUrl = process.env.FEISHU_WEBHOOK_URL;
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;

  // Optional: Save to Feishu Base if credentials are provided
  if (appId && appSecret) {
    try {
      await saveToFeishuBase(req.body);
    } catch (err) {
      console.error("Failed to save to Feishu Base:", err);
    }
  }

  // 4. Send Webhook Notification (Optional)
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

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardPayload),
      });
      
      const responseText = await response.text();
      console.log("Feishu Webhook Response:", responseText);
    } catch (error) {
      console.warn("Feishu Webhook failed (ignoring as per user request):", error);
    }
  } else {
    console.log("Feishu Webhook URL not configured, skipping notification.");
  }

  res.json({ success: true });
});

// Helper to save data to Feishu Base (Multidimensional Table)
async function saveToFeishuBase(data: any) {
  const { customerName, details, type } = data;
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;
  const baseId = process.env.FEISHU_BASE_ID;
  
  // Table IDs for each category
  const tableIds: Record<string, string> = {
    oracle: process.env.FEISHU_TABLE_ORACLE || '',
    bazi: process.env.FEISHU_TABLE_BAZI || '',
    marriage: process.env.FEISHU_TABLE_MARRIAGE || '',
    planning: process.env.FEISHU_TABLE_PLANNING || '',
  };

  const tableId = tableIds[type];
  
  console.log(`[Feishu Debug] Type: ${type}, BaseID: ${baseId?.substring(0, 5)}..., TableID: ${tableId?.substring(0, 5)}...`);

  if (!baseId || !tableId || !appId || !appSecret) {
    console.warn(`[Feishu Debug] Missing credentials for ${type}.`);
    console.log(`[Feishu Debug] Status: BaseID: ${!!baseId}, TableID: ${!!tableId}, AppID: ${!!appId}, AppSecret: ${!!appSecret}`);
    return;
  }

  console.log(`[Feishu Debug] Fetching tenant_access_token...`);

  // 1. Get Tenant Access Token
  const tokenRes = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  
  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`Feishu Auth Failed: ${tokenRes.status}. Response: ${errText}`);
  }
  
  const tokenData = await tokenRes.json();
  const { tenant_access_token } = tokenData;

  if (!tenant_access_token) {
    throw new Error(`Feishu Auth Failed: No token. Response: ${JSON.stringify(tokenData)}`);
  }

  console.log(`[Feishu Debug] Token acquired: ${tenant_access_token.substring(0, 10)}...`);

  const requestUrl = `https://open.feishu.cn/open-apis/bitable/v1/apps/${baseId}/tables/${tableId}/records`;
  console.log(`[Feishu Debug] Request URL: ${requestUrl.replace(baseId, baseId.substring(0, 5) + '...')}`);

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
      fields["就读学校/单位"] = details.currentSchool;
      fields["期望专业/行业"] = details.expectedMajor;
      fields["期望发展城市"] = details.expectedCity;
      fields["性格描述"] = details.personality;
      fields["人生目标"] = details.lifeGoals;
      fields["家庭情况"] = details.familySituation;
    }
  } catch (e) {
    console.error("[Feishu Debug] Error mapping fields:", e);
  }

  console.log("[Feishu Debug] Final fields to send:", JSON.stringify(fields));

  // 3. Insert Record
  const insertRes = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${baseId}/tables/${tableId}/records`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${tenant_access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  const responseData = await insertRes.json();
  if (!insertRes.ok) {
    throw new Error(`Feishu Insert Failed: ${insertRes.status}. Details: ${JSON.stringify(responseData)}`);
  }

  console.log(`[Feishu Debug] Successfully saved ${type} record.`);
}

// Static files for production
const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
