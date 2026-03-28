export interface Hexagram {
  id: number;
  name: string;
  pinyin: string;
  symbol: string;
  binary: string; // From bottom to top: 0 for Yin, 1 for Yang
  interpretation: string;
}

export const hexagrams: Hexagram[] = [
  { id: 1, name: "乾", pinyin: "Qián", symbol: "䷀", binary: "111111", interpretation: "天行健，君子以自强不息。象征纯粹的阳刚之力，是创造与领导的极致。" },
  { id: 2, name: "坤", pinyin: "Kūn", symbol: "䷁", binary: "000000", interpretation: "地势坤，君子以厚德载物。象征纯粹的阴柔，是包容与承载的极致。" },
  { id: 3, name: "屯", pinyin: "Zhūn", symbol: "䷂", binary: "100010", interpretation: "云雷屯，君子以经纶。万事开头难，在充满压力的环境中寻求突破。" },
  { id: 4, name: "蒙", pinyin: "Méng", symbol: "䷃", binary: "010001", interpretation: "山下出泉，蒙。君子以果行育德。启蒙与教育，在迷茫中寻找智慧。" },
  { id: 5, name: "需", pinyin: "Xū", symbol: "䷄", binary: "111010", interpretation: "云上于天，需。君子以饮食宴乐。等待时机，积蓄力量，保持耐心。" },
  { id: 6, name: "讼", pinyin: "Sòng", symbol: "䷅", binary: "010111", interpretation: "天与水违行，讼。君子以作事谋始。争端与诉讼，需谨慎行事，避免冲突。" },
  { id: 7, name: "师", pinyin: "Shī", symbol: "䷆", binary: "010000", interpretation: "地中有水，师。君子以容民畜众。统帅与纪律，集结力量解决重大问题。" },
  { id: 8, name: "比", pinyin: "Bǐ", symbol: "䷇", binary: "000010", interpretation: "地上有水，比。先王以建万国，亲诸侯。亲近与协作，建立稳固的关系网。" },
  { id: 9, name: "小畜", pinyin: "Xiǎo Xù", symbol: "䷈", binary: "111011", interpretation: "风行天上，小畜。君子以懿文德。微小的积累，虽有阻碍但前途光明。" },
  { id: 10, name: "履", pinyin: "Lǚ", symbol: "䷉", binary: "110111", interpretation: "上天下泽，履。君子以辨上下，定民志。履行职责，如履薄冰，需谨言慎行。" },
  { id: 11, name: "泰", pinyin: "Tài", symbol: "䷊", binary: "111000", interpretation: "天地交，泰。后以财成天地之道。通达与和谐，万物繁荣的黄金时期。" },
  { id: 12, name: "否", pinyin: "Pǐ", symbol: "䷋", binary: "000111", interpretation: "天地不交，否。君子以俭德辟难。闭塞与不通，需守正待时，不随波逐流。" },
  { id: 13, name: "同人", pinyin: "Tóng Rén", symbol: "䷌", binary: "101111", interpretation: "天与火，同人。君子以类族辨物。志同道合，在公正无私中寻求合作。" },
  { id: 14, name: "大有", pinyin: "Dà Yǒu", symbol: "䷍", binary: "111101", interpretation: "火在天上，大有。君子以遏恶扬善。大获成功，拥有丰厚的资源与声望。" },
  { id: 15, name: "谦", pinyin: "Qiān", symbol: "䷎", binary: "000100", interpretation: "地中有山，谦。君子以裒多益寡。谦逊受益，在高位而不骄，在低位而不卑。" },
  { id: 16, name: "豫", pinyin: "Yù", symbol: "䷏", binary: "001000", interpretation: "雷出地奋，豫。先王以作乐崇德。喜悦与准备，顺应自然规律而动。" },
  { id: 17, name: "随", pinyin: "Suí", symbol: "䷐", binary: "100110", interpretation: "泽中有雷，随。君子以向晦入宴息。顺随自然，择善而从，不固执己见。" },
  { id: 18, name: "蛊", pinyin: "Gǔ", symbol: "䷑", binary: "011001", interpretation: "山下有风，蛊。君子以振民育德。整治败坏，面对积弊需果断采取行动。" },
  { id: 19, name: "临", pinyin: "Lín", symbol: "䷒", binary: "110000", interpretation: "泽上有地，临。君子以教思无穷。亲临与督导，把握时机，防患于未然。" },
  { id: 20, name: "观", pinyin: "Guān", symbol: "䷓", binary: "000011", interpretation: "风行地上，观。先王以省方观民。观察与感悟，通过内省获得深刻见解。" },
  { id: 21, name: "噬嗑", pinyin: "Shì Kè", symbol: "䷔", binary: "101001", interpretation: "雷电，噬嗑。先王以明罚敕法。咬碎障碍，通过严明的法度解决矛盾。" },
  { id: 22, name: "贲", pinyin: "Bì", symbol: "䷕", binary: "100101", interpretation: "山下有火，贲。君子以明庶政。修饰与文明，在质朴的基础上追求美感。" },
  { id: 23, name: "剥", pinyin: "Bō", symbol: "䷖", binary: "000001", interpretation: "山附于地，剥。上以厚下安宅。剥落与衰退，需守静不动，等待转机。" },
  { id: 24, name: "复", pinyin: "Fù", symbol: "䷗", binary: "100000", interpretation: "地中有雷，复。先王以至日闭关。复归与新生，在寂静中孕育新的希望。" },
  { id: 25, name: "无妄", pinyin: "Wú Wàng", symbol: "䷘", binary: "100111", interpretation: "天下雷行，物与无妄。先王以茂对时。真实无妄，顺应天道，不存侥幸心理。" },
  { id: 26, name: "大畜", pinyin: "Dà Xù", symbol: "䷙", binary: "111001", interpretation: "天在山中，大畜。君子以多识前言。巨大的积累，厚积薄发，成就大业。" },
  { id: 27, name: "颐", pinyin: "Yí", symbol: "䷚", binary: "100001", interpretation: "山下有雷，颐。君子以慎言语，节饮食。颐养与修身，关注言行与内在的滋养。" },
  { id: 28, name: "大过", pinyin: "Dà Guò", symbol: "䷛", binary: "011110", interpretation: "泽灭木，大过。君子以独立不惧。过度与转折，在极端压力下展现非凡勇气。" },
  { id: 29, name: "坎", pinyin: "Kǎn", symbol: "䷜", binary: "010010", interpretation: "水洊至，习坎。君子以常德行。重重险陷，需保持诚信，持之以恒地努力。" },
  { id: 30, name: "离", pinyin: "Lí", symbol: "䷝", binary: "101101", interpretation: "明两作，离。大人以继明照于四方。光明与依附，保持正念，照亮他人。" },
  { id: 31, name: "咸", pinyin: "Xián", symbol: "䷞", binary: "001110", interpretation: "山上有泽，咸。君子以虚受人。感应与沟通，以虚怀若谷之心待人接物。" },
  { id: 32, name: "恒", pinyin: "Héng", symbol: "䷟", binary: "011100", interpretation: "雷风，恒。君子以立不易方。恒久与坚持，在变动中保持不变的初心。" },
  { id: 33, name: "遁", pinyin: "Dùn", symbol: "䷠", binary: "001111", interpretation: "天下有山，遁。君子以远小人。退避与隐遁，在不利环境下保存实力。" },
  { id: 34, name: "大壮", pinyin: "Dà Zhuàng", symbol: "䷡", binary: "111100", interpretation: "雷在天上，大壮。君子以非礼弗履。壮大与力量，需克制冲动，守礼而行。" },
  { id: 35, name: "晋", pinyin: "Jìn", symbol: "䷢", binary: "000101", interpretation: "明出地上，晋。君子以自昭明德。晋升与光明，展现才华，获得认可。" },
  { id: 36, name: "明夷", pinyin: "Míng Yí", symbol: "䷣", binary: "101000", interpretation: "明入地中，明夷。君子以莅众。光明受损，在艰难困苦中韬光养晦。" },
  { id: 37, name: "家人", pinyin: "Jiā Rén", symbol: "䷤", binary: "101011", interpretation: "风自火出，家人。君子以言有物。家庭与伦理，修身齐家，建立稳固根基。" },
  { id: 38, name: "睽", pinyin: "Kuí", symbol: "䷥", binary: "110101", interpretation: "上火下泽，睽。君子以同而异。乖离与差异，在不同中寻求共同点。" },
  { id: 39, name: "蹇", pinyin: "Jiǎn", symbol: "䷦", binary: "001010", interpretation: "山上有水，蹇。君子以反身修德。艰难险阻，需反求诸己，寻求智者帮助。" },
  { id: 40, name: "解", pinyin: "Jiě", symbol: "䷧", binary: "010100", interpretation: "雷雨作，解。君子以赦过宥罪。缓解与释放，在危机过后重整旗鼓。" },
  { id: 41, name: "损", pinyin: "Sǔn", symbol: "䷨", binary: "110001", interpretation: "山下有泽，损。君子以惩忿窒欲。减损与克制，通过自我约束获得长远利益。" },
  { id: 42, name: "益", pinyin: "Yì", symbol: "䷩", binary: "100011", interpretation: "风雷，益。君子以见善则迁。增益与进步，顺应天时，积极进取。" },
  { id: 43, name: "夬", pinyin: "Guài", symbol: "䷪", binary: "111110", interpretation: "泽上于天，夬。君子以施禄及下。决断与突破，以果敢之心清除障碍。" },
  { id: 44, name: "姤", pinyin: "Gòu", symbol: "䷫", binary: "011111", interpretation: "天下有风，姤。后以施命诰四方。相遇与警示，在偶然的邂逅中保持警觉。" },
  { id: 45, name: "萃", pinyin: "Cuì", symbol: "䷬", binary: "000110", interpretation: "泽上于地，萃。君子以除戎器。聚集与团结，集结众人之力成就大事。" },
  { id: 46, name: "升", pinyin: "Shēng", symbol: "䷭", binary: "011000", interpretation: "地中生木，升。君子以顺德。上升与成长，顺应自然，稳步提升。" },
  { id: 47, name: "困", pinyin: "Kùn", symbol: "䷮", binary: "010110", interpretation: "泽无水，困。君子以致命遂志。困顿与磨砺，在穷困中坚守志向。" },
  { id: 48, name: "井", pinyin: "Jǐng", symbol: "䷯", binary: "011010", interpretation: "木上有水，井。君子以劳民劝相。源泉与修养，不断挖掘内在的智慧之泉。" },
  { id: 49, name: "革", pinyin: "Gé", symbol: "䷰", binary: "101110", interpretation: "泽中有火，革。君子以治历明时。变革与更新，顺应时势，推陈出新。" },
  { id: 50, name: "鼎", pinyin: "Dǐng", symbol: "䷱", binary: "011101", interpretation: "木上有火，鼎。君子以正位凝命。鼎定与革新，确立稳固的地位与使命。" },
  { id: 51, name: "震", pinyin: "Zhèn", symbol: "䷲", binary: "100100", interpretation: "洊雷，震。君子以恐惧修省。震动与警示，在巨变中保持冷静与反思。" },
  { id: 52, name: "艮", pinyin: "Gèn", symbol: "䷳", binary: "001001", interpretation: "兼山，艮。君子以思不出其位。静止与止息，在动荡中寻求内心的平静。" },
  { id: 53, name: "渐", pinyin: "Jiàn", symbol: "䷴", binary: "001011", interpretation: "山上有木，渐。君子以居贤德善俗。循序渐进，在稳健的发展中取得成功。" },
  { id: 54, name: "归妹", pinyin: "Guī Mèi", symbol: "䷵", binary: "110100", interpretation: "泽上有雷，归妹。君子以永终知敝。归宿与终结，需看清事物的本质与结局。" },
  { id: 55, name: "丰", pinyin: "Fēng", symbol: "䷶", binary: "101100", interpretation: "雷电皆至，丰。君子以折狱致刑。丰盛与盛大，在繁荣时期需保持清醒。" },
  { id: 56, name: "旅", pinyin: "Lǚ", symbol: "䷷", binary: "001101", interpretation: "山上有火，旅。君子以明慎用刑。羁旅与探索，在变动不居中寻求安身之处。" },
  { id: 57, name: "巽", pinyin: "Xùn", symbol: "䷸", binary: "011011", interpretation: "随风，巽。大人以申命行事。顺从与渗透，如风般无孔不入，灵活应变。" },
  { id: 58, name: "兑", pinyin: "Duì", symbol: "䷹", binary: "110110", interpretation: "丽泽，兑。君子以朋友讲习。喜悦与交流，在真诚的互动中获得快乐。" },
  { id: 59, name: "涣", pinyin: "Huàn", symbol: "䷺", binary: "010011", interpretation: "风行水上，涣。先王以享于帝。涣散与拯救，化解矛盾，重聚人心。" },
  { id: 60, name: "节", pinyin: "Jié", symbol: "䷻", binary: "110011", interpretation: "泽上有水，节。君子以制数度。节制与限度，在适度的约束中获得自由。" },
  { id: 61, name: "中孚", pinyin: "Zhōng Fú", symbol: "䷼", binary: "110011", interpretation: "泽上有风，中孚。君子以议狱缓死。诚信与感化，以真诚之心打动万物。" },
  { id: 62, name: "小过", pinyin: "Xiǎo Guò", symbol: "䷽", binary: "001100", interpretation: "山上有雷，小过。君子以行过乎恭。小有过越，在细节处需格外谨慎。" },
  { id: 63, name: "既济", pinyin: "Jì Jì", symbol: "䷾", binary: "101010", interpretation: "水在火上，既济。君子以思患而豫防。成功与圆满，在达成目标后谨防衰退。" },
  { id: 64, name: "未济", pinyin: "Wèi Jì", symbol: "䷿", binary: "010101", interpretation: "火在水上，未济。君子以慎辨物居方。未竟之业，在终点前保持最后的努力。" }
];

export const getHexagramByBinary = (binary: string): Hexagram | undefined => {
  return hexagrams.find(h => h.binary === binary);
};
