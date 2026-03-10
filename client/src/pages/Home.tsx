/**
 * 香港跨大專技術經理人實戰營 2026 — Landing Page
 * Design: 「科技浪潮」動態流體設計
 * Colors: Midnight Blue (#1a1a4e), Lavender (#b8a9d4), Cream (#faf8f5)
 * Font: Noto Sans TC (黑體) + Space Grotesk
 */
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
  Lightbulb,
  Rocket,
  Award,
  Clock,
  ArrowRight,
  Mail,
  Phone,
  ExternalLink,
  Gamepad2,
  Presentation,
  Trophy,
  Quote,
} from "lucide-react";

// ─── Image URLs ───
const IMAGES = {
  heroKeynote: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-keynote-FHxbKQohKtGLCBgQEATRgn.webp",
  workshop: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-workshop-buh2jRvNAAKfU3Jxr8nKX9.webp",
  pitching: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-pitching-jbfRkMTdjcQh9bkdhvwRRe.webp",
  networking: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-networking-Zngcii88BVTf8WnFrAWcaS.webp",
  teamwork: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-teamwork-2us5fcDiKCjksK8cB3wbep.webp",
  venuePhoto1: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-photo-1_4875d279.jpg",
  venuePhoto2: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-photo-2_04e4897f.jpg",
  venuePhoto3: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-photo-3_416c0461.jpg",
  venuePhoto4: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-photo-4_38c516eb.jpg",
  venuePhoto5: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venue-photo-5_1dfa06e8.jpg",
  heroBanner: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/hero-banner_8b36b15d.png",
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/logo_069317ec.png",
  boboPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/bobo-photo_dc91281d.png",
};

const PARTNER_LOGOS = [
  { name: "香港設計文化協會 (MODA)", logo: "https://i.postimg.cc/pLgVQ1bW/moda_logo_2.png" },
  { name: "幼聯 (HKCECES)", logo: "https://i.postimg.cc/LXjgQVVc/icon5.png" },
  { name: "工合空間 (GUNGHO SPACE)", logo: "https://i.postimg.cc/2SY3X6VN/new-logo.png" },
];

