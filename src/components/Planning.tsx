import React, { useState } from 'react';
import { motion } from 'motion/react';

export const Planning: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthDate: '',
    birthTime: '',
    phone: '',
    city: '',
    status: 'student', // student or social
    currentSchool: '',
    expectedMajor: '',
    expectedCity: '',
    personality: '',
    lifeGoals: '',
    familySituation: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Notify Feishu
    fetch('/api/notify-feishu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: formData.name,
        details: formData,
        inputData: `
性别: ${formData.gender === 'male' ? '乾' : '坤'}
出生: ${formData.birthDate} ${formData.birthTime}
手机: ${formData.phone}
城市: ${formData.city}
身份: ${formData.status === 'student' ? '在校生' : '社会人士'}
就读学校: ${formData.currentSchool}
期望专业: ${formData.expectedMajor}
期望城市: ${formData.expectedCity}
性格描述: ${formData.personality}
人生目标: ${formData.lifeGoals}
家庭情况: ${formData.familySituation}
        `.trim(),
        type: 'planning'
      })
    }).then(async res => {
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to notify Feishu:", res.status, errorData.error);
        alert(`提交失败: ${errorData.error || '未知错误'}`);
        setSubmitted(false);
      }
    }).catch(err => {
      console.error("Error notifying Feishu:", err);
      alert("提交出错，请检查网络或稍后再试。");
      setSubmitted(false);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="gold-text text-5xl mb-4">人生规划</h1>
        <p className="text-gold/60 tracking-widest uppercase text-sm">Life Planning & Career Path</p>
      </div>

      {!submitted ? (
        <div className="dark-luxury-card max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">姓名 Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none" />
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">性别 Gender</label>
                <div className="flex gap-4">
                  {['male', 'female'].map((g) => (
                    <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g as any })} className={`flex-1 py-3 rounded-lg border transition-all ${formData.gender === g ? 'border-gold bg-gold/10 text-gold' : 'border-gold/20 text-gold/40'}`}>
                      {g === 'male' ? '乾 (男)' : '坤 (女)'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生日期 (公历)</label>
                <input required type="date" value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none" />
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生时间 Time</label>
                <input required type="time" value={formData.birthTime} onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none" />
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">手机号码 Phone</label>
                <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none" />
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">目前城市 City</label>
                <input required type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">当前身份 Status</label>
              <div className="flex gap-4">
                {['student', 'social'].map((s) => (
                  <button key={s} type="button" onClick={() => setFormData({ ...formData, status: s as any })} className={`flex-1 py-3 rounded-lg border transition-all ${formData.status === s ? 'border-gold bg-gold/10 text-gold' : 'border-gold/20 text-gold/40'}`}>
                    {s === 'student' ? '在校生' : '社会人士'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">就读学校/单位 School/Work</label>
                <input type="text" value={formData.currentSchool} onChange={(e) => setFormData({ ...formData, currentSchool: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none" />
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">期望专业/行业 Major/Industry</label>
                <input type="text" value={formData.expectedMajor} onChange={(e) => setFormData({ ...formData, expectedMajor: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none" />
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">期望发展城市 Target City</label>
                <input type="text" value={formData.expectedCity} onChange={(e) => setFormData({ ...formData, expectedCity: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">性格描述 Personality</label>
                <textarea value={formData.personality} onChange={(e) => setFormData({ ...formData, personality: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none h-20 resize-none" />
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">人生目标 Life Goals</label>
                <textarea value={formData.lifeGoals} onChange={(e) => setFormData({ ...formData, lifeGoals: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none h-20 resize-none" />
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">家庭情况 Family Situation</label>
                <textarea value={formData.familySituation} onChange={(e) => setFormData({ ...formData, familySituation: e.target.value })} className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none h-20 resize-none" />
              </div>
            </div>

            <button type="submit" className="gold-button w-full">
              提交人生规划请求
            </button>
          </form>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="dark-luxury-card text-center py-12">
          <div className="text-gold text-6xl mb-6">✓</div>
          <h2 className="gold-text text-3xl mb-4">资料已提交</h2>
          <p className="text-gold/60 mb-8">大师正在为您进行深度人生规划分析，请保持手机畅通。</p>
          <button onClick={() => setSubmitted(false)} className="text-gold/40 hover:text-gold text-sm underline underline-offset-4">返回</button>
        </motion.div>
      )}
    </div>
  );
};
