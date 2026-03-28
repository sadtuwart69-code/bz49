import React, { useState } from 'react';
import { motion } from 'motion/react';

export const Bazi: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    city: '',
    gender: 'male',
    intent: ''
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
        inputData: `${formData.birthDate} ${formData.birthTime} | 城市: ${formData.city} | 性别: ${formData.gender} | 诉求: ${formData.intent}`,
        type: 'bazi'
      })
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="gold-text text-5xl mb-4">八字排盘</h1>
        <p className="text-gold/60 tracking-widest uppercase text-sm">Bazi Planner</p>
      </div>

      {!submitted ? (
        <div className="dark-luxury-card max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-gold/40 text-[10px] text-center border border-gold/10 py-2 rounded">
              注：出生年月日时为必填项，统一使用阳（公）历日期
            </p>
            <div>
              <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">姓名 Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生日期 Date</label>
                <input
                  required
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生时间 Time</label>
                <input
                  required
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                  className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生城市 City</label>
              <input
                required
                type="text"
                placeholder="如：北京、上海"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">性别 Gender</label>
              <div className="flex gap-4">
                {['male', 'female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: g })}
                    className={`flex-1 py-3 rounded-lg border transition-all ${
                      formData.gender === g 
                        ? 'border-gold bg-gold/10 text-gold' 
                        : 'border-gold/20 text-gold/40'
                    }`}
                  >
                    {g === 'male' ? '乾 (男)' : '坤 (女)'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">诉求内容 Intent</label>
              <textarea
                value={formData.intent}
                onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                placeholder="如：妻财子禄寿、事业发展等"
                className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none h-24 resize-none"
              />
            </div>
            <button type="submit" className="gold-button w-full mt-4">
              提交排盘请求
            </button>
          </form>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="dark-luxury-card text-center py-12"
        >
          <div className="text-gold text-6xl mb-6">✓</div>
          <h2 className="gold-text text-3xl mb-4">提交成功</h2>
          <p className="text-gold/60 mb-8">大师正在为您手工排盘，请耐心等待通知。</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-gold/40 hover:text-gold text-sm underline underline-offset-4"
          >
            返回
          </button>
        </motion.div>
      )}
    </div>
  );
};
