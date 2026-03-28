import React, { useState } from 'react';
import { motion } from 'motion/react';

export const Marriage: React.FC = () => {
  const [formData, setFormData] = useState({
    maleName: '',
    maleBirthDate: '',
    maleBirthTime: '',
    maleCity: '',
    femaleName: '',
    femaleBirthDate: '',
    femaleBirthTime: '',
    femaleCity: '',
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
        customerName: `${formData.maleName} & ${formData.femaleName}`,
        details: formData,
        inputData: `男: ${formData.maleBirthDate} ${formData.maleBirthTime} (城市: ${formData.maleCity}) | 女: ${formData.femaleBirthDate} ${formData.femaleBirthTime} (城市: ${formData.femaleCity}) | 诉求: ${formData.intent}`,
        type: 'marriage'
      })
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="gold-text text-5xl mb-4">夫妻合婚</h1>
        <p className="text-gold/60 tracking-widest uppercase text-sm">Marriage Compatibility</p>
      </div>

      {!submitted ? (
        <div className="dark-luxury-card max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Male Info */}
              <div className="space-y-4">
                <h3 className="gold-text border-b border-gold/20 pb-2">男方信息 (乾)</h3>
                <div>
                  <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">姓名 Name</label>
                  <input
                    required
                    type="text"
                    value={formData.maleName}
                    onChange={(e) => setFormData({ ...formData, maleName: e.target.value })}
                    className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生日期 (公历)</label>
                  <input
                    required
                    type="date"
                    value={formData.maleBirthDate}
                    onChange={(e) => setFormData({ ...formData, maleBirthDate: e.target.value })}
                    className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生时间 Time</label>
                  <input
                    required
                    type="time"
                    value={formData.maleBirthTime}
                    onChange={(e) => setFormData({ ...formData, maleBirthTime: e.target.value })}
                    className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生城市 City</label>
                  <input
                    required
                    type="text"
                    placeholder="如：北京"
                    value={formData.maleCity}
                    onChange={(e) => setFormData({ ...formData, maleCity: e.target.value })}
                    className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                  />
                </div>
              </div>

              {/* Female Info */}
              <div className="space-y-4">
                <h3 className="gold-text border-b border-gold/20 pb-2">女方信息 (坤)</h3>
                <div>
                  <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">姓名 Name</label>
                  <input
                    required
                    type="text"
                    value={formData.femaleName}
                    onChange={(e) => setFormData({ ...formData, femaleName: e.target.value })}
                    className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生日期 (公历)</label>
                  <input
                    required
                    type="date"
                    value={formData.femaleBirthDate}
                    onChange={(e) => setFormData({ ...formData, femaleBirthDate: e.target.value })}
                    className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生时间 Time</label>
                  <input
                    required
                    type="time"
                    value={formData.femaleBirthTime}
                    onChange={(e) => setFormData({ ...formData, femaleBirthTime: e.target.value })}
                    className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">出生城市 City</label>
                  <input
                    required
                    type="text"
                    placeholder="如：上海"
                    value={formData.femaleCity}
                    onChange={(e) => setFormData({ ...formData, femaleCity: e.target.value })}
                    className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">合婚诉求 Intent</label>
              <textarea
                value={formData.intent}
                onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                placeholder="如：婚期选择、性格磨合、家庭运势等"
                className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none h-24 resize-none"
              />
            </div>

            <button type="submit" className="gold-button w-full">
              提交合婚请求
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
          <p className="text-gold/60 mb-8">大师正在为您进行合婚分析，请耐心等待通知。</p>
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
