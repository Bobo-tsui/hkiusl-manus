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
  Rocket,
  ArrowRight,
  Mail,
  ExternalLink,
  Gamepad2,
  Presentation,
  Trophy,
  Quote,
  Clock,
  Heart,
  Sparkles,
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
  boboPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/bobo-photo-new_1df623ab.jpeg",
  angelPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/angel-photo_25fbc91b.jpeg",
  alanPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/alan-cheung-photo_2c32214a.jpg",
  ryanPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/ryan-photo_52137c0c.png",
  inspireEduLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/inspire-education-logo_7e0d8b46.png",
  ericPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/eric-photo-v2_23d3407a.jpeg",
  riceUpLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/RiceUp-Eric_3a90cbde.jpeg",
  modaLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/moda-logo_09948e95.png",
  xinglinYuanLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/xinglin-yuan-logo_bca5a808.png",
  xidorsiPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/xidorsi-photo_8c37cb8f.jpg",
  scentsafeLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/scentsafe-logo-new_47ec5bed.png",
  onanLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/onan-logo_e7683513.jpeg",
  marcusPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/marcus-photo_893ddebc.jpg",
  sophiaPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/sophia-lam-photo_bda96cd1.jpg",
  emilChanPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/emil-chan-photo_f68382d2.jpg",
  hkdfaLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/hkdfa-logo_79941dde.png",
  gbaLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/gbayouthent_e334847a.png",
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
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-20">
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