// ─── Animation Variants ───
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Wave SVG Dividers ───
function WaveDividerTop({ color = "#faf8f5" }: { color?: string }) {
  return (
    <div className="w-full overflow-hidden leading-[0] -mb-1">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
        <path
          d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

function WaveDividerBottom({ color = "#1a1a4e" }: { color?: string }) {
  return (
    <div className="w-full overflow-hidden leading-[0] -mt-1">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
        <path
          d="M0,60 C200,0 400,120 600,60 C800,0 1000,120 1200,60 L1200,0 L0,0 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

// ─── Navigation ───
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "關於活動", href: "#about" },
    { label: "活動亮點", href: "#features" },
    { label: "日程安排", href: "#schedule" },
    { label: "活動花絮", href: "#gallery" },
    { label: "合作機構", href: "#partners" },
    { label: "報名", href: "#signup" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-2">
          <img
            src={IMAGES.logo}
            alt="HKIUSL 2026"
            className={`h-8 md:h-10 w-auto transition-all ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#b8a9d4] ${
                scrolled ? "text-[#1a1a4e]" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#signup">
            <Button
              className="bg-[#b8a9d4] hover:bg-[#a08ec0] text-[#1a1a4e] font-semibold rounded-full px-6"
            >
              立即報名
            </Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-[#1a1a4e]" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-[#1a1a4e]" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-[#1a1a4e]" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg border-t"
        >
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#1a1a4e] font-medium py-2 border-b border-[#e8e0f0]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#signup" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#1a1a4e] hover:bg-[#2a2a6e] text-white rounded-full mt-2">
                立即報名
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

// ─── Hero Section ───
function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroBanner}
          alt="活動背景"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a4e]/90 via-[#1a1a4e]/75 to-[#3a2a6e]/65 md:bg-gradient-to-br md:from-[#1a1a4e]/85 md:via-[#1a1a4e]/70 md:to-[#3a2a6e]/60" />
      </div>

      {/* Floating decorative circles - hidden on small mobile */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#b8a9d4]/10 blur-3xl hidden md:block" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#b8a9d4]/8 blur-3xl hidden md:block" />

      <div className="container relative z-10 pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-[#b8a9d4]/20 text-[#d4c8e8] text-xs md:text-sm font-medium mb-4 md:mb-6 backdrop-blur-sm border border-[#b8a9d4]/20">
              2026 年 4 月 11-19 日
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 md:mb-6"
          >
            香港跨大專
            <br />
            <span className="text-[#d4c8e8]">技術經理人</span>
            <br />
            實戰營 2026
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl leading-relaxed"
          >
            匯聚香港各大專院校學生，透過實戰工作坊、創業比賽與業界交流，
            培育下一代技術經理人。不只是理科生的舞台——商科、設計、人文學科同樣大放異彩。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <a href="#signup">
              <Button className="w-full sm:w-auto bg-[#b8a9d4] hover:bg-[#a08ec0] text-[#1a1a4e] font-bold text-base md:text-lg rounded-full px-6 py-5 md:px-8 md:py-6 shadow-lg shadow-[#b8a9d4]/25 transition-transform hover:scale-105">
                立即報名 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="#about">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-medium text-base md:text-lg rounded-full px-6 py-5 md:px-8 md:py-6 backdrop-blur-sm"
              >
                了解更多
              </Button>
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8 md:mt-12 grid grid-cols-3 gap-6 md:gap-8 md:flex md:flex-wrap"
          >
            {[
              { num: "2天", label: "精彩活動" },
              { num: "6+", label: "業界嘉賓" },
              { num: "150+", label: "參與學生" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl md:text-4xl font-bold text-[#d4c8e8]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.num}
                </div>
                <div className="text-white/60 text-xs md:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <WaveDividerTop color="#faf8f5" />
    </section>
  );
}

// ─── About Section ───
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#faf8f5]">
      <div className="container">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e8e0f0] text-[#5a4a7a] text-sm font-medium mb-4">
              關於活動
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4e] mb-4">
              什麼是技術經理人實戰營？
            </h2>
            <p className="text-[#5a5a7a] max-w-2xl mx-auto text-lg leading-relaxed">
              技術經理人（Technology Manager / Tech Broker）是連結科技與商業的關鍵角色。
              本實戰營旨在讓大專學生在參加創業比賽前掌握基本概念，培養領導才能、商業知識與設計思維。
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={IMAGES.heroKeynote}
                alt="主題演講活動"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a1a4e]/80 to-transparent p-6">
                <p className="text-white text-sm font-medium">AI 生成活動模擬圖 — 主題演講</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#e8e0f0] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#5a4a7a]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a4e] text-lg mb-1">跨學科參與</h3>
                <p className="text-[#5a5a7a]">
                  不是只有理科生才可以參加高科技發展！商學院、設計學院學生同樣是技術經理人的最佳人選。
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#fce8d0] flex items-center justify-center shrink-0">
                <Gamepad2 className="w-6 h-6 text-[#8a6a3a]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a4e] text-lg mb-1">線上遊戲融合課程</h3>
                <p className="text-[#5a5a7a]">
                  2026 年最大特色——將課程融入線上遊戲，讓學習變得更加互動有趣。
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#d0e8f0] flex items-center justify-center shrink-0">
                <Rocket className="w-6 h-6 text-[#3a6a8a]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a4e] text-lg mb-1">實戰創業體驗</h3>
                <p className="text-[#5a5a7a]">
                  從商業策略遊戲到 Startup Pitching，全方位模擬真實創業歷程。
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Features Grid ───
function FeaturesSection() {
  const features = [
    {
      icon: <Presentation className="w-8 h-8" />,
      title: "業界嘉賓演講",
      desc: "邀請來自理工大學、立法會議員等重量級嘉賓，分享創業政策與實戰經驗。",
      color: "from-[#1a1a4e] to-[#2a3a6e]",
      iconBg: "bg-[#d4c8e8]",
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "商業策略遊戲",
      desc: "透過互動遊戲學習商業策略、專利佈局與思維訓練，寓教於樂。",
      color: "from-[#5a4a7a] to-[#7a6a9a]",
      iconBg: "bg-[#fce8d0]",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "極創客 Pitching",
      desc: "組隊參加極創客挑戰，在限時內完成創業提案並向評審進行路演。",
      color: "from-[#3a6a8a] to-[#4a8aaa]",
      iconBg: "bg-[#d0f0e8]",
    },
  ];

  return (
    <section id="features" className="relative">
      <WaveDividerBottom color="#faf8f5" />
      <div className="bg-[#1a1a4e] py-20 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-[#b8a9d4]/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-[#b8a9d4]/8 blur-3xl" />

        <div className="container relative z-10">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#b8a9d4]/20 text-[#d4c8e8] text-sm font-medium mb-4">
                活動亮點
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                三大核心體驗
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                從演講到實戰，全方位提升你的創業與管理能力
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-80`} />
                <div className="relative p-8 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl ${f.iconBg} flex items-center justify-center mb-6 text-[#1a1a4e] group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/70 leading-relaxed flex-1">{f.desc}</p>
                  <div className="mt-6 flex items-center text-[#d4c8e8] text-sm font-medium group-hover:translate-x-2 transition-transform">
                    了解更多 <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </div>
      <WaveDividerTop color="#faf8f5" />
    </section>
  );
}

// ─── Schedule Section ───
function ScheduleSection() {
  const [activeDay, setActiveDay] = useState(0);

  const days = [
    {
      date: "4月11日（六）",
      venue: "都會大學演講廳",
      label: "開幕禮・演講・授課",
      items: [
        { time: "10:00", event: "簽到（QR Code）", type: "general" },
        { time: "10:30", event: "開幕典禮・大合照", type: "highlight" },
        { time: "10:35", event: "開場白", type: "general" },
        { time: "10:40", event: "都會大學校董致辭", type: "speech" },
        { time: "10:50", event: "副校長致辭", type: "speech" },
        { time: "11:00", event: "嘉賓 A 分享（理工大學）", type: "speech" },
        { time: "11:20", event: "嘉賓 B 分享（立法會議員）", type: "speech" },
        { time: "11:40", event: "創業政策分享", type: "speech" },
        { time: "11:55", event: "主辦座談（MODA）", type: "speech" },
        { time: "12:30", event: "Q & A 環節", type: "general" },
        { time: "12:40", event: "自由交流・午餐", type: "break" },
        { time: "14:15", event: "商業策略遊戲", type: "highlight" },
        { time: "14:30", event: "Startup 分享", type: "speech" },
        { time: "14:50", event: "思維策略遊戲", type: "highlight" },
        { time: "15:00", event: "Rice Up 環節", type: "highlight" },
        { time: "15:15", event: "Angel 投資分享", type: "speech" },
        { time: "15:30", event: "專利策略遊戲", type: "highlight" },
        { time: "16:00", event: "MODA 分享", type: "speech" },
        { time: "16:30", event: "工作坊講解", type: "general" },
        { time: "17:00", event: "Day 1 完結", type: "general" },
      ],
    },
    {
      date: "4月12日（日）",
      venue: "柴灣青年廣場「青立方」",
      label: "工作坊・極創客",
      items: [
        { time: "10:00", event: "簽到（QR Code）", type: "general" },
        { time: "10:30", event: "開始・大合照", type: "highlight" },
        { time: "10:35", event: "開場白", type: "general" },
        { time: "10:40", event: "選隊長", type: "highlight" },
        { time: "11:00", event: "組隊 + 破冰活動", type: "highlight" },
        { time: "12:00", event: "大隊長駕到", type: "speech" },
        { time: "12:45", event: "午餐", type: "break" },
        { time: "14:00", event: "極創客工作坊", type: "highlight" },
        { time: "17:30", event: "Pitching 路演", type: "highlight" },
        { time: "18:30", event: "Day 2 完結", type: "general" },
      ],
    },
    {
      date: "4月13-18日",
      venue: "線上",
      label: "線上投票・AI 評審",
      items: [
        { time: "全天", event: "線上投票開放", type: "highlight" },
        { time: "全天", event: "AI 評審系統運作", type: "highlight" },
        { time: "全天", event: "作品展示平台", type: "general" },
      ],
    },
    {
      date: "4月19日（六）",
      venue: "線上",
      label: "宣佈優秀作品",
      items: [
        { time: "待定", event: "線上宣佈優秀作品", type: "highlight" },
        { time: "待定", event: "頒獎典禮", type: "highlight" },
      ],
    },
  ];

  const typeColors: Record<string, string> = {
    highlight: "bg-[#b8a9d4] text-[#1a1a4e]",
    speech: "bg-[#d0e8f0] text-[#2a5a7a]",
    break: "bg-[#fce8d0] text-[#7a5a2a]",
    general: "bg-[#e8e0f0] text-[#5a4a7a]",
  };

  return (
    <section id="schedule" className="py-20 bg-[#faf8f5]">
      <div className="container">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e8e0f0] text-[#5a4a7a] text-sm font-medium mb-4">
              日程安排
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4e] mb-4">
              活動時間表
            </h2>
          </motion.div>
        </AnimatedSection>

        {/* Day tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                activeDay === i
                  ? "bg-[#1a1a4e] text-white shadow-lg shadow-[#1a1a4e]/20"
                  : "bg-white text-[#5a5a7a] hover:bg-[#e8e0f0] border border-[#e0d8f0]"
              }`}
            >
              <div className="font-bold">{day.date}</div>
              <div className="text-xs mt-0.5 opacity-80">{day.label}</div>
            </button>
          ))}
        </div>

        {/* Schedule content */}
        <AnimatedSection>
          <motion.div variants={fadeIn} className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-[#e8e0f0] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1a1a4e] to-[#3a2a6e] p-6">
                <div className="flex items-center gap-3 text-white">
                  <Calendar className="w-5 h-5" />
                  <span className="font-bold">{days[activeDay].date}</span>
                  <span className="text-white/60">|</span>
                  <MapPin className="w-5 h-5" />
                  <span>{days[activeDay].venue}</span>
                </div>
              </div>

              {/* Items */}
              <div className="p-6 space-y-3">
                {days[activeDay].items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#faf8f5] transition-colors"
                  >
                    <div
                      className="w-16 text-center font-bold text-[#1a1a4e] shrink-0"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.time}
                    </div>
                    <div className="w-1 h-8 rounded-full bg-[#e8e0f0]" />
                    <div className="flex-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${typeColors[item.type]}`}>
                        {item.event}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Gallery Section (AI Generated + Real Venue Photos) ───
function GallerySection() {
  const aiPhotos = [
    { src: IMAGES.heroKeynote, label: "AI 模擬 — 主題演講" },
    { src: IMAGES.workshop, label: "AI 模擬 — 工作坊" },
    { src: IMAGES.pitching, label: "AI 模擬 — 創業路演" },
    { src: IMAGES.networking, label: "AI 模擬 — 交流活動" },
    { src: IMAGES.teamwork, label: "AI 模擬 — 團隊合作" },
  ];

  const venuePhotos = [
    { src: IMAGES.venuePhoto1, label: "柴灣青年廣場 — 演講廳" },
    { src: IMAGES.venuePhoto2, label: "柴灣青年廣場 — 開放空間" },
    { src: IMAGES.venuePhoto3, label: "柴灣青年廣場 — 座位區" },
    { src: IMAGES.venuePhoto4, label: "柴灣青年廣場 — 休憩區" },
  ];

  return (
    <section id="gallery" className="relative">
      <WaveDividerBottom color="#faf8f5" />
      <div className="bg-[#1a1a4e] py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#b8a9d4]/5 blur-3xl" />

        <div className="container relative z-10">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#b8a9d4]/20 text-[#d4c8e8] text-sm font-medium mb-4">
                活動花絮
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                AI 生成活動模擬圖
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                以下照片由人工智慧根據柴灣青年廣場實地場景生成，模擬活動進行時的精彩畫面
              </p>
            </motion.div>
          </AnimatedSection>

          {/* AI Generated Photos */}
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {aiPhotos.map((photo, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-xs font-medium">{photo.label}</p>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>

          {/* Real Venue Photos */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-2">場地實景</h3>
              <p className="text-white/50 text-sm">柴灣青年廣場「青立方」實地照片</p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {venuePhotos.map((photo, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-xs font-medium">{photo.label}</p>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </div>
      <WaveDividerTop color="#faf8f5" />
    </section>
  );
}

// ─── Testimonial Carousel ───
function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    {
      quote: "這個實戰營讓我明白，創業不只是寫程式，更需要商業策略和團隊合作。作為商科生，我終於找到了自己在科技領域的定位。",
      name: "陳同學",
      school: "都會大學商學院",
      avatar: "C",
    },
    {
      quote: "線上遊戲融合課程的方式非常創新，讓原本枯燥的商業理論變得生動有趣。Pitching 環節更是讓我突破了自己的舒適圈。",
      name: "李同學",
      school: "理工大學設計學院",
      avatar: "L",
    },
    {
      quote: "認識了來自不同大專的同學，大家各有專長，互相學習。這種跨校合作的經驗是課堂上學不到的寶貴財富。",
      name: "王同學",
      school: "城市大學工程學院",
      avatar: "W",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-[#faf8f5]">
      <div className="container">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e8e0f0] text-[#5a4a7a] text-sm font-medium mb-4">
              學生心聲
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4e] mb-4">
              參與者分享
            </h2>
          </motion.div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-xl border border-[#e8e0f0] p-8 md:p-12">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-[#e8e0f0]" />

            <div className="relative z-10">
              <p className="text-lg md:text-xl text-[#3a3a5a] leading-relaxed mb-8 italic">
                "{testimonials[current].quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b8a9d4] to-[#8a7ab4] flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="font-bold text-[#1a1a4e]">{testimonials[current].name}</div>
                  <div className="text-sm text-[#8a8a9a]">{testimonials[current].school}</div>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === current
                      ? "bg-[#b8a9d4] w-8"
                      : "bg-[#e0d8f0] hover:bg-[#d0c8e0]"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#faf8f5] border border-[#e8e0f0] flex items-center justify-center text-[#5a4a7a] hover:bg-[#e8e0f0] transition-colors hidden md:flex"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrent((current + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#faf8f5] border border-[#e8e0f0] flex items-center justify-center text-[#5a4a7a] hover:bg-[#e8e0f0] transition-colors hidden md:flex"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Partners Section ───
function PartnersSection() {
  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e8e0f0] text-[#5a4a7a] text-sm font-medium mb-4">
              合作夥伴
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4e] mb-4">
              合作機構
            </h2>
            <p className="text-[#5a5a7a] max-w-xl mx-auto">
              資金贊助：新昌葉庚年教育基金——聯合學生項目基金
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {PARTNER_LOGOS.map((partner, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white shadow-lg border border-[#e8e0f0] flex items-center justify-center p-4 group-hover:shadow-xl transition-shadow group-hover:-translate-y-1 transition-transform">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="text-sm text-[#5a5a7a] font-medium text-center">{partner.name}</span>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Signup Section ───
function SignupSection() {
  const [formType, setFormType] = useState<"student" | "org">("student");

  return (
    <section id="signup" className="relative">
      <WaveDividerBottom color="white" />
      <div className="bg-gradient-to-br from-[#1a1a4e] via-[#2a2a6e] to-[#3a2a6e] py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#b8a9d4]/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#b8a9d4]/5 blur-3xl" />

        <div className="container relative z-10">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#b8a9d4]/20 text-[#d4c8e8] text-sm font-medium mb-4">
                立即行動
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                報名參加
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                名額有限，先到先得。立即報名成為 2026 年技術經理人實戰營的一員！
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="max-w-lg mx-auto">
            {/* Toggle */}
            <div className="flex gap-2 bg-[#0d0d3a] rounded-xl p-1 mb-8">
              <button
                onClick={() => setFormType("student")}
                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${
                  formType === "student"
                    ? "bg-[#b8a9d4] text-[#1a1a4e]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                學生報名
              </button>
              <button
                onClick={() => setFormType("org")}
                className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${
                  formType === "org"
                    ? "bg-[#b8a9d4] text-[#1a1a4e]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                協辦機構申請
              </button>
            </div>

            {/* Form */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    {formType === "student" ? "姓名" : "機構名稱"}
                  </label>
                  <input
                    type="text"
                    placeholder={formType === "student" ? "請輸入你的姓名" : "請輸入機構名稱"}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#b8a9d4] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">電郵地址</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#b8a9d4] transition-colors"
                  />
                </div>
                {formType === "student" && (
                  <div>
                    <label className="block text-white/80 text-sm mb-2">就讀院校</label>
                    <input
                      type="text"
                      placeholder="請輸入你的大專院校"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#b8a9d4] transition-colors"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    {formType === "student" ? "聯絡電話" : "聯絡人電話"}
                  </label>
                  <input
                    type="tel"
                    placeholder="請輸入電話號碼"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#b8a9d4] transition-colors"
                  />
                </div>
                <Button
                  className="w-full bg-[#b8a9d4] hover:bg-[#a08ec0] text-[#1a1a4e] font-bold py-6 rounded-xl text-lg mt-4 shadow-lg shadow-[#b8a9d4]/20 transition-transform hover:scale-[1.02]"
                  onClick={() => {
                    import("sonner").then(({ toast }) => {
                      toast.success("感謝您的報名！我們將盡快與您聯繫。");
                    });
                  }}
                >
                  {formType === "student" ? "提交學生報名" : "提交機構申請"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="bg-[#0d0d2a] py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img
              src={IMAGES.logo}
              alt="HKIUSL 2026"
              className="h-10 w-auto brightness-0 invert mb-4"
            />
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              香港跨大專技術經理人實戰營 2026
              <br />
              Hong Kong Inter-University Startup Launchpad 2026
            </p>
            <div className="flex flex-col items-start gap-3 mt-4">
              <img
                src={IMAGES.boboPhoto}
                alt="Bobo Tsui"
                className="rounded-full object-cover border-2 border-[#b8a9d4]/30"
                style={{ width: "200px", height: "200px" }}
              />
              <p className="text-white/50 text-sm font-medium">
                主辦人：Bobo Tsui
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速連結</h4>
            <div className="space-y-3">
              {[
                { label: "關於活動", href: "#about" },
                { label: "活動亮點", href: "#features" },
                { label: "日程安排", href: "#schedule" },
                { label: "活動花絮", href: "#gallery" },
                { label: "合作機構", href: "#partners" },
                { label: "報名", href: "#signup" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/50 hover:text-[#b8a9d4] text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">聯絡我們</h4>
            <div className="space-y-3">
              <a
                href="tel:98485603"
                className="flex items-center gap-3 text-white/50 hover:text-[#b8a9d4] text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                98485603
              </a>
              <a
                href="mailto:hkiusl.startup@gmail.com"
                className="flex items-center gap-3 text-white/50 hover:text-[#b8a9d4] text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                hkiusl.startup@gmail.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {["facebook", "instagram", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#b8a9d4] hover:border-[#b8a9d4]/30 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    import("sonner").then(({ toast }) => {
                      toast("社交媒體連結即將推出");
                    });
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; 2026 香港跨大專技術經理人實戰營. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            資金贊助：新昌葉庚年教育基金——聯合學生項目基金
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ScheduleSection />
      <GallerySection />
      <TestimonialSection />
      <PartnersSection />
      <SignupSection />
      <Footer />
    </div>
  );
}
