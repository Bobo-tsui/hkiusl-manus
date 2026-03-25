import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "zh" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

// ─── Translations ───
const translations: Record<string, Record<Lang, string>> = {
  // Countdown Banner
  "countdown.label": { zh: "報名截止倒數：", en: "Registration closes in: " },
  "countdown.days": { zh: "天", en: "d" },
  "countdown.hours": { zh: "時", en: "h" },
  "countdown.minutes": { zh: "分", en: "m" },
  "countdown.seconds": { zh: "秒", en: "s" },
  "countdown.register": { zh: "立即報名", en: "Register" },

  // Navbar
  "nav.about": { zh: "關於活動", en: "About" },
  "nav.features": { zh: "活動亮點", en: "Highlights" },
  "nav.schedule": { zh: "日程安排", en: "Schedule" },
  "nav.gallery": { zh: "活動花絮", en: "Gallery" },
  "nav.partners": { zh: "合作機構", en: "Partners" },
  "nav.register": { zh: "報名", en: "Register" },
  "nav.registerBtn": { zh: "立即報名", en: "Register Now" },

  // Hero
  "hero.date": { zh: "2026 年 4 月 11-19 日", en: "April 11-19, 2026" },
  "hero.title.zh": { zh: "香港跨大專", en: "Hong Kong Inter-University" },
  "hero.title.highlight": { zh: "技術經理人", en: "Startup" },
  "hero.title.suffix": { zh: "實戰營 2026", en: "Launchpad 2026" },
  "hero.title.full.desktop": { zh: "香港跨大專技術經理人實戰營 2026", en: "Hong Kong Inter-University Startup Launchpad 2026" },
  "hero.desc": {
    zh: "匯聚香港各大專院校學生，透過實戰工作坊、創業比賽與業界交流，培育下一代技術經理人。不只是理科生的舞台——商科、設計、人文學科同樣大放異彩。",
    en: "Bringing together students from universities across Hong Kong through hands-on workshops, startup competitions, and industry networking to nurture the next generation of technology managers. Not just for STEM — business, design, and humanities students shine equally."
  },
  "hero.registerBtn": { zh: "立即報名", en: "Register Now" },
  "hero.learnMore": { zh: "了解更多", en: "Learn More" },
  "hero.hkmu": {
    zh: "🎓 HKMU 學生可免費參加！完成活動後，可向學校申請 Student Life Enrichment Subsidy Scheme，每宗申請最高可獲 HK$300 資助，以報銷全額報名！",
    en: "🎓 HKMU students can join for FREE! After the event, apply for the Student Life Enrichment Subsidy Scheme for up to HK$300 reimbursement!"
  },
  "hero.stat.days": { zh: "天", en: "Days" },
  "hero.stat.events": { zh: "精彩活動", en: "Action-Packed" },
  "hero.stat.guests": { zh: "業界嘉賓", en: "Industry Guests" },
  "hero.stat.students": { zh: "參與學生", en: "Student Participants" },

  // About
  "about.tag": { zh: "關於活動", en: "About" },
  "about.title": { zh: "什麼是技術經理人實戰營？", en: "What is the Startup Launchpad?" },
  "about.desc": {
    zh: "近年香港政府大力推動大學技術轉移，鼓勵將學術研究成果轉化為商業應用。技術經理人（Technology Transfer Professional）正是這個過程中連結科技與商業的關鍵角色。本實戰營旨在讓大專學生在參加創業比賽前掌握基本概念，培養領導才能、商業知識與設計思維。",
    en: "In recent years, the Hong Kong government has been actively promoting university technology transfer, encouraging the commercialization of academic research. Technology Transfer Professionals are the key link between technology and business. This launchpad aims to equip university students with fundamental concepts before entering startup competitions, developing leadership, business acumen, and design thinking."
  },
  "about.studentLed": {
    zh: "本活動完全由學生發起，由香港都會大學、香港理工大學、香港城市大學、香港大學及香港科技大學的學生主導籌辦。",
    en: "This event is entirely student-initiated, organized and led by students from HKMU, PolyU, CityU, HKU, and HKUST."
  },
  "about.aiCaption": { zh: "AI 生成活動模擬圖 — 主題演講", en: "AI-Generated Event Simulation — Keynote" },
  "about.cross.title": { zh: "跨學科參與", en: "Cross-Disciplinary" },
  "about.cross.desc": {
    zh: "不是只有理科生才可以參加高科技發展！商學院、設計學院學生同樣是技術經理人的最佳人選。",
    en: "Tech isn't just for STEM students! Business and design students are equally suited to become technology managers."
  },
  "about.game.title": { zh: "線上遊戲融合課程", en: "Gamified Learning" },
  "about.game.desc": {
    zh: "2026 年最大特色——將課程融入線上遊戲，讓學習變得更加互動有趣。",
    en: "The biggest highlight of 2026 — integrating courses into online games for interactive and engaging learning."
  },
  "about.startup.title": { zh: "實戰創業體驗", en: "Real Startup Experience" },
  "about.startup.desc": {
    zh: "從商業策略遊戲到 Startup Pitching，全方位模擬真實創業歷程。",
    en: "From business strategy games to Startup Pitching, a full simulation of the real entrepreneurial journey."
  },

  // Features
  "features.tag": { zh: "活動亮點", en: "Highlights" },
  "features.title": { zh: "三大核心體驗", en: "Three Core Experiences" },
  "features.desc": { zh: "從演講到實戰，全方位提升你的創業與管理能力", en: "From keynotes to hands-on practice, elevate your entrepreneurial and management skills" },
  "features.keynote.title": { zh: "星級嘉賓演講", en: "Star Guest Keynotes" },
  "features.keynote.desc": { zh: "邀請來自不同大學的創業者分享創業政策與實戰經驗。", en: "Inviting entrepreneurs from various universities to share startup policies and real-world experience." },
  "features.game.title": { zh: "商業策略遊戲", en: "Business Strategy Games" },
  "features.game.desc": { zh: "透過互動遊戲學習商業策略、專利佈局與思維訓練，寓教於樂。", en: "Learn business strategy, patent layout, and critical thinking through interactive games." },
  "features.pitching.title": { zh: "極創客 Pitching", en: "Hackathon Pitching" },
  "features.pitching.desc": { zh: "組隊參加極創客挑戰，在限時內完成創業提案並向評審進行路演。", en: "Form teams for the hackathon challenge, complete a startup proposal within the time limit and pitch to judges." },
  "features.tryNow": { zh: "立即試玩", en: "Try Now" },
  "features.learnMore": { zh: "了解更多", en: "Learn More" },

  // Schedule
  "schedule.tag": { zh: "日程安排", en: "Schedule" },
  "schedule.title": { zh: "兩天高強度實戰日程（暫定）", en: "Two-Day Intensive Schedule (Tentative)" },
  "schedule.desc": { zh: "從早到晚，沉浸式體驗創業全流程", en: "From morning to evening, an immersive full startup experience" },

  // Schedule Day labels
  "schedule.day1.date": { zh: "4月11日（六）", en: "Apr 11 (Sat)" },
  "schedule.day1.label": { zh: "開幕禮・演講・授課", en: "Opening・Keynotes・Sessions" },
  "schedule.day1.theme": { zh: "開幕啟航與創業導入", en: "Opening & Startup Introduction" },
  "schedule.day2.date": { zh: "4月12日（日）", en: "Apr 12 (Sun)" },
  "schedule.day2.label": { zh: "工作坊・極創客", en: "Workshop・Hackathon" },
  "schedule.day2.theme": { zh: "組隊實戰與極創客路演", en: "Team Building & Hackathon Pitching" },
  "schedule.day3.date": { zh: "4月13-18日", en: "Apr 13-18" },
  "schedule.day3.label": { zh: "線上投票・AI 評審", en: "Online Voting・AI Judging" },
  "schedule.day3.theme": { zh: "作品展示與公眾參與", en: "Showcase & Public Engagement" },
  "schedule.day4.date": { zh: "4月19日（六）", en: "Apr 19 (Sat)" },
  "schedule.day4.label": { zh: "宣佈優秀作品", en: "Award Announcement" },
  "schedule.day4.theme": { zh: "成果公佈與榮譽嘉許", en: "Results & Awards" },

  // Schedule time labels
  "schedule.allDay": { zh: "全天", en: "All Day" },
  "schedule.tbc": { zh: "待定", en: "TBC" },

  // Schedule venues
  "schedule.venue.hkmu": { zh: "都會大學中國銀行演講廳", en: "HKMU Bank of China Auditorium" },
  "schedule.venue.youthsquare": { zh: "柴灣青年廣場「青立方」", en: "Youth Square, Chai Wan" },
  "schedule.venue.online": { zh: "線上", en: "Online" },

  // Slot type labels
  "slot.highlight": { zh: "重點活動", en: "Highlight" },
  "slot.speech": { zh: "致辭", en: "Speech" },
  "slot.workshop": { zh: "工作坊", en: "Workshop" },
  "slot.break": { zh: "休息 / 交流", en: "Break / Networking" },
  "slot.general": { zh: "一般安排", en: "General" },
  "slot.star-guest": { zh: "星級嘉賓（Zoom）", en: "Star Guest (Zoom)" },
  "slot.guest-share": { zh: "嘉賓分享", en: "Guest Sharing" },
  "slot.key-event": { zh: "重點活動", en: "Key Event" },
  "slot.opening": { zh: "正式開始", en: "Opening" },
  "slot.startup-share": { zh: "創業分享", en: "Startup Sharing" },

  // Day 1 slots
  "d1.s1.title": { zh: "簽到", en: "Registration" },
  "d1.s1.desc": { zh: "參加者簽到入場，領取活動資料。", en: "Participants check in and collect event materials." },
  "d1.s2.title": { zh: "正式開始", en: "Official Opening" },
  "d1.s2.desc": { zh: "主辦方致歡迎辭，介紹活動整體框架與目標。", en: "Welcome address by organizers, introducing the event framework and objectives." },
  "d1.s3.title": { zh: "Venture Hub Academy 分享", en: "Venture Hub Academy Sharing" },
  "d1.s3.desc": {
    zh: "Venture Hub Academy 派出兩位代表前來分享，商業合夥人分享創業實戰經驗，技術團隊探討 AI 時代 Vibe Coding 的機遇。",
    en: "Two representatives from Venture Hub Academy share insights — a business partner on startup experience, and the tech team on Vibe Coding opportunities in the AI era."
  },
  "d1.s4.title": { zh: "致辭一", en: "Speech I" },
  "d1.s4.desc": { zh: "區議員林詠欣 Sophia 致辭，分享對香港青年創業與大灣區合作發展的展望。", en: "District Councillor Sophia Lam delivers a speech on Hong Kong youth entrepreneurship and GBA cooperation." },
  "d1.s5.title": { zh: "致辭二", en: "Speech II" },
  "d1.s5.desc": { zh: "菁創匯創辦人周卓然 Nathan 致辭，分享對香港青年創業與跨界發展的展望。", en: "Nathan Chau, Founder of Pioneer Elite Alliance, delivers a speech on youth entrepreneurship and cross-disciplinary development in Hong Kong." },
  "d1.s6.title": { zh: "嘉賓分享", en: "Guest Sharing" },
  "d1.s6.desc": { zh: "嘉賓分享香港創業生態與未來趨勢，讓參加者掌握宏觀方向。", en: "Guest shares insights on Hong Kong's startup ecosystem and future trends." },
  "d1.s7.title": { zh: "⭐ 星級嘉賓", en: "⭐ Star Guest" },
  "d1.s7.desc": { zh: "西DorSi 透過 Zoom 連線分享自媒體創業經驗與個人品牌建立心得。", en: "SaiDorSi shares self-media entrepreneurship experience and personal branding insights via Zoom." },
  "d1.s8.title": { zh: "主辦座談", en: "Panel Discussion" },
  "d1.s8.desc": { zh: "與嘉賓進行座談，深入探討技術經理人的角色與機遇。", en: "Panel discussion with guests, exploring the role and opportunities of technology managers." },
  "d1.s9.title": { zh: "Q & A", en: "Q & A" },
  "d1.s9.desc": { zh: "參加者自由提問，與嘉賓互動交流。", en: "Open Q&A session for participants to interact with guests." },
  "d1.s10.title": { zh: "自由交流 / LUNCH", en: "Networking / LUNCH" },
  "d1.s10.desc": { zh: "參加者與嘉賓自由交流、建立跨校連結，享用午餐。", en: "Free networking with guests, building cross-university connections over lunch." },
  "d1.s11.title": { zh: "商業策略遊戲", en: "Business Strategy Game" },
  "d1.s11.desc": { zh: "透過互動遊戲學習商業策略，以遊戲方式理解創業決策與價值定位。", en: "Learn business strategy through interactive games, understanding startup decisions and value positioning." },
  "d1.s12.title": { zh: "Startup 分享", en: "Startup Sharing" },
  "d1.s12.desc": { zh: "Bobo 分享創業歷程與實戰經驗。", en: "Bobo shares her entrepreneurial journey and practical experience." },
  "d1.s13.title": { zh: "思維策略遊戲", en: "Strategic Thinking Game" },
  "d1.s13.desc": { zh: "透過思維策略遊戲訓練創業思維與邏輯分析能力。", en: "Train entrepreneurial thinking and logical analysis through strategic games." },
  "d1.s14.title": { zh: "Startup 分享 — RiceUp", en: "Startup Sharing — RiceUp" },
  "d1.s14.desc": {
    zh: "Eric 分享從自媒體到餐飲科技的創業轉型，RiceUp 如何獲得科學園種子輪支持並建立超萬人社群。",
    en: "Eric shares the pivot from self-media to food tech, how RiceUp secured HKSTP seed funding and built a 10,000+ community."
  },
  "d1.s15.title": { zh: "Startup 分享 — Inspire Education", en: "Startup Sharing — Inspire Education" },
  "d1.s15.desc": {
    zh: "Angel 分享創辦創想教育的歷程，如何將數學與科技結合，獲得60萬創業基金及海外參展機會。",
    en: "Angel shares founding Inspire Education, combining math with tech, securing HK$600K funding and overseas exhibition opportunities."
  },
  "d1.s16.title": { zh: "專利策略遊戲", en: "Patent Strategy Game" },
  "d1.s16.desc": { zh: "透過專利策略遊戲了解知識產權佈局與專利申請策略。", en: "Learn IP layout and patent filing strategies through the Patent Strategy Game." },
  "d1.s17.title": { zh: "小休", en: "Break" },
  "d1.s17.desc": { zh: "短暫休息，補充能量。", en: "Short break to recharge." },
  "d1.s18.title": { zh: "Startup 分享 — ScentSafe", en: "Startup Sharing — ScentSafe" },
  "d1.s18.desc": { zh: "余浩堃 Marcus 分享 ScentSafe 的創業歷程與產品開發經驗。", en: "Marcus shares ScentSafe's startup journey and product development experience." },
  "d1.s19.title": { zh: "Startup 分享 — SMAR TECH MEDICINE", en: "Startup Sharing — SMAR TECH MEDICINE" },
  "d1.s19.desc": {
    zh: "Ryan 分享從 HKMU Hackathon 冠軍到創辦 SMAR TECH MEDICINE 的創業歷程，以及醫療創新的實戰經驗。",
    en: "Ryan shares his journey from HKMU Hackathon champion to founding SMAR TECH MEDICINE, and his experience in medical innovation."
  },
  "d1.s20.title": { zh: "Day 2 工作坊講解", en: "Day 2 Workshop Briefing" },
  "d1.s20.desc": { zh: "預告 Day 2 組隊實作、工作坊流程與極創客挑戰要求。", en: "Preview of Day 2 team formation, workshop flow, and hackathon challenge requirements." },
  "d1.s21.title": { zh: "完結", en: "End" },
  "d1.s21.desc": { zh: "Day 1 活動圓滿結束。", en: "Day 1 concludes." },

  // Day 2 slots
  "d2.s1.title": { zh: "簽到", en: "Registration" },
  "d2.s1.desc": { zh: "參加者簽到入場。", en: "Participants check in." },
  "d2.s2.title": { zh: "正式開始", en: "Official Opening" },
  "d2.s2.desc": { zh: "回顧 Day 1 重點，介紹 Day 2 流程與目標。", en: "Recap Day 1 highlights, introduce Day 2 flow and objectives." },
  "d2.s3.title": { zh: "選隊長", en: "Team Leader Selection" },
  "d2.s3.desc": { zh: "各組選出隊長，確立團隊領導角色。", en: "Each group selects a team leader to establish leadership roles." },
  "d2.s4.title": { zh: "組隊 + 破冰", en: "Team Formation + Icebreaker" },
  "d2.s4.desc": { zh: "組隊與破冰活動，建立跨學科團隊合作基礎，準備進入創業實戰。", en: "Team formation and icebreaker activities, building cross-disciplinary teamwork foundations." },
  "d2.s5.title": { zh: "大隊長架到", en: "Captain Arrives" },
  "d2.s5.desc": { zh: "由大隊長帶來實戰分享，協助參加者掌握團隊領導、任務拆解與臨場執行要點。", en: "The Captain delivers practical insights on team leadership, task breakdown, and on-the-spot execution." },
  "d2.s6.title": { zh: "Lunch", en: "Lunch" },
  "d2.s6.desc": { zh: "團隊整理方向、補充能量，並與其他隊伍交流初步想法。", en: "Teams regroup, recharge, and exchange initial ideas with other teams." },
  "d2.s7.title": { zh: "極創客", en: "Hackathon" },
  "d2.s7.desc": { zh: "團隊進行創意整合、方案設計、商業模式梳理與簡報準備，在限時內完成創業提案。", en: "Teams integrate ideas, design solutions, refine business models, and prepare pitches within the time limit." },
  "d2.s8.title": { zh: "Pitching", en: "Pitching" },
  "d2.s8.desc": { zh: "各隊進行最終簡報展示，接受評審回饋。", en: "Teams deliver final pitches and receive judge feedback." },
  "d2.s9.title": { zh: "Finish", en: "Finish" },
  "d2.s9.desc": { zh: "Day 2 活動圓滿結束，為後續線上投票及評選作準備。", en: "Day 2 concludes, preparing for online voting and evaluation." },

  // Day 3-8 slots
  "d3.s1.title": { zh: "線上投票開放", en: "Online Voting Opens" },
  "d3.s1.desc": { zh: "公眾可於平台瀏覽隊伍成果並進行投票，提升作品曝光與社會參與度。", en: "Public can browse team results and vote on the platform, increasing exposure and engagement." },
  "d3.s2.title": { zh: "AI 評審系統運作", en: "AI Judging System" },
  "d3.s2.desc": { zh: "系統輔助分析提案內容、表達邏輯與創新方向，提供多維度參考評估。", en: "AI system analyzes proposals, presentation logic, and innovation direction for multi-dimensional evaluation." },
  "d3.s3.title": { zh: "作品展示平台", en: "Showcase Platform" },
  "d3.s3.desc": { zh: "統一展示各隊提案內容、概念摘要與成果亮點，方便評審與公眾瀏覽。", en: "Unified display of team proposals, concept summaries, and highlights for judges and public viewing." },

  // Finale slots
  "d4.s1.title": { zh: "線上宣佈優秀作品", en: "Online Award Announcement" },
  "d4.s1.desc": { zh: "公佈優秀團隊與評審結果，展示活動成果與參加者的創新表現。", en: "Announcing outstanding teams and judging results, showcasing event achievements and participant innovation." },
  "d4.s2.title": { zh: "頒獎典禮", en: "Award Ceremony" },
  "d4.s2.desc": { zh: "透過線上形式進行嘉許與成果總結，為整個實戰營畫上圓滿句號。", en: "Online recognition and summary of achievements, concluding the entire launchpad." },

  // Gallery
  "gallery.tag": { zh: "活動花絮", en: "Gallery" },
  "gallery.title": { zh: "AI 生成活動模擬圖", en: "AI-Generated Event Simulations" },
  "gallery.desc": { zh: "以下照片由人工智慧根據柴灣青年廣場實地場景生成，模擬活動進行時的精彩畫面", en: "The following photos are AI-generated based on Youth Square's actual venue, simulating exciting event moments" },
  "gallery.ai.keynote": { zh: "AI 模擬 — 主題演講", en: "AI Simulation — Keynote" },
  "gallery.ai.workshop": { zh: "AI 模擬 — 工作坊", en: "AI Simulation — Workshop" },
  "gallery.ai.pitching": { zh: "AI 模擬 — 創業路演", en: "AI Simulation — Pitching" },
  "gallery.ai.networking": { zh: "AI 模擬 — 交流活動", en: "AI Simulation — Networking" },
  "gallery.ai.teamwork": { zh: "AI 模擬 — 團隊合作", en: "AI Simulation — Teamwork" },
  "gallery.venue.title": { zh: "場地實景", en: "Venue Photos" },
  "gallery.venue.desc": { zh: "柴灣青年廣場——Day 2 活動場地", en: "Youth Square, Chai Wan — Day 2 Venue" },
  "gallery.venue.1": { zh: "柴灣青年廣場 — 演講廳", en: "Youth Square — Auditorium" },
  "gallery.venue.2": { zh: "柴灣青年廣場 — 開放空間", en: "Youth Square — Open Space" },
  "gallery.venue.3": { zh: "柴灣青年廣場 — 座位區", en: "Youth Square — Seating Area" },
  "gallery.venue.4": { zh: "柴灣青年廣場 — 休憩區", en: "Youth Square — Lounge" },

  // Testimonials
  "testimonial.tag": { zh: "學生心聲", en: "Testimonials" },
  "testimonial.title": { zh: "參與者分享", en: "What Participants Say" },
  "testimonial.1.quote": {
    zh: "這個實戰營讓我明白，創業不只是寫程式，更需要商業策略和團隊合作。作為商科生，我終於找到了自己在科技領域的定位。",
    en: "This launchpad taught me that startups aren't just about coding — they require business strategy and teamwork. As a business student, I finally found my place in tech."
  },
  "testimonial.1.name": { zh: "陳同學", en: "Student Chan" },
  "testimonial.1.school": { zh: "商學院", en: "Business School" },
  "testimonial.2.quote": {
    zh: "線上遊戲融合課程的方式非常創新，讓原本枯燥的商業理論變得生動有趣。Pitching 環節更是讓我突破了自己的舒適圈。",
    en: "The gamified learning approach was incredibly innovative, making dry business theory come alive. The pitching session pushed me out of my comfort zone."
  },
  "testimonial.2.name": { zh: "李同學", en: "Student Lee" },
  "testimonial.2.school": { zh: "設計學院", en: "Design School" },
  "testimonial.3.quote": {
    zh: "認識了來自不同大專的同學，大家各有專長，互相學習。這種跨校合作的經驗是課堂上學不到的寶貴財富。",
    en: "I met students from different universities, each with unique expertise. This cross-university collaboration is an invaluable experience you can't get in the classroom."
  },
  "testimonial.3.name": { zh: "王同學", en: "Student Wong" },
  "testimonial.3.school": { zh: "工程學院", en: "Engineering School" },

  // Partners
  "partners.tag": { zh: "合作夥伴", en: "Partners" },
  "partners.title": { zh: "合作機構", en: "Partner Organizations" },
  "partners.funding": { zh: "本計劃由 新昌－葉庚年教育基金聯合學生項目基金 (2025/26) 資助", en: "Funded by Hsin Chong – K.N. Godfrey Yeh Education Fund for Joint Student Projects (2025/26)" },

  // Signup
  "signup.tag": { zh: "立即行動", en: "Take Action" },
  "signup.title": { zh: "報名參加", en: "Register Now" },
  "signup.desc": { zh: "名額有限，先到先得。成為 2026 年技術經理人實戰營的一員！", en: "Limited spots, first come first served. Be part of the 2026 Startup Launchpad!" },
  "signup.earlybird": { zh: "早鳥優惠", en: "Early Bird" },
  "signup.earlybird.date": { zh: "3 月 25 日前報名", en: "Register before Mar 25" },
  "signup.earlybird.note": { zh: "限時優惠價", en: "Limited time offer" },
  "signup.regular": { zh: "正價報名", en: "Regular Price" },
  "signup.regular.date": { zh: "3 月 25 日後適用", en: "After Mar 25" },
  "signup.hkmu": {
    zh: "🎓 HKMU 學生可免費參加！完成活動後，可申請 Student Life Enrichment Subsidy Scheme，最高資助 HK$300",
    en: "🎓 HKMU students can join for FREE! Apply for the Student Life Enrichment Subsidy Scheme for up to HK$300 reimbursement after the event"
  },
  "signup.deadline": { zh: "報名截止日期：2026 年 4 月 1 日", en: "Registration deadline: April 1, 2026" },
  "signup.registerBtn": { zh: "立即報名 Register Now", en: "Register Now" },
  "signup.registerNote": { zh: "點擊後將開啟報名表格，填寫資料後即完成登記", en: "Click to open the registration form and complete your registration" },
  "signup.volunteer.title": { zh: "招聘義工 Volunteer Helpers", en: "Volunteer Helpers Wanted" },
  "signup.volunteer.desc": {
    zh: "我們正在招募活動義工，協助場地佈置、簽到接待、攝影記錄等工作。歡迎有熱誠的同學加入我們的團隊！",
    en: "We're recruiting volunteers to help with venue setup, registration, photography, and more. Passionate students are welcome to join our team!"
  },
  "signup.volunteer.btn": { zh: "申請成為義工", en: "Apply as Volunteer" },
  "signup.volunteer.note": { zh: "點擊後將開啟義工報名表格", en: "Click to open the volunteer application form" },

  // Promo code
  "signup.promo.label": { zh: "持有優惠碼？", en: "Have a promo code?" },
  "signup.promo.placeholder": { zh: "輸入優惠碼", en: "Enter promo code" },
  "signup.promo.apply": { zh: "使用", en: "Apply" },
  "signup.promo.invalid": { zh: "優惠碼無效，請重新輸入", en: "Invalid promo code, please try again" },
  "signup.promo.success": { zh: "優惠碼已生效 — 免費參加！", en: "Promo code applied — Free admission!" },
  "signup.promo.successNote": { zh: "請點擊下方按鈕完成報名，無需繳費", en: "Click the button below to register, no payment required" },
  "signup.promo.freeRegister": { zh: "免費報名 Free Register", en: "Register for Free" },
  "signup.promo.freeNote": { zh: "優惠碼已生效，填寫報名表格後即完成免費登記", en: "Promo code applied. Complete the registration form for free admission" },

  // Footer
  "footer.brand": { zh: "香港跨大專技術經理人實戰營 2026", en: "Hong Kong Inter-University Startup Launchpad 2026" },
  "footer.brand2": { zh: "Hong Kong Inter-University Startup Launchpad 2026", en: "" },
  "footer.organizer": { zh: "主辦人：Bobo Tsui", en: "Organizer: Bobo Tsui" },
  "footer.organizer.desc": { zh: "現就讀香港都會大學商學院二年級", en: "Year 2, School of Business & Administration, HKMU" },
  "footer.quickLinks": { zh: "快速連結", en: "Quick Links" },
  "footer.contact": { zh: "聯絡我們", en: "Contact Us" },
  "footer.copyright": { zh: "© 2026 香港跨大專技術經理人實戰營. All rights reserved.", en: "© 2026 Hong Kong Inter-University Startup Launchpad. All rights reserved." },
  "footer.funding": { zh: "資金贊助：新昌葉庚年教育基金——聯合學生項目基金", en: "Funded by: Sun Cheong Yip Kang Nin Education Fund — Joint Student Project Fund" },

  // Speaker bios (English translations)
  "speaker.alan.name": { zh: "張益麟 Alan, MH", en: "Alan Cheung, MH" },
  "speaker.alan.role": { zh: "都會大學校董會成員 | 興迅集團創辦人及董事總經理 | 香港社會創業論壇主席", en: "HKMU Council Member | Founder & MD, Hing Shun Group | Chairman, HKSEF" },
  "speaker.alan.bio": {
    zh: "資深商界領袖，興迅集團創辦人及董事總經理，同時擔任香港社會創業論壇主席及都會大學校董會成員，長期支持香港高等教育與青年創業發展。",
    en: "Veteran business leader, Founder & MD of Hing Shun Group, Chairman of HKSEF, and HKMU Council Member. Long-time supporter of Hong Kong higher education and youth entrepreneurship."
  },
  "speaker.angel.name": { zh: "鄺善珩 Angel", en: "Angel Kwong" },
  "speaker.angel.role": { zh: "創想教育 Co-founder", en: "Co-founder, Inspire Education" },
  "speaker.angel.bio": {
    zh: "香港教育大學準畢業生，擁有五年數學教學經驗。將數學與科技結合，創辦「創想教育」，曾獲得60萬創業基金及受邀海外參展。",
    en: "EdUHK graduate with 5 years of math teaching experience. Founded Inspire Education combining math and tech, secured HK$600K funding and overseas exhibition invitations."
  },
  "speaker.ryan.name": { zh: "張永超 Ryan", en: "Ryan Zhang" },
  "speaker.ryan.role": { zh: "SMAR TECH MEDICINE COMPANY LIMITED CEO", en: "CEO, SMAR TECH MEDICINE COMPANY LIMITED" },
  "speaker.ryan.bio": {
    zh: "多次在權威創業大賽中獲獎，包括HKMU Hackathon冠軍、挑戰杯全國二等獎，擁有多年企業管理與創業經驗。",
    en: "Multiple award winner in prestigious startup competitions including HKMU Hackathon Champion and Challenge Cup National 2nd Prize, with years of enterprise management and startup experience."
  },
  "speaker.eric.name": { zh: "黃泳洋 Eric", en: "Eric Wong" },
  "speaker.eric.role": { zh: "有飯科技 RiceUp Co-Founder | 香港城市大學大三學生", en: "Co-Founder, RiceUp | Year 3, CityU" },
  "speaker.eric.bio": {
    zh: "曾創辦自媒體公司，擁有5年以上市場拓展和初創獲客0-1的實戰經驗。其參與創辦的 RiceUp，獲科學園及高校在內的多輪種子輪支持，擁有超萬人的私域社群，專注於讓用戶用科技，吃得好，省到錢。",
    en: "Founded a self-media company with 5+ years of market expansion and 0-to-1 customer acquisition experience. Co-founded RiceUp, backed by HKSTP and university seed rounds, with a 10,000+ private community focused on using tech to eat well and save money."
  },
  "speaker.bobo.name": { zh: "徐沛慈 Bobo", en: "Bobo Tsui" },
  "speaker.bobo.role": { zh: "HKIUSL 2026 發起人 | 杏林苑創辦人 | 安顏科技創辦人 | 香港都會大學商學院二年級", en: "HKIUSL 2026 Founder | Xinglin Yuan Founder | OnAn Technology Founder | Year 2, HKMU Business" },
  "speaker.bobo.bio": {
    zh: "作為青年創業者，現正推動兩個創新項目，包括以遊戲推廣中醫藥文化的「杏林苑」，以及結合 AI、3D 建模與 3D 打印技術的「安顏科技 OnAn Technology」。她曾獲數碼港創意微型基金（CCMF）港幣十萬元資助，並於 HKSTP Techathon+ 10A 及 HKSEC 2025-26 獲獎。",
    en: "As a young entrepreneur, she is driving two innovative projects: \"Xinglin Yuan\" promoting Chinese medicine culture through gaming, and \"OnAn Technology\" combining AI, 3D modeling, and 3D printing. She received HK$100K from Cyberport CCMF and won awards at HKSTP Techathon+ 10A and HKSEC 2025-26."
  },
  "speaker.xidorsi.name": { zh: "西DorSi", en: "SaiDorSi" },
  "speaker.xidorsi.role": { zh: "自媒體博主 | YouTube 頻道「西DorSi偽中產生活態度」", en: "Content Creator | YouTube Channel \"SaiDorSi\"" },
  "speaker.xidorsi.bio": {
    zh: "自媒體博主，營運 YouTube 頻道「西DorSi偽中產生活態度」9年，主要向香港人提供大中華地區文旅資訊，擁有超35萬訂閱及超1億收看次數，境內外所有平台粉絲量超77萬。西DorSi亦是暢銷書作者，著有數本大灣區城市的旅遊、移居攻略書。2025年，西DorSi亦獲得香港特別行政區律政司委任，成為大灣區專責小組成員。",
    en: "Content creator running the YouTube channel \"SaiDorSi\" for 9 years, providing Greater China travel info to Hong Kong audiences. Over 350K subscribers, 100M+ views, and 770K+ followers across all platforms. Bestselling author of GBA travel guides. Appointed to the HKSAR Department of Justice GBA Task Force in 2025."
  },
  "speaker.sophia.name": { zh: "林詠欣 Sophia", en: "Sophia Lam" },
  "speaker.sophia.role": { zh: "南區區議員 | 大灣區青年企業家協會創會會長", en: "Southern District Councillor | Founding President, GBA Youth Entrepreneurs" },
  "speaker.sophia.bio": {
    zh: "南區區議員，大灣區青年企業家協會創會會長，致力於推動青年創業與大灣區合作發展。",
    en: "Southern District Councillor and Founding President of GBA Youth Entrepreneurs, dedicated to promoting youth entrepreneurship and GBA cooperation."
  },
  "speaker.marcus.name": { zh: "余浩堃 Marcus", en: "Marcus Yu" },
  "speaker.marcus.role": { zh: "ScentSafe 創辦人 | 香港大學學生", en: "Founder, ScentSafe | HKU Student" },
  "speaker.marcus.bio": {
    zh: "ScentSafe 創辦人，香港大學學生，將分享創業歷程與產品開發經驗。",
    en: "Founder of ScentSafe and HKU student, sharing his startup journey and product development experience."
  },
  "speaker.emil.name": { zh: "陳家豪 Emil", en: "Emil Chan" },
  "speaker.emil.role": { zh: "大隊長 | 金融服務及初創業界資深人士", en: "Captain | Financial Services & Startup Industry Veteran" },
  "speaker.emil.bio": {
    zh: "Emil Chan 是金融服務及初創業界的知名人物，在跨境金融領域塑造了重要格局，並為企業提供數碼轉型的專業建議。他積極指導初創企業，在多所著名大學任教，並在多個具影響力的組織中擔任要職。Emil 的貢獻超越金融領域，持續啟發創新思維，並致力於培育良好的創業生態。",
    en: "Emil Chan is a recognized figure in the financial service and startup industries, shaping the cross-border financial landscape and advising corporations on digital transformation. He mentors startups, teaches at renowned universities, and holds key roles in influential organizations. His contributions extend beyond finance, inspiring innovation and fostering a nurturing ecosystem."
  },
  "speaker.vha_business.name": { zh: "Venture Hub Academy 代表（Business）", en: "Venture Hub Academy Rep (Business)" },
  "speaker.vha_business.role": { zh: "Venture Hub Academy 合夥人", en: "Venture Hub Academy Partner" },
  "speaker.vha_business.bio": {
    zh: "Venture Hub Academy 商業合夥人，將分享創業實戰經驗與商業策略見解。",
    en: "Venture Hub Academy business partner, sharing practical startup experience and business strategy insights."
  },
  "speaker.vha_tech.name": { zh: "Venture Hub Academy 代表（Tech）", en: "Venture Hub Academy Rep (Tech)" },
  "speaker.vha_tech.role": { zh: "Venture Hub Academy 技術團隊", en: "Venture Hub Academy Tech Team" },
  "speaker.vha_tech.bio": {
    zh: "Venture Hub Academy 技術團隊代表，將分享 AI 時代 Vibe Coding 的機遇與實踐。",
    en: "Venture Hub Academy tech team representative, sharing Vibe Coding opportunities and practices in the AI era."
  },
  "speaker.moda_panel.name": { zh: "香港設計文化協會 (MODA)", en: "MODA" },
  "speaker.moda_panel.role": { zh: "主辦座談協辦機構", en: "Panel Discussion Co-organizer" },
  "speaker.maurice.name": { zh: "Maurice", en: "Maurice" },
  "speaker.maurice.role": { zh: "香港設計文化協會 (MODA)", en: "MODA" },

  // Alias keys for Home.tsx compatibility
  "about.badge": { zh: "關於活動", en: "About" },
  "about.description": {
    zh: "近年香港政府大力推動大學技術轉移，鼓勵將學術研究成果轉化為商業應用。技術經理人（Technology Transfer Professional）正是這個過程中連結科技與商業的關鍵角色。本實戰營旨在讓大專學生在參加創業比賽前掌握基本概念，培養領導才能、商業知識與設計思維。",
    en: "In recent years, the Hong Kong government has been actively promoting university technology transfer, encouraging the commercialization of academic research. Technology Transfer Professionals are the key link between technology and business. This launchpad aims to equip university students with fundamental concepts before entering startup competitions, developing leadership, business acumen, and design thinking."
  },
  "about.imageCaption": { zh: "AI 生成活動模擬圖 — 主題演講", en: "AI-Generated Event Simulation — Keynote" },
  "about.feature1Title": { zh: "跨學科參與", en: "Cross-Disciplinary" },
  "about.feature1Desc": {
    zh: "不是只有理科生才可以參加高科技發展！商學院、設計學院學生同樣是技術經理人的最佳人選。",
    en: "Tech isn't just for STEM students! Business and design students are equally suited to become technology managers."
  },
  "about.feature2Title": { zh: "線上遊戲融合課程", en: "Gamified Learning" },
  "about.feature2Desc": {
    zh: "2026 年最大特色——將課程融入線上遊戲，讓學習變得更加互動有趣。",
    en: "The biggest highlight of 2026 — integrating courses into online games for interactive and engaging learning."
  },
  "about.feature3Title": { zh: "實戰創業體驗", en: "Real Startup Experience" },
  "about.feature3Desc": {
    zh: "從商業策略遊戲到 Startup Pitching，全方位模擬真實創業歷程。",
    en: "From business strategy games to Startup Pitching, a full simulation of the real entrepreneurial journey."
  },
  "hero.titleLine1": { zh: "香港跨大專", en: "Hong Kong Inter-University" },
  "hero.titleHighlight": { zh: "技術經理人", en: "Startup" },
  "hero.titleLine3": { zh: "實戰營 2026", en: "Launchpad 2026" },
  "hero.description": {
    zh: "匯聚香港各大專院校學生，透過實戰工作坊、創業比賽與業界交流，培育下一代技術經理人。不只是理科生的舞台——商科、設計、人文學科同樣大放異彩。",
    en: "Bringing together students from universities across Hong Kong through hands-on workshops, startup competitions, and industry networking to nurture the next generation of technology managers. Not just for STEM — business, design, and humanities students shine equally."
  },
  "hero.hkmuNotice": {
    zh: "🎓 HKMU 學生可免費參加！完成活動後，可向學校申請 Student Life Enrichment Subsidy Scheme，每宗申請最高可獲 HK$300 資助，以報銷全額報名！",
    en: "🎓 HKMU students can join for FREE! After the event, apply for the Student Life Enrichment Subsidy Scheme for up to HK$300 reimbursement!"
  },
  "hero.statDaysSuffix": { zh: "天", en: "Days" },
  "hero.statEvents": { zh: "精彩活動", en: "Action-Packed" },
  "hero.statSpeakers": { zh: "業界嘉賓", en: "Industry Guests" },
  "hero.statStudents": { zh: "參與學生", en: "Student Participants" },
  "hero.followUs": { zh: "追蹤我們", en: "Follow Us" },
  "features.badge": { zh: "活動亮點", en: "Highlights" },
  "features.subtitle": { zh: "從演講到實戰，全方位提升你的創業與管理能力", en: "From keynotes to hands-on practice, elevate your entrepreneurial and management skills" },
  "features.item1Title": { zh: "星級嘉賓演講", en: "Star Guest Keynotes" },
  "features.item1Desc": { zh: "邀請來自不同大學的創業者分享創業政策與實戰經驗。", en: "Inviting entrepreneurs from various universities to share startup policies and real-world experience." },
  "features.item2Title": { zh: "商業策略遊戲", en: "Business Strategy Games" },
  "features.item2Desc": { zh: "透過互動遊戲學習商業策略、專利佈局與思維訓練，寓教於樂。", en: "Learn business strategy, patent layout, and critical thinking through interactive games." },
  "features.item3Title": { zh: "極創客 Pitching", en: "Hackathon Pitching" },
  "features.item3Desc": { zh: "組隊參加極創客挑戰，在限時內完成創業提案並向評審進行路演。", en: "Form teams for the hackathon challenge, complete a startup proposal within the time limit and pitch to judges." },
  "schedule.badge": { zh: "日程安排", en: "Schedule" },
  "schedule.subtitle": { zh: "從早到晚，沉浸式體驗創業全流程", en: "From morning to evening, an immersive full startup experience" },
  "gallery.badge": { zh: "活動花絮", en: "Gallery" },
  "testimonial.badge": { zh: "學生心聲", en: "Testimonials" },
  "partners.badge": { zh: "合作夥伴", en: "Partners" },
  "signup.badge": { zh: "立即行動", en: "Take Action" },

  // Partner names
  "partner.moda": { zh: "香港設計文化協會 (MODA)", en: "MODA (HK Design Culture Association)" },
  "partner.hkceces": { zh: "幼聯 (HKCECES)", en: "HKCECES" },
  "partner.gungho": { zh: "工合空間 (GUNGHO SPACE)", en: "GUNGHO SPACE" },
  "partner.vha": { zh: "Venture Hub Academy", en: "Venture Hub Academy" },

  // Company names
  "company.inspireEdu": { zh: "創想教育 Inspire Education", en: "Inspire Education" },
  "company.riceUp": { zh: "有飯科技 RiceUp", en: "RiceUp" },
  "company.xinglinYuan": { zh: "杏林苑 Xinglin Yuan", en: "Xinglin Yuan" },
  "company.onan": { zh: "安顏科技 OnAn Technology", en: "OnAn Technology" },
  "company.gba": { zh: "大灣區青年企業家協會", en: "GBA Youth Entrepreneurs Association" },
  "company.scentsafe": { zh: "ScentSafe", en: "ScentSafe" },
  "company.hkdfa": { zh: "Hong Kong Digital Finance Association", en: "Hong Kong Digital Finance Association" },
  "company.moda": { zh: "香港設計文化協會 MODA", en: "MODA" },
  "company.vha": { zh: "Venture Hub Academy", en: "Venture Hub Academy" },
  "company.pea": { zh: "菁創匯 Pioneer Elite Alliance", en: "Pioneer Elite Alliance" },

  // Nathan Chau speaker
  "speaker.nathan.name": { zh: "周卓然 Nathan, MH", en: "Nathan Chau, MH" },
  "speaker.nathan.role": { zh: "菁創匯創辦人 | 榮譽勳章得主 | 清華大學公共管理碩士（在讀）", en: "Founder, Pioneer Elite Alliance | MH Awardee | Tsinghua EMPA Candidate" },
  "speaker.nathan.bio": {
    zh: "周卓然（Nathan）是一位結合金融、創新科技與公共政策的跨界實踐者，擁有逾十年金融及財富管理經驗。他長期關注科技如何改變產業與創業模式，特別是 AI 與科技金融（FinTech）在新一代創業生態中的應用。Nathan 創立菁創匯，積極推動青年創業與跨界發展。在公共領域，他參與多個政府及公營機構委員會工作，專注青年發展、創新政策及可持續發展，2024 年獲香港特區政府頒授榮譽勳章（MH）。他持有麥覺理大學應用金融學學士、曼徹斯特大學 MBA 及 CESGA 專業資格，現正於清華大學攻讀公共管理碩士（EMPA）。",
    en: "Nathan Chau is a cross-disciplinary practitioner bridging finance, innovation technology, and public policy, with over a decade of experience in financial and wealth management. He focuses on how technology transforms industries and entrepreneurship, particularly the application of AI and FinTech in the next-generation startup ecosystem. Nathan founded Pioneer Elite Alliance to actively promote youth entrepreneurship and cross-sector development. In the public domain, he serves on multiple government and public body committees focusing on youth development, innovation policy, and sustainability, and was awarded the Medal of Honour (MH) by the HKSAR Government in 2024. He holds a Bachelor's in Applied Finance from Macquarie University, an MBA from the University of Manchester, and the CESGA certification, and is currently pursuing an EMPA at Tsinghua University."
  },

  // Language toggle
  "lang.zh": { zh: "中", en: "中" },
  "lang.en": { zh: "EN", en: "EN" },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry["zh"] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
