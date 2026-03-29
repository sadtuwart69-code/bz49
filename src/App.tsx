import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ritual } from './components/Ritual';
import { Oracle } from './components/Oracle';
import { Bazi } from './components/Bazi';
import { Marriage } from './components/Marriage';
import { Planning } from './components/Planning';
import { Compass, Sparkles, ShieldCheck, CreditCard, Heart, Info, X, Map } from 'lucide-react';

type Page = 'oracle' | 'bazi' | 'marriage' | 'planning';

export default function App() {
  const [showRitual, setShowRitual] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('oracle');
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [paymentFeedback, setPaymentFeedback] = useState<string>('');

  const handlePaymentClick = (type: string) => {
    setPaymentFeedback(`感谢您的${type}支持。随喜赞叹，功德无量。`);
    
    // Notify Feishu about payment interest
    fetch('/api/notify-feishu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: type,
        inputData: '用户点击了支付二维码',
        type: 'payment'
      })
    });
  };

  if (showRitual) {
    return <Ritual onComplete={() => setShowRitual(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gold/10 bg-charcoal/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center overflow-hidden">
              <img 
                src="/icon.png" 
                alt="Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if icon.png is not found
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h1 className="gold-text text-xl leading-tight">根基八字，为卿为相</h1>
              <p className="text-[10px] text-gold/50 tracking-[0.2em] uppercase">Metaphysics Studio</p>
            </div>
          </div>

          <div className="flex gap-4 md:gap-8">
            <button 
              onClick={() => setCurrentPage('oracle')}
              className={`flex items-center gap-2 text-sm tracking-widest transition-all ${
                currentPage === 'oracle' ? 'text-gold' : 'text-gold/40 hover:text-gold/60'
              }`}
            >
              <Sparkles size={16} />
              <span className="hidden md:inline">占卜</span>
            </button>
            <button 
              onClick={() => setCurrentPage('bazi')}
              className={`flex items-center gap-2 text-sm tracking-widest transition-all ${
                currentPage === 'bazi' ? 'text-gold' : 'text-gold/40 hover:text-gold/60'
              }`}
            >
              <Compass size={16} />
              <span className="hidden md:inline">八字</span>
            </button>
            <button 
              onClick={() => setCurrentPage('marriage')}
              className={`flex items-center gap-2 text-sm tracking-widest transition-all ${
                currentPage === 'marriage' ? 'text-gold' : 'text-gold/40 hover:text-gold/60'
              }`}
            >
              <Heart size={16} />
              <span className="hidden md:inline">合婚</span>
            </button>
            <button 
              onClick={() => setCurrentPage('planning')}
              className={`flex items-center gap-2 text-sm tracking-widest transition-all ${
                currentPage === 'planning' ? 'text-gold' : 'text-gold/40 hover:text-gold/60'
              }`}
            >
              <Map size={16} />
              <span className="hidden md:inline">规划</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentPage === 'oracle' ? <Oracle /> : 
             currentPage === 'bazi' ? <Bazi /> : 
             currentPage === 'marriage' ? <Marriage /> : <Planning />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Payment Section */}
      <section className="py-20 border-t border-gold/10 bg-ink">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <CreditCard className="text-gold" />
            <h2 className="gold-text text-2xl">结缘打赏</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="dark-luxury-card p-4 w-48 cursor-pointer" onClick={() => handlePaymentClick('支付宝')}>
              <img 
                src="/alipay-qr.png" 
                alt="Alipay QR" 
                className="w-full rounded-lg mb-3 transition-all"
                referrerPolicy="no-referrer"
              />
              <p className="text-xs text-gold/60">支付宝支付</p>
            </div>
            <div className="dark-luxury-card p-4 w-48 cursor-pointer" onClick={() => handlePaymentClick('微信')}>
              <img 
                src="/wechat-qr.png" 
                alt="WeChat Pay QR" 
                className="w-full rounded-lg mb-3 transition-all"
                referrerPolicy="no-referrer"
              />
              <p className="text-xs text-gold/60">微信支付</p>
            </div>
          </div>
          <div className="mt-8 max-w-lg mx-auto">
            <p className="text-gold/80 text-sm">
              所有咨询所得将用于道场维护及公益慈善。随喜赞叹，功德无量。
            </p>
            {paymentFeedback && (
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-gold font-serif italic text-sm"
              >
                {paymentFeedback}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gold/5 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gold/30 text-xs tracking-widest">
            © 2026 VERCEL.APP METAPHYSICS. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowPrivacy(true)}
              className="flex items-center gap-2 text-gold/40 text-xs hover:text-gold/60 transition-colors"
            >
              <ShieldCheck size={14} />
              隐私保护协议 (Privacy Disclosure)
            </button>
            <div className="w-px h-4 bg-gold/10" />
            <div className="text-gold/40 text-xs">
              Master Mao Studio
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="dark-luxury-card max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setShowPrivacy(false)}
                className="absolute top-4 right-4 text-gold/40 hover:text-gold"
              >
                <X size={24} />
              </button>
              <h2 className="gold-text text-2xl mb-6 flex items-center gap-2">
                <ShieldCheck className="text-gold" />
                隐私保护协议与免责声明
              </h2>
              <div className="space-y-4 text-gold/70 text-sm leading-relaxed">
                <p className="font-bold text-gold">1. 服务性质与风险规避</p>
                <p>本平台提供的占卜、八字、合婚等服务属于传统民俗文化研究与心理咨询范畴，结果仅供参考。用户应理性对待分析建议，不应将其作为法律、医疗、财务或重大人生决策的唯一依据。因使用本服务而产生的任何直接或间接后果，本平台及相关研究人员不承担法律责任。</p>
                
                <p className="font-bold text-gold">2. 自愿打赏原则</p>
                <p>平台所有支付项均为“结缘打赏”性质，属于用户自愿行为。打赏资金将优先用于道场日常维护、经书助印及社会公益慈善事业。一旦支付完成，视为用户认可服务并自愿捐赠，原则上不予退还。</p>
                
                <p className="font-bold text-gold">3. 隐私保护</p>
                <p>我们高度重视您的隐私。您提交的姓名、出生日期、地点及诉求内容仅用于排盘分析，绝不向任何第三方泄露。所有分析记录在服务完成后将进行加密处理或定期清理。</p>
                
                <p className="font-bold text-gold">4. 协议接受</p>
                <p>使用本平台服务即表示您已年满18周岁，具有完全民事行为能力，并已充分阅读、理解并同意本协议的所有条款。</p>
              </div>
              <button 
                onClick={() => setShowPrivacy(false)}
                className="gold-button w-full mt-8"
              >
                我已阅读并同意
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
