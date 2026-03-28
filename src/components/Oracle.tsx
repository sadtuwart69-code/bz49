import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { HexagramDisplay } from './HexagramDisplay';
import { hexagrams, getHexagramByBinary } from '../data/hexagrams';

export const Oracle: React.FC = () => {
  const [formData, setFormData] = useState({
    intent: ''
  });
  const [numbers, setNumbers] = useState(['', '', '']);
  const [showMethod, setShowMethod] = useState(false);
  const [result, setResult] = useState<{
    original: any;
    changed: any;
    movingLines: number[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const castHexagram = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const num1 = parseInt(numbers[0]) || 0;
    const num2 = parseInt(numbers[1]) || 0;
    const num3 = parseInt(numbers[2]) || 0;

    // Standard Xiantian (Pre-heaven) sequence: 1-Qián, 2-Duì, 3-Lí, 4-Zhèn, 5-Xùn, 6-Kǎn, 7-Gèn, 8-Kūn
    const trigrams = ["111", "110", "101", "100", "011", "010", "001", "000"];

    // First number for Upper Trigram, Second for Lower Trigram
    const upperIdx = (num1 % 8) || 8;
    const lowerIdx = (num2 % 8) || 8;
    const movingLine = (num3 % 6) || 6;

    const upper = trigrams[upperIdx - 1];
    const lower = trigrams[lowerIdx - 1];
    const originalBinary = lower + upper; // Binary is bottom to top (Lower lines 1-3, Upper lines 4-6)

    const original = getHexagramByBinary(originalBinary);
    const binaryArr = originalBinary.split('');
    const lineToChange = movingLine - 1;
    binaryArr[lineToChange] = binaryArr[lineToChange] === '1' ? '0' : '1';
    const changedBinary = binaryArr.join('');
    const changed = getHexagramByBinary(changedBinary);

    setTimeout(() => {
      setResult({
        original,
        changed,
        movingLines: [movingLine]
      });
      setLoading(false);
      
      fetch('/api/notify-feishu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: '匿名占卜',
          details: { ...formData, numbers },
          inputData: `数字: ${numbers.join(', ')} | 诉求: ${formData.intent}`,
          type: 'oracle'
        })
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="gold-text text-5xl mb-4">三数占卜</h1>
        <p className="text-gold/60 tracking-widest uppercase text-sm">Three-Number Oracle</p>
      </div>

      {!result ? (
        <div className="dark-luxury-card max-w-lg mx-auto relative">
          <button 
            onClick={() => setShowMethod(true)}
            className="absolute top-4 right-4 text-gold/40 hover:text-gold text-xs border border-gold/20 px-2 py-1 rounded z-10"
          >
            取数方法
          </button>
          
          <form onSubmit={castHexagram} className="space-y-6">
            <p className="text-center text-gold/80 mb-4 italic">请输入三个 1-999 之间的随机数字</p>
            
            <div className="flex gap-4 mb-8">
              {numbers.map((n, i) => (
                <input
                  key={i}
                  required
                  type="number"
                  value={n}
                  onChange={(e) => {
                    const newNums = [...numbers];
                    newNums[i] = e.target.value;
                    setNumbers(newNums);
                  }}
                  className="w-full bg-charcoal border border-gold/20 rounded-lg p-4 text-center text-2xl text-gold focus:border-gold outline-none transition-all"
                  placeholder="0"
                />
              ))}
            </div>

            <div className="space-y-6 border-t border-gold/10 pt-6">
              <div>
                <label className="block text-gold/60 text-xs uppercase tracking-widest mb-2">诉求内容 Intent</label>
                <textarea
                  required
                  value={formData.intent}
                  onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                  placeholder="如：是否合作生意、感情运势等"
                  className="w-full bg-charcoal border border-gold/20 rounded-lg p-3 text-gold focus:border-gold outline-none h-32 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || numbers.some(n => !n)}
              className="gold-button w-full disabled:opacity-50"
            >
              {loading ? '正在感应...' : '开始占卜'}
            </button>
          </form>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="dark-luxury-card"
        >
          <div className="relative overflow-hidden py-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gold/5 blur-3xl rounded-full"
            />
            <HexagramDisplay 
              original={result.original} 
              changed={result.changed} 
              movingLines={result.movingLines} 
            />
          </div>
          
          <div className="mt-12 text-center space-y-4">
            <div className="text-gold text-4xl mb-4">✓</div>
            <h2 className="gold-text text-2xl mb-2">提交成功</h2>
            <div className="text-gold/60 text-sm font-serif italic mb-6">
              “天垂象，见吉凶，圣人象之。”
            </div>
            <button 
              onClick={() => setResult(null)}
              className="text-gold/40 hover:text-gold text-sm underline underline-offset-4"
            >
              返回
            </button>
            <p className="text-gold/30 text-[10px] tracking-widest uppercase pt-4">
              Data Submitted Successfully
            </p>
          </div>
        </motion.div>
      )}

      {/* Method Modal */}
      <AnimatePresence>
        {showMethod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="dark-luxury-card max-w-md w-full relative"
            >
              <button 
                onClick={() => setShowMethod(false)}
                className="absolute top-4 right-4 text-gold/40 hover:text-gold"
              >
                <X size={24} />
              </button>
              <h2 className="gold-text text-2xl mb-6">取数方法 (静心默念感应之事)</h2>
              <div className="space-y-6 text-gold/70 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                  <p>1. <b>灵感取数</b>：闭目静心，脑海中浮现的三个数字。</p>
                  <p>2. <b>报数取数</b>：请身边的人随机报出三个数字。</p>
                  <p>3. <b>时间取数</b>：根据当前的分钟、秒钟或特定时刻取数。</p>
                </div>

                <div className="space-y-3 border-t border-gold/10 pt-4">
                  <p className="text-gold font-bold">4. 竹签取数 (大衍之数)：</p>
                  <p>1）准备50根竹签或吸管（任何50个一模一样的东西即可）。</p>
                  <p>2）从50根中取出一根不用，只保留49根。将竹签置于额头，聚精会神默念问题（如财运、生意、签证等）。</p>
                  <p>3）待心静至极，屏息凝视，果断将竹签分为两份。</p>
                  
                  <div className="bg-gold/5 p-4 rounded-lg border border-gold/10 space-y-3">
                    <p className="text-gold/90 font-medium">男士操作流程：</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><b>第一次</b>：看左手竹签，每8只一组，余数为第一个数字。</li>
                      <li><b>第二次</b>：看右手竹签，每8只一组，余数为第二个数字。</li>
                      <li><b>第三次</b>：看左手竹签，每6只一组，余数为第三个数字。</li>
                    </ul>
                    
                    <p className="text-gold/90 font-medium pt-2">女士操作流程：</p>
                    <p className="italic">顺序与男士相反：先看右手 (除以8) - 再看左手 (除以8) - 最后看右手 (除以6)。</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowMethod(false)}
                className="gold-button w-full mt-8"
              >
                返回
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