// ─── Countdown Timer ───
function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const deadline = new Date('2026-04-01T23:59:59+08:00').getTime();

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = deadline - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const expired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
  if (expired) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#ff6b9d] via-[#ff5588] to-[#ff6b9d] text-white py-2 text-center shadow-md">
      <div className="container flex items-center justify-center gap-2 text-sm font-medium">
        <Clock className="w-4 h-4 animate-pulse" />
        <span>報名截止倒數：</span>
        <span className="font-black tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {timeLeft.days}<span className="text-white/70 text-xs mx-0.5">天</span>
          {String(timeLeft.hours).padStart(2, '0')}<span className="text-white/70 text-xs mx-0.5">時</span>
          {String(timeLeft.minutes).padStart(2, '0')}<span className="text-white/70 text-xs mx-0.5">分</span>
          {String(timeLeft.seconds).padStart(2, '0')}<span className="text-white/70 text-xs mx-0.5">秒</span>
        </span>
        <a
          href={JOTFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 px-3 py-0.5 rounded-full bg-white text-[#ff5588] text-xs font-bold hover:bg-white/90 transition-colors"
        >
          立即報名
        </a>
      </div>
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
    { label: "報名", href: JOTFORM_URL, external: true },
  ];

  return (
    <nav
      className={`fixed top-[36px] left-0 right-0 z-50 transition-all duration-300 ${
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
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`text-sm font-medium transition-colors hover:text-[#b8a9d4] ${
                scrolled ? "text-[#1a1a4e]" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href={JOTFORM_URL} target="_blank" rel="noopener noreferrer">
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
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[#1a1a4e] font-medium py-2 border-b border-[#e8e0f0]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href={JOTFORM_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
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
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroBanner}
          alt="活動背景"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a4e]/90 via-[#1a1a4e]/75 to-[#3a2a6e]/65 md:bg-gradient-to-br md:from-[#1a1a4e]/85 md:via-[#1a1a4e]/70 md:to-[#3a2a6e]/60" />
      </div>

      {/* Floating decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#b8a9d4]/10 blur-3xl hidden md:block" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#b8a9d4]/8 blur-3xl hidden md:block" />

      {/* Content */}
      <div className="relative z-10 container min-h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-6xl flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto"
          >
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-[#b8a9d4]/20 text-[#d4c8e8] text-xs md:text-sm font-medium mb-4 md:mb-6 backdrop-blur-sm border border-[#b8a9d4]/20">
              2026 年 4 月 11-19 日
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto text-3xl md:text-5xl lg:text-[4rem] xl:text-[5rem] font-black mb-3 md:mb-5 tracking-wide text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#ff6b9d" }}
          >
            Win the Race Before AI
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto text-3xl md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3.2rem] font-black text-white leading-tight mb-4 md:mb-6 text-center"
          >
            <span className="hidden md:inline whitespace-nowrap">
              香港跨大專<span className="text-[#d4c8e8]">技術經理人</span>實戰營 2026
            </span>
            <span className="md:hidden">
              香港跨大專<br />
              <span className="text-[#d4c8e8]">技術經理人</span><br />
              實戰營 2026
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto text-base md:text-xl text-white/80 mb-6 md:mb-8 max-w-4xl leading-relaxed text-center"
          >
            匯聚香港各大專院校學生，透過實戰工作坊、創業比賽與業界交流，
            培育下一代技術經理人。不只是理科生的舞台——商科、設計、人文學科同樣大放異彩。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mx-auto flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
          >
            <a href={JOTFORM_URL} target="_blank" rel="noopener noreferrer" className="flex justify-center">
              <Button className="inline-flex items-center justify-center bg-[#b8a9d4] hover:bg-[#a08ec0] text-[#1a1a4e] font-bold text-base md:text-lg rounded-full px-6 py-5 md:px-8 md:py-6 shadow-lg shadow-[#b8a9d4]/25 transition-transform hover:scale-105">
                立即報名<ArrowRight className="ml-2.5 w-5 h-5 shrink-0" />
              </Button>
            </a>
            <a href="#about" className="flex justify-center">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-medium text-base md:text-lg rounded-full px-6 py-5 md:px-8 md:py-6 backdrop-blur-sm"
              >
                了解更多
              </Button>
            </a>
            <a href="https://www.instagram.com/hkiusl.startup/" target="_blank" rel="noopener noreferrer" className="flex justify-center">
              <Button
                variant="outline"
                className="border-[#E1306C]/50 text-white hover:bg-[#E1306C]/20 font-medium text-base md:text-lg rounded-full px-6 py-5 md:px-8 md:py-6 backdrop-blur-sm gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Follow Us
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mx-auto mt-4 md:mt-5 max-w-3xl"
          >
            <div className="rounded-2xl border border-[#ffe6a8]/40 bg-white/10 backdrop-blur-md px-4 py-3 md:px-5 md:py-4 text-center shadow-lg animate-glow-hkmu">
              <p className="text-sm md:text-base font-semibold text-[#ffe6a8]">
                🎓 HKMU 學生可免費參加！完成活動後，可向學校申請 Student Life Enrichment Subsidy Scheme，
                每宗申請最高可獲 HK$300 資助，以報銷全額報名！
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mx-auto mt-8 md:mt-12 grid grid-cols-3 gap-6 md:gap-8"
          >
            {[
              { num: "2", suffix: "天", label: "精彩活動" },
              { num: "6+", label: "業界嘉賓" },
              { num: "150+", label: "參與學生" },
            ].map((stat: { num: string; suffix?: string; label: string }) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl md:text-4xl font-bold text-[#d4c8e8]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.num}
                  {stat.suffix && <span className="text-xl md:text-3xl">{stat.suffix}</span>}
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
              近年香港政府大力推動大學技術轉移，鼓勵將學術研究成果轉化為商業應用。技術經理人（Technology Transfer Professional）正是這個過程中連結科技與商業的關鍵角色。
              本實戰營旨在讓大專學生在參加創業比賽前掌握基本概念，培養領導才能、商業知識與設計思維。
            </p>
            <p className="text-[#7a5a9a] max-w-2xl mx-auto text-base mt-4 font-medium bg-[#e8e0f0] rounded-xl px-6 py-3 animate-glow-student">
              本活動完全由學生發起，由香港都會大學、香港理工大學及香港城市大學的學生主導籌辦。
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
      title: "星級嘉賓演講",
      desc: "邀請來自不同大學的創業者分享創業政策與實戰經驗。",
      color: "from-[#1a1a4e] to-[#2a3a6e]",
      iconBg: "bg-[#d4c8e8]",
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "商業策略遊戲",
      desc: "透過互動遊戲學習商業策略、專利佈局與思維訓練，寓教於樂。",
      color: "from-[#5a4a7a] to-[#7a6a9a]",
      iconBg: "bg-[#fce8d0]",
      trialUrl: "https://patentpioneer-hkiusl.netlify.app/",
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
                  {f.trialUrl ? (
                    <a
                      href={f.trialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#ff6b9d] text-white font-bold text-base shadow-lg shadow-[#ff6b9d]/30 hover:bg-[#ff5588] hover:shadow-[#ff6b9d]/50 hover:scale-105 transition-all animate-pulse hover:animate-none"
                    >
                      <Gamepad2 className="w-5 h-5" />
                      立即試玩
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="mt-6 flex items-center text-[#d4c8e8] text-sm font-medium group-hover:translate-x-2 transition-transform">
                      了解更多 <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  )}
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

// ─── Speaker Data ───
interface Speaker {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin?: string;
  youtube?: string;
  companyLogo?: string;
  companyName?: string;
  companyLogo2?: string;
  companyName2?: string;
}

const SPEAKERS: Record<string, Speaker> = {
  alan: {
    name: "張益麟 Alan, MH",
    role: "都會大學校董會成員 | 興迅集團創辦人及董事總經理 | 香港社會創業論壇主席",
    photo: IMAGES.alanPhoto,
    bio: "資深商界領袖，興迅集團創辦人及董事總經理，同時擔任香港社會創業論壇主席及都會大學校董會成員，長期支持香港高等教育與青年創業發展。",
  },
  angel: {
    name: "鄺善珩 Angel",
    role: "創想教育 Co-founder",
    photo: IMAGES.angelPhoto,
    bio: "香港教育大學準畢業生，擁有五年數學教學經驗。將數學與科技結合，創辦「創想教育」，曾獲得60萬創業基金及受邀海外參展。",
    linkedin: "https://hk.linkedin.com/in/sin-hang-angel-kwong",
    companyLogo: IMAGES.inspireEduLogo,
    companyName: "創想教育 Inspire Education",
  },
  ryan: {
    name: "張永超 Ryan",
    role: "香港奇智醫學 CEO",
    photo: IMAGES.ryanPhoto,
    bio: "多次在權威創業大賽中獲獎，包括HKMU Hackathon冠軍、挑戰杯全國二等獎，擁有多年企業管理與創業經驗。",
  },
  eric: {
    name: "黃泳洋 Eric",
    role: "有飯科技 RiceUp Co-Founder | 香港城市大學大三學生",
    photo: IMAGES.ericPhoto,
    bio: "曾創辦自媒體公司，擁有5年以上市場拓展和初創獲客0-1的實戰經驗。其參與創辦的 RiceUp，獲科學園及高校在內的多輪種子輪支持，擁有超萬人的私域社群，專注於讓用戶用科技，吃得好，省到錢。",
    companyLogo: IMAGES.riceUpLogo,
    companyName: "有飯科技 RiceUp",
  },
  bobo: {
    name: "徐沛慈 Bobo",
    role: "HKIUSL 2026 發起人 | 杏林苑創辦人 | 安顏科技創辦人 | 香港都會大學商學院二年級",
    photo: IMAGES.boboPhoto,
    bio: "作為青年創業者，現正推動兩個創新項目，包括以遊戲推廣中醫藥文化的「杏林苑」，以及結合 AI、3D 建模與 3D 打印技術的「安顏科技 OnAn Technology」。她曾獲數碼港創意微型基金（CCMF）港幣十萬元資助，並於 HKSTP Techathon+ 10A 及 HKSEC 2025-26 獲獎。",
    companyLogo: IMAGES.xinglinYuanLogo,
    companyName: "杏林苑 Xinglin Yuan",
    companyLogo2: IMAGES.onanLogo,
    companyName2: "安顏科技 OnAn Technology",
  },
  xidorsi: {
    name: "西DorSi",
    role: "自媒體博主 | YouTube 頻道「西DorSi偽中產生活態度」",
    photo: IMAGES.xidorsiPhoto,
    bio: "自媒體博主，營運 YouTube 頻道「西DorSi偽中產生活態度」9年，主要向香港人提供大中華地區文旅資訊，擁有超35萬訂閱及超1億收看次數，境內外所有平台粉絲量超77萬。西DorSi亦是暢銷書作者，著有數本大灣區城市的旅遊、移居攻略書。2025年，西DorSi亦獲得香港特別行政區律政司委任，成為大灣區專責小組成員。",
    youtube: "https://www.youtube.com/@saidorsi",
  },
  sophia: {
    name: "林詠欣 Sophia",
    role: "南區區議員 | 大灣區青年企業家協會創會會長",
    photo: IMAGES.sophiaPhoto,
    bio: "南區區議員，大灣區青年企業家協會創會會長，致力於推動青年創業與大灣區合作發展。",
    companyLogo: IMAGES.gbaLogo,
    companyName: "大灣區青年企業家協會",
  },
  marcus: {
    name: "余浩堃 Marcus",
    role: "ScentSafe 創辦人 | 香港大學學生",
    photo: IMAGES.marcusPhoto,
    bio: "ScentSafe 創辦人，香港大學學生，將分享創業歷程與產品開發經驗。",
    companyLogo: IMAGES.scentsafeLogo,
    companyName: "ScentSafe",
  },
  emil: {
    name: "陳家豪 Emil",
    role: "大隊長 | 金融服務及初創業界資深人士",
    photo: IMAGES.emilChanPhoto,
    bio: "Emil Chan 是金融服務及初創業界的知名人物，在跨境金融領域塑造了重要格局，並為企業提供數碼轉型的專業建議。他積極指導初創企業，在多所著名大學任教，並在多個具影響力的組織中擔任要職。Emil 的貢獻超越金融領域，持續啟發創新思維，並致力於培育良好的創業生態。",
    companyLogo: IMAGES.hkdfaLogo,
    companyName: "Hong Kong Digital Finance Association",
  },
  moda_panel: {
    name: "香港設計文化協會 (MODA)",
    role: "主辦座談協辦機構",
    photo: "",
    bio: "香港設計文化協會（MODA）負責主辦座談環節，探討設計思維與創業的結合。",
    companyLogo: IMAGES.modaLogo,
    companyName: "香港設計文化協會 MODA",
  },
  maurice: {
    name: "Maurice",
    role: "香港設計文化協會 (MODA)",
    photo: "",
    bio: "來自香港設計文化協會（MODA），將分享設計思維與創業的結合。",
    companyLogo: IMAGES.modaLogo,
    companyName: "香港設計文化協會 MODA",
  },
};

// ─── Schedule Section ───
function ScheduleSection() {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedSpeaker, setExpandedSpeaker] = useState<string | null>(null);

  interface TimeSlot {
    timeRange: string;
    title: string;
    description: string;
    type: "highlight" | "speech" | "workshop" | "break" | "general" | "star-guest";
    speakers?: string[];
    specialStyle?: "yellow-glow" | "red-glow";
  }

  interface ScheduleDay {
    date: string;
    shortDate: string;
    venue: string;
    label: string;
    theme: string;
    themeColor: string;
    slots: TimeSlot[];
  }

  const days: ScheduleDay[] = [
    {
      date: "4月11日（六）",
      shortDate: "Day 1",
      venue: "都會大學中國銀行演講廳",
      label: "開幕禮・演講・授課",
      theme: "開幕啟航與創業導入",
      themeColor: "from-[#2f63e0] to-[#3d73f0]",
      slots: [
        {
          timeRange: "10:00",
          title: "簽到",
          description: "參加者簽到入場，領取活動資料。",
          type: "general",
        },
        {
          timeRange: "10:30",
          title: "正式開始",
          description: "主辦方致歡迎辭，介紹活動整體框架與目標。",
          type: "general",
        },
        {
          timeRange: "10:40",
          title: "致辭一 [暫定]",
          description: "區議員林詠欣 Sophia 致辭，分享對香港青年創業與大灣區合作發展的展望。",
          type: "speech",
          speakers: ["sophia"],
        },
        {
          timeRange: "10:50",
          title: "致辭二 [待定]",
          description: "嘉賓致辭。",
          type: "speech",
        },
        {
          timeRange: "11:00",
          title: "創業政策分享 [邀請中]",
          description: "數碼港代表分享香港創業政策環境與支援措施。",
          type: "speech",
        },
        {
          timeRange: "11:20",
          title: "嘉賓分享",
          description: "嘉賓分享香港創業生態與未來趨勢，讓參加者掌握宏觀方向。",
          type: "speech",
          speakers: ["alan"],
        },
        {
          timeRange: "11:30",
          title: "⭐ 星級嘉賓",
          description: "西DorSi 透過 Zoom 連線分享自媒體創業經驗與個人品牌建立心得。",
          type: "star-guest",
          speakers: ["xidorsi"],
          specialStyle: "red-glow",
        },
        {
          timeRange: "12:00",
          title: "主辦座談",
          description: "由香港設計文化協會（MODA）負責，與嘉賓進行座談，深入探討技術經理人的角色與機遇。",
          type: "speech",
          speakers: ["moda_panel"],
        },
        {
          timeRange: "12:45",
          title: "Q & A",
          description: "參加者自由提問，與嘉賓互動交流。",
          type: "speech",
        },
        {
          timeRange: "1:00",
          title: "自由交流 / LUNCH",
          description: "參加者與嘉賓自由交流、建立跨校連結，享用午餐。",
          type: "break",
        },
        {
          timeRange: "2:15",
          title: "商業策略遊戲",
          description: "透過互動遊戲學習商業策略，以遊戲方式理解創業決策與價值定位。",
          type: "highlight",
        },
        {
          timeRange: "2:30",
          title: "Startup 分享",
          description: "Bobo 分享創業歷程與實戰經驗。",
          type: "speech",
          speakers: ["bobo"],
        },
        {
          timeRange: "2:50",
          title: "思維策略遊戲",
          description: "透過思維策略遊戲訓練創業思維與邏輯分析能力。",
          type: "highlight",
        },
        {
          timeRange: "3:00",
          title: "Startup 分享 — RiceUp",
          description: "Eric 分享從自媒體到餐飲科技的創業轉型，RiceUp 如何獲得科學園種子輪支持並建立超萬人社群。",
          type: "speech",
          speakers: ["eric"],
        },
        {
          timeRange: "3:15",
          title: "Startup 分享 — Inspire Education",
          description: "Angel 分享創辦創想教育的歷程，如何將數學與科技結合，獲得60萬創業基金及海外參展機會。",
          type: "speech",
          speakers: ["angel"],
        },
        {
          timeRange: "3:30",
          title: "專利策略遊戲",
          description: "透過專利策略遊戲了解知識產權佈局與專利申請策略。",
          type: "highlight",
        },
        {
          timeRange: "3:45",
          title: "小休",
          description: "短暫休息，補充能量。",
          type: "break",
        },
        {
          timeRange: "4:00",
          title: "Startup 分享 — ScentSafe",
          description: "余浩堃 Marcus 分享 ScentSafe 的創業歷程與產品開發經驗。",
          type: "speech",
          speakers: ["marcus"],
        },
        {
          timeRange: "4:15",
          title: "Startup 分享 — 光合抗菌人工皮",
          description: "Ryan 分享從 HKMU Hackathon 冠軍到創辦奇智醫學的創業歷程，以及醫療創新的實戰經驗。",
          type: "speech",
          speakers: ["ryan"],
        },
        {
          timeRange: "4:30",
          title: "分享",
          description: "香港設計文化協會（MODA）的 Maurice 分享設計思維與創業的結合。",
          type: "speech",
          speakers: ["maurice"],
        },
        {
          timeRange: "4:50",
          title: "Day 2 工作坊講解",
          description: "預告 Day 2 組隊實作、工作坊流程與極創客挑戰要求。",
          type: "general",
        },
        {
          timeRange: "5:30",
          title: "完結",
          description: "Day 1 活動圓滿結束。",
          type: "general",
        },
      ],
    },
    {
      date: "4月12日（日）",
      shortDate: "Day 2",
      venue: "柴灣青年廣場「青立方」",
      label: "工作坊・極創客",
      theme: "組隊實戰與極創客路演",
      themeColor: "from-[#ff7a18] to-[#ff6b00]",
      slots: [
        {
          timeRange: "10:00",
          title: "簽到",
          description: "參加者簽到入場。",
          type: "general",
        },
        {
          timeRange: "10:30",
          title: "正式開始",
          description: "回顧 Day 1 重點，介紹 Day 2 流程與目標。",
          type: "general",
        },
        {
          timeRange: "10:40",
          title: "選隊長",
          description: "各組選出隊長，確立團隊領導角色。",
          type: "highlight",
        },
        {
          timeRange: "11:00",
          title: "組隊 + 破冰",
          description: "組隊與破冰活動，建立跨學科團隊合作基礎，準備進入創業實戰。",
          type: "highlight",
        },
        {
          timeRange: "12:00",
          title: "大隊長架到",
          description: "由大隊長帶來實戰分享，協助參加者掌握團隊領導、任務拆解與臨場執行要點。",
          type: "speech",
          speakers: ["emil"],
        },
        {
          timeRange: "12:45",
          title: "Lunch",
          description: "團隊整理方向、補充能量，並與其他隊伍交流初步想法。",
          type: "break",
        },
        {
          timeRange: "2:00",
          title: "極創客",
          description: "團隊進行創意整合、方案設計、商業模式梳理與簡報準備，在限時內完成創業提案。",
          type: "workshop",
        },
        {
          timeRange: "5:30",
          title: "Pitching",
          description: "各隊進行最終簡報展示，接受評審回饋。",
          type: "highlight",
        },
        {
          timeRange: "6:30",
          title: "Finish",
          description: "Day 2 活動圓滿結束，為後續線上投票及評選作準備。",
          type: "general",
        },
      ],
    },
    {
      date: "4月13-18日",
      shortDate: "Day 3-8",
      venue: "線上",
      label: "線上投票・AI 評審",
      theme: "作品展示與公眾參與",
      themeColor: "from-[#7a5af8] to-[#6941c6]",
      slots: [
        {
          timeRange: "全天",
          title: "線上投票開放",
          description: "公眾可於平台瀏覽隊伍成果並進行投票，提升作品曝光與社會參與度。",
          type: "highlight",
        },
        {
          timeRange: "全天",
          title: "AI 評審系統運作",
          description: "系統輔助分析提案內容、表達邏輯與創新方向，提供多維度參考評估。",
          type: "workshop",
        },
        {
          timeRange: "全天",
          title: "作品展示平台",
          description: "統一展示各隊提案內容、概念摘要與成果亮點，方便評審與公眾瀏覽。",
          type: "general",
        },
      ],
    },
    {
      date: "4月19日（六）",
      shortDate: "Finale",
      venue: "線上",
      label: "宣佈優秀作品",
      theme: "成果公佈與榮譽嘉許",
      themeColor: "from-[#ec4899] to-[#db2777]",
      slots: [
        {
          timeRange: "待定",
          title: "線上宣佈優秀作品",
          description: "公佈優秀團隊與評審結果，展示活動成果與參加者的創新表現。",
          type: "highlight",
        },
        {
          timeRange: "待定",
          title: "頒獎典禮",
          description: "透過線上形式進行嘉許與成果總結，為整個實戰營畫上圓滿句號。",
          type: "speech",
        },
      ],
    },
  ];

  const slotStyles = {
    highlight: {
      card: "bg-gradient-to-br from-[#f3ecff] to-[#ebe2ff] border-[#d7c2ff]",
      time: "text-[#6b46c1]",
      title: "text-[#2d1b69]",
      desc: "text-[#5b4b8a]",
      dot: "bg-[#8b5cf6]",
    },
    speech: {
      card: "bg-gradient-to-br from-[#eaf4ff] to-[#dfeeff] border-[#bfdcff]",
      time: "text-[#2563eb]",
      title: "text-[#163a7a]",
      desc: "text-[#47618f]",
      dot: "bg-[#3b82f6]",
    },
    workshop: {
      card: "bg-gradient-to-br from-[#e8fbf3] to-[#dcf7ec] border-[#b7ebd2]",
      time: "text-[#0f766e]",
      title: "text-[#134e4a]",
      desc: "text-[#3d6c68]",
      dot: "bg-[#14b8a6]",
    },
    break: {
      card: "bg-gradient-to-br from-[#fff4e8] to-[#ffedd9] border-[#ffd7ad]",
      time: "text-[#c2410c]",
      title: "text-[#7c2d12]",
      desc: "text-[#9a5b33]",
      dot: "bg-[#f97316]",
    },
    general: {
      card: "bg-gradient-to-br from-[#f4f4f5] to-[#ededf1] border-[#d9d9e3]",
      time: "text-[#475569]",
      title: "text-[#1e293b]",
      desc: "text-[#5b6474]",
      dot: "bg-[#64748b]",
    },
    "star-guest": {
      card: "bg-gradient-to-br from-[#fff0f0] to-[#ffe0e0] border-[#ff4444]",
      time: "text-[#cc0000]",
      title: "text-[#990000]",
      desc: "text-[#8a3333]",
      dot: "bg-[#ff0000]",
    },
  } as const;

  const renderSpeakerCard = (speakerKey: string) => {
    const speaker = SPEAKERS[speakerKey];
    if (!speaker) return null;

    const isExpanded = expandedSpeaker === speakerKey;

    return (
      <div key={speakerKey} className="mt-4">
        {/* Always-visible speaker card with photo, logo, name, title */}
        <div
          className="rounded-2xl bg-white/90 border border-white shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setExpandedSpeaker(isExpanded ? null : speakerKey)}
        >
          <div className="flex items-center gap-4 flex-wrap">
            {/* Photo */}
            {speaker.photo ? (
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover border-2 border-[#b8a9d4] shrink-0"
              />
            ) : (
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 border-[#b8a9d4] shrink-0 bg-[#e8e0f0] flex items-center justify-center">
                <Users className="w-7 h-7 text-[#7a5a9a]" />
              </div>
            )}
            {/* Company logo - same size as photo */}
            {speaker.companyLogo && (
              <img
                src={speaker.companyLogo}
                alt={speaker.companyName || ""}
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-contain bg-transparent shrink-0"
              />
            )}
            {/* Second company logo */}
            {speaker.companyLogo2 && (
              <img
                src={speaker.companyLogo2}
                alt={speaker.companyName2 || ""}
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-contain bg-transparent shrink-0"
              />
            )}
            {/* Name and title */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[#1a1a4e] text-base md:text-lg leading-snug">
                {speaker.name}
              </h4>
              <p className="text-[#7a5a9a] text-xs md:text-sm mt-1 leading-relaxed">
                {speaker.role}
              </p>
            </div>
            {/* Expand indicator */}
            <ChevronRight className={`w-5 h-5 text-[#b8a9d4] shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
          </div>

          {/* Expandable bio section */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-[#e8e0f0]"
            >
              <p className="text-[#5a5a7a] text-sm leading-relaxed">
                {speaker.bio}
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                {speaker.linkedin && (
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#0077b5] hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    LinkedIn
                  </a>
                )}
                {speaker.youtube && (
                  <a
                    href={speaker.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#ff0000] hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="schedule" className="py-20 bg-[#faf8f5]">
      <div className="container">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e8e0f0] text-[#5a4a7a] text-sm font-medium mb-4">
              日程安排
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1a1a4e] mb-4">
              兩天高強度實戰日程（暫定）
            </h2>
            <p className="text-[#5a5a7a] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              從早到晚，沉浸式體驗創業全流程
            </p>
          </motion.div>
        </AnimatedSection>

        {/* 日期選擇按鈕 */}
        <div className="flex flex-wrap gap-3 justify-center mb-8 md:mb-10 px-2">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveDay(i);
                setExpandedSpeaker(null);
              }}
              className={`px-4 md:px-5 py-3.5 md:py-3 rounded-2xl font-medium text-sm md:text-base transition-all min-w-[140px] ${
                activeDay === i
                  ? "bg-[#1a1a4e] text-white shadow-lg shadow-[#1a1a4e]/20"
                  : "bg-white text-[#5a5a7a] hover:bg-[#e8e0f0] border border-[#e0d8f0]"
              }`}
            >
              <div className="font-bold text-sm md:text-base">{day.date}</div>
              <div className="text-[11px] md:text-xs mt-1 opacity-80 leading-snug">{day.label}</div>
            </button>
          ))}
        </div>

        {/* 當前日期卡片 */}
        <AnimatedSection>
          <motion.div variants={fadeIn} className="max-w-5xl mx-auto">
            <div className="rounded-[28px] overflow-hidden border border-[#d9e2f2] bg-white shadow-xl">
              {/* 頂部標題列 */}
              <div className={`bg-gradient-to-r ${days[activeDay].themeColor} px-5 md:px-7 py-4 md:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2`}>
                <div>
                  <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight">
                    {days[activeDay].shortDate}: {days[activeDay].theme}
                  </h3>
                  <p className="text-white/85 text-sm md:text-base mt-1">
                    {days[activeDay].label}
                  </p>
                </div>
                <div className="text-white/95 text-sm md:text-lg font-semibold">
                  {days[activeDay].date}
                </div>
              </div>

              {/* 地點 */}
              <div className="px-5 md:px-7 py-4 border-b border-[#edf1f7] bg-[#fbfcfe]">
                <div className="flex items-center gap-2 text-[#5a5a7a] text-sm md:text-base">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-[#6b7280]" />
                  <span className="font-medium">{days[activeDay].venue}</span>
                </div>
              </div>

              {/* Timeslots */}
              <div className="px-4 md:px-7 py-4 md:py-6 space-y-4 md:space-y-5">
                {days[activeDay].slots.map((slot, idx) => {
                  const style = slotStyles[slot.type];
                  const isYellowGlow = slot.specialStyle === "yellow-glow";
                  const isRedGlow = slot.specialStyle === "red-glow";
                  const specialCardClass = isRedGlow
                    ? "bg-gradient-to-br from-[#fff0f0] to-[#ffe0e0] border-[#ff4444] animate-glow-red"
                    : isYellowGlow
                      ? "bg-gradient-to-br from-[#fff8e1] to-[#fff3cd] border-[#ffd54f] animate-glow-yellow"
                      : null;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl md:rounded-3xl border p-4 md:p-6 ${
                        specialCardClass || style.card
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-6 items-start">
                        {/* 時間 */}
                        <div className="md:pt-1">
                          <div
                            className={`text-xl md:text-2xl font-black leading-tight ${style.time}`}
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {slot.timeRange}
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                            <span className={`text-xs md:text-sm font-semibold ${style.time}`}>
                              {slot.type === "highlight" && "重點活動"}
                              {slot.type === "speech" && "分享環節"}
                              {slot.type === "workshop" && "工作坊"}
                              {slot.type === "break" && "休息 / 交流"}
                              {slot.type === "general" && "一般安排"}
                              {slot.type === "star-guest" && "星級嘉賓（Zoom）"}
                            </span>
                          </div>
                        </div>

                        {/* 內容 */}
                        <div>
                          <h4 className={`text-xl md:text-2xl font-black leading-snug ${style.title}`}>
                            {slot.title}
                          </h4>
                          <p className={`mt-2 md:mt-3 text-base md:text-lg leading-relaxed ${style.desc}`}>
                            {slot.description}
                          </p>

                          {slot.speakers && slot.speakers.length > 0 && (
                            <div className="mt-2">
                              {slot.speakers.map((speakerKey) => renderSpeakerCard(speakerKey))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
      school: "商學院",
      avatar: "C",
    },
    {
      quote: "線上遊戲融合課程的方式非常創新，讓原本枯燥的商業理論變得生動有趣。Pitching 環節更是讓我突破了自己的舒適圈。",
      name: "李同學",
      school: "設計學院",
      avatar: "L",
    },
    {
      quote: "認識了來自不同大專的同學，大家各有專長，互相學習。這種跨校合作的經驗是課堂上學不到的寶貴財富。",
      name: "王同學",
      school: "工程學院",
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
const JOTFORM_URL = "https://form.jotform.com/260611266654052";
const VOLUNTEER_JOTFORM_URL = "https://form.jotform.com/260610919201044";

function SignupSection() {
  return (
    <section id="signup" className="relative">
      <WaveDividerBottom color="white" />
      <div className="bg-gradient-to-br from-[#1a1a4e] via-[#2a2a6e] to-[#3a2a6e] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#b8a9d4]/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#b8a9d4]/5 blur-3xl" />

        <div className="container relative z-10">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#b8a9d4]/20 text-[#d4c8e8] text-sm font-medium mb-6">
                立即行動
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                報名參加
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-10 text-lg">
                名額有限，先到先得。成為 2026 年技術經理人實戰營的一員！
              </p>

              {/* Pricing cards */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                {/* Early bird */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border-2 border-[#b8a9d4] p-8 group hover:-translate-y-1 transition-transform">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#b8a9d4] text-[#1a1a4e] text-sm font-bold">
                      <Sparkles className="w-4 h-4" />
                      早鳥優惠
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-5xl font-black text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      $100
                    </div>
                    <p className="text-[#d4c8e8] font-medium mb-1">3 月 25 日前報名</p>
                    <p className="text-white/40 text-sm">限時優惠價</p>
                  </div>
                </div>

                {/* Regular */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 group hover:-translate-y-1 transition-transform">
                  <div className="mt-6">
                    <div className="text-5xl font-black text-white/70 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      $300
                    </div>
                    <p className="text-white/50 font-medium mb-1">正價報名</p>
                    <p className="text-white/30 text-sm">3 月 25 日後適用</p>
                  </div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mx-auto mt-4 max-w-3xl"
              >
                <div className="rounded-2xl border border-[#ffe6a8]/40 bg-white/10 backdrop-blur-md px-4 py-3 md:px-5 md:py-4 text-center shadow-lg animate-glow-hkmu">
                  <p className="text-sm md:text-base font-semibold text-[#ffe6a8]">
                    🎓 HKMU 學生可免費參加！完成活動後，可申請 Student Life Enrichment Subsidy Scheme，最高資助 HK$300
                  </p>
                </div>
              </motion.div>
                            
              {/* Deadline notice */}
              <div className="flex items-center justify-center gap-2 mb-10 mt-10">
                <Clock className="w-5 h-5 text-[#ff6b9d]" />
                <span className="text-[#ff6b9d] font-bold text-lg">報名截止日期：2026 年 4 月 1 日</span>
              </div>

              <a href={JOTFORM_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  className="inline-flex items-center justify-center bg-[#b8a9d4] hover:bg-[#a08ec0] text-[#1a1a4e] font-black text-xl md:text-2xl rounded-full px-12 py-7 md:px-16 md:py-8 shadow-2xl shadow-[#b8a9d4]/30 transition-all hover:scale-105 hover:shadow-[#b8a9d4]/40">
                  立即報名 Register Now<ArrowRight className="w-6 h-6 md:w-7 md:h-7 mr-2.5 shrink-0" />
                </Button>

              </a>

              <p className="text-white/40 text-sm mt-6">
                點擊後將開啟報名表格，填寫資料後即完成登記
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Volunteer recruitment */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#b8a9d4]/20 flex items-center justify-center mx-auto mb-5">
                  <Heart className="w-8 h-8 text-[#b8a9d4]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  招聘義工 Volunteer Helpers
                </h3>
                <p className="text-white/60 mb-8 max-w-lg mx-auto">
                  我們正在招募活動義工，協助場地佈置、簽到接待、攝影記錄等工作。歡迎有熱誠的同學加入我們的團隊！
                </p>
                <a href={VOLUNTEER_JOTFORM_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-[#b8a9d4] text-[#d4c8e8] hover:bg-[#b8a9d4]/10 font-bold text-lg rounded-full px-10 py-6 transition-all hover:scale-105"
                  >
                    <Heart className="w-5 h-5 mr-2.5 shrink-0" />申請成為義工
                  </Button>
                </a>
                <p className="text-white/30 text-sm mt-4">
                  點擊後將開啟義工報名表格
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
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
              <p className="text-white/40 text-xs">
                現就讀香港都會大學商學院二年級
              </p>
              <a
                href="https://www.linkedin.com/in/bobo-tsuipuichi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#b8a9d4] hover:text-[#d4c8e8] text-xs transition-colors mt-1"
              >
                <ExternalLink className="w-3 h-3" />
                LinkedIn
              </a>
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
                { label: "報名", href: JOTFORM_URL },
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
                href="mailto:hkiusl.startup@gmail.com"
                className="flex items-center gap-3 text-white/50 hover:text-[#b8a9d4] text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                hkiusl.startup@gmail.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/hkiusl.startup/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#b8a9d4] hover:border-[#b8a9d4]/30 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/hkiusl/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#b8a9d4] hover:border-[#b8a9d4]/30 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
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
      <CountdownBanner />
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
