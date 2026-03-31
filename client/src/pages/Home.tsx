/**
 * 香港跨大專技術經理人實戰營 2026 — Landing Page
 * Design: 「科技浪潮」動態流體設計
 * Colors: Midnight Blue (#1a1a4e), Lavender (#b8a9d4), Cream (#faf8f5)
 * Font: Noto Sans TC (黑體) + Space Grotesk
 */
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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
  xidorsiPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/xidorsi-photo_51e05c3a.jpeg",
  xidorsiLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/xidorsi-photo_8c37cb8f.jpg",
  scentsafeLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/scentsafe-logo-new_47ec5bed.png",
  onanLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/onan-logo_e7683513.jpeg",
  marcusPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/marcus-photo_893ddebc.jpg",
  sophiaPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/sophia-lam-photo_bda96cd1.jpg",
  emilChanPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/emil-chan-photo_f68382d2.jpg",
  hkdfaLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/hkdfa-logo_79941dde.png",
  gbaLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/gbayouthent_e334847a.png",
  vhaLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venturehub_49410dbe.jpeg",
  nathanPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/nathan-photo_cc608a20.png",
  peaLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/nathan-pea-logo_5af33e31.png",
  davisPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/davis-chow-photo_501783e2.png",
  marcoPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/marco-photo_0e8ffd49.png",
  adrianPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/adrian-photo_0103aefd.png",
  edsparkLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/edspark-logo_e44e4d3c.png",
};

const PARTNER_LOGOS_STATIC = [
  { nameKey: "partner.moda", logo: "https://i.postimg.cc/pLgVQ1bW/moda_logo_2.png" },
  { nameKey: "partner.hkceces", logo: "https://i.postimg.cc/LXjgQVVc/icon5.png" },
  { nameKey: "partner.gungho", logo: "https://i.postimg.cc/2SY3X6VN/new-logo.png" },
  { nameKey: "partner.vha", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030610582/QCjoJkVdCCJUUycEHMAo9U/venturehub_49410dbe.jpeg", url: "https://academy.venturehub.tech" },
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
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const deadline = new Date('2026-04-08T23:59:59+08:00').getTime();

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
        <span>{t("countdown.label")}</span>
        <span className="font-black tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {timeLeft.days}<span className="text-white/70 text-xs mx-0.5">{t("countdown.days")}</span>
          {String(timeLeft.hours).padStart(2, '0')}<span className="text-white/70 text-xs mx-0.5">{t("countdown.hours")}</span>
          {String(timeLeft.minutes).padStart(2, '0')}<span className="text-white/70 text-xs mx-0.5">{t("countdown.minutes")}</span>
          {String(timeLeft.seconds).padStart(2, '0')}<span className="text-white/70 text-xs mx-0.5">{t("countdown.seconds")}</span>
        </span>
        <a
          href={JOTFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 px-3 py-0.5 rounded-full bg-white text-[#ff5588] text-xs font-bold hover:bg-white/90 transition-colors"
        >
          {t("countdown.register")}
        </a>
      </div>
    </div>
  );
}

// ─── Navigation ───
function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.schedule"), href: "#schedule" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.partners"), href: "#partners" },
    { label: t("nav.register"), href: JOTFORM_URL, external: true },
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
              {t("nav.registerBtn")}
            </Button>
          </a>
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className={`ml-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              scrolled
                ? "border-[#1a1a4e]/30 text-[#1a1a4e] hover:bg-[#1a1a4e]/10"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
        </div>

        {/* Mobile: language toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              scrolled
                ? "border-[#1a1a4e]/30 text-[#1a1a4e] hover:bg-[#1a1a4e]/10"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-[#1a1a4e]" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-[#1a1a4e]" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 transition-all ${scrolled ? "bg-[#1a1a4e]" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
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
                {t("nav.registerBtn")}
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
  const { t, lang } = useLanguage();
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
              {t("hero.date")}
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
            {lang === "zh" ? (
              <>
                <span className="hidden md:inline whitespace-nowrap">
                  {t("hero.titleLine1")}<span className="text-[#d4c8e8]">{t("hero.titleHighlight")}</span>{t("hero.titleLine3")}
                </span>
                <span className="md:hidden">
                  {t("hero.titleLine1")}<br />
                  <span className="text-[#d4c8e8]">{t("hero.titleHighlight")}</span><br />
                  {t("hero.titleLine3")}
                </span>
              </>
            ) : (
              <>
                {t("hero.titleLine1")}<br />
                <span className="text-[#d4c8e8]">{t("hero.titleHighlight")}</span>{" "}{t("hero.titleLine3")}
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto text-sm md:text-base font-bold mb-4 md:mb-5 text-center tracking-wider"
            style={{
              background: "linear-gradient(90deg, #ff6b9d, #d4c8e8, #b8a9d4, #ff6b9d)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
              textShadow: "0 0 20px rgba(184,169,212,0.3)",
              filter: "drop-shadow(0 0 8px rgba(184,169,212,0.4))",
            }}
          >
            {t("hero.studentLed")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto text-base md:text-xl text-white/80 mb-6 md:mb-8 max-w-4xl leading-relaxed text-center"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mx-auto flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
          >
            <a href={JOTFORM_URL} target="_blank" rel="noopener noreferrer" className="flex justify-center">
              <Button className="inline-flex items-center justify-center bg-[#b8a9d4] hover:bg-[#a08ec0] text-[#1a1a4e] font-bold text-base md:text-lg rounded-full px-6 py-5 md:px-8 md:py-6 shadow-lg shadow-[#b8a9d4]/25 transition-transform hover:scale-105">
                {t("hero.registerBtn")}<ArrowRight className="ml-2.5 w-5 h-5 shrink-0" />
              </Button>
            </a>
            <a href="#about" className="flex justify-center">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-medium text-base md:text-lg rounded-full px-6 py-5 md:px-8 md:py-6 backdrop-blur-sm"
              >
                {t("hero.learnMore")}
              </Button>
            </a>
            <a href="https://www.instagram.com/hkiusl.startup/" target="_blank" rel="noopener noreferrer" className="flex justify-center">
              <Button
                variant="outline"
                className="border-[#E1306C]/50 text-white hover:bg-[#E1306C]/20 font-medium text-base md:text-lg rounded-full px-6 py-5 md:px-8 md:py-6 backdrop-blur-sm gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                {t("hero.followUs")}
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
                {t("hero.hkmuNotice")}
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
              { num: "2", suffix: t("hero.statDaysSuffix"), label: t("hero.statEvents") },
              { num: "6+", label: t("hero.statSpeakers") },
              { num: "150+", label: t("hero.statStudents") },
            ].map((stat: { num: string; suffix?: string; label: string }) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl md:text-4xl font-bold text-[#d4c8e8]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.num}
                  {stat.suffix && <span className="text-xl md:text-3xl"> {stat.suffix}</span>}
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
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 bg-[#faf8f5]">
      <div className="container">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e8e0f0] text-[#5a4a7a] text-sm font-medium mb-4">
              {t("about.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4e] mb-4">
              {t("about.title")}
            </h2>
            <p className="text-[#5a5a7a] max-w-2xl mx-auto text-lg leading-relaxed">
              {t("about.description")}
            </p>
            <p className="text-[#7a5a9a] max-w-2xl mx-auto text-base mt-4 font-medium bg-[#e8e0f0] rounded-xl px-6 py-3 animate-glow-student">
              {t("about.studentLed")}
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
                <p className="text-white text-sm font-medium">{t("about.imageCaption")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#e8e0f0] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#5a4a7a]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a4e] text-lg mb-1">{t("about.feature1Title")}</h3>
                <p className="text-[#5a5a7a]">
                  {t("about.feature1Desc")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#fce8d0] flex items-center justify-center shrink-0">
                <Gamepad2 className="w-6 h-6 text-[#8a6a3a]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a4e] text-lg mb-1">{t("about.feature2Title")}</h3>
                <p className="text-[#5a5a7a]">
                  {t("about.feature2Desc")}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#d0e8f0] flex items-center justify-center shrink-0">
                <Rocket className="w-6 h-6 text-[#3a6a8a]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a4e] text-lg mb-1">{t("about.feature3Title")}</h3>
                <p className="text-[#5a5a7a]">
                  {t("about.feature3Desc")}
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
  const { t } = useLanguage();
  const features = [
    {
      icon: <Presentation className="w-8 h-8" />,
      title: t("features.item1Title"),
      desc: t("features.item1Desc"),
      color: "from-[#1a1a4e] to-[#2a3a6e]",
      iconBg: "bg-[#d4c8e8]",
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: t("features.item2Title"),
      desc: t("features.item2Desc"),
      color: "from-[#5a4a7a] to-[#7a6a9a]",
      iconBg: "bg-[#fce8d0]",
      trialUrl: "https://patentpioneer-hkiusl.netlify.app/",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: t("features.item3Title"),
      desc: t("features.item3Desc"),
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
                {t("features.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t("features.title")}
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                {t("features.subtitle")}
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
                      {t("features.tryNow")}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="mt-6 flex items-center text-[#d4c8e8] text-sm font-medium group-hover:translate-x-2 transition-transform">
                      {t("features.learnMore")} <ArrowRight className="ml-1 w-4 h-4" />
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
  companyLogos?: { logo: string; name?: string }[];
  notes?: string;
}

const SPEAKERS_STATIC: Record<string, Omit<Speaker, 'name' | 'role' | 'bio'> & { nameKey: string; roleKey: string; bioKey: string; companyNameKey?: string }> = {
  alan: {
    nameKey: "speaker.alan.name",
    roleKey: "speaker.alan.role",
    photo: IMAGES.alanPhoto,
    bioKey: "speaker.alan.bio",
  },
  angel: {
    nameKey: "speaker.angel.name",
    roleKey: "speaker.angel.role",
    photo: IMAGES.angelPhoto,
    bioKey: "speaker.angel.bio",
    linkedin: "https://hk.linkedin.com/in/sin-hang-angel-kwong",
    companyLogo: IMAGES.inspireEduLogo,
    companyNameKey: "company.inspireEdu",
  },
  ryan: {
    nameKey: "speaker.ryan.name",
    roleKey: "speaker.ryan.role",
    photo: IMAGES.ryanPhoto,
    bioKey: "speaker.ryan.bio",
  },
  eric: {
    nameKey: "speaker.eric.name",
    roleKey: "speaker.eric.role",
    photo: IMAGES.ericPhoto,
    bioKey: "speaker.eric.bio",
    companyLogo: IMAGES.riceUpLogo,
    companyNameKey: "company.riceUp",
  },
  bobo: {
    nameKey: "speaker.bobo.name",
    roleKey: "speaker.bobo.role",
    photo: IMAGES.boboPhoto,
    bioKey: "speaker.bobo.bio",
    companyLogos: [
      { logo: IMAGES.xinglinYuanLogo, name: "杏林苑" },
      { logo: IMAGES.onanLogo, name: "安顏科技" },
    ]
  },
  xidorsi: {
    nameKey: "speaker.xidorsi.name",
    roleKey: "speaker.xidorsi.role",
    photo: IMAGES.xidorsiPhoto,
    companyLogo: IMAGES.xidorsiLogo,
    companyName: "西DorSi偽中產生活態度",
    bioKey: "speaker.xidorsi.bio",
    youtube: "https://www.youtube.com/@saidorsi",
  },
  sophia: {
    nameKey: "speaker.sophia.name",
    roleKey: "speaker.sophia.role",
    photo: IMAGES.sophiaPhoto,
    bioKey: "speaker.sophia.bio",
    companyLogo: IMAGES.gbaLogo,
    companyNameKey: "company.gba",
  },
  marcus: {
    nameKey: "speaker.marcus.name",
    roleKey: "speaker.marcus.role",
    photo: IMAGES.marcusPhoto,
    bioKey: "speaker.marcus.bio",
    companyLogo: IMAGES.scentsafeLogo,
    companyNameKey: "company.scentsafe",
  },
  emil: {
    nameKey: "speaker.emil.name",
    roleKey: "speaker.emil.role",
    photo: IMAGES.emilChanPhoto,
    bioKey: "speaker.emil.bio",
    companyLogo: IMAGES.hkdfaLogo,
    companyNameKey: "company.hkdfa",
  },
  moda_panel: {
    nameKey: "speaker.moda_panel.name",
    roleKey: "speaker.moda_panel.role",
    photo: IMAGES.modaLogo,
    bioKey: "speaker.moda_panel.name",
    companyLogo: IMAGES.modaLogo,
    companyNameKey: "company.moda",
  },
  maurice: {
    nameKey: "speaker.maurice.name",
    roleKey: "speaker.maurice.role",
    photo: IMAGES.modaLogo,
    bioKey: "speaker.maurice.name",
    companyLogo: IMAGES.modaLogo,
    companyNameKey: "company.moda",
  },
  vha_business: {
    nameKey: "speaker.vha_business.name",
    roleKey: "speaker.vha_business.role",
    photo: IMAGES.vhaLogo,
    bioKey: "speaker.vha_business.bio",
    companyLogo: IMAGES.vhaLogo,
    companyNameKey: "company.vha",
  },
  vha_tech: {
    nameKey: "speaker.vha_tech.name",
    roleKey: "speaker.vha_tech.role",
    photo: IMAGES.vhaLogo,
    bioKey: "speaker.vha_tech.bio",
    companyLogo: IMAGES.vhaLogo,
    companyNameKey: "company.vha",
  },
  nathan: {
    nameKey: "speaker.nathan.name",
    roleKey: "speaker.nathan.role",
    photo: IMAGES.nathanPhoto,
    bioKey: "speaker.nathan.bio",
    companyLogo: IMAGES.peaLogo,
    companyNameKey: "company.pea",
  },
  davis: {
    nameKey: "speaker.davis.name",
    roleKey: "speaker.davis.role",
    photo: IMAGES.davisPhoto,
    bioKey: "speaker.davis.bio",
    linkedin: "https://www.linkedin.com/in/davis-chow/",
    companyLogo: IMAGES.vhaLogo,
    companyNameKey: "company.vha",
  },
  marco: {
    nameKey: "speaker.marco.name",
    roleKey: "speaker.marco.role",
    photo: IMAGES.marcoPhoto,
    bioKey: "speaker.marco.bio",
    linkedin: "https://www.linkedin.com/in/wong-long-yin-272645383/",
    companyLogo: IMAGES.edsparkLogo,
    companyNameKey: "company.edspark",
  },
  adrian: {
    nameKey: "speaker.adrian.name",
    roleKey: "speaker.adrian.role",
    photo: IMAGES.adrianPhoto,
    bioKey: "speaker.adrian.bio",
    linkedin: "https://www.linkedin.com/in/adrian-kam-2b08033a5/",
    companyLogo: IMAGES.edsparkLogo,
    companyNameKey: "company.edspark",
  },
};

// ─── Schedule Section ───
function ScheduleSection() {
  const { t } = useLanguage();
  const [activeDay, setActiveDay] = useState(0);
  const [expandedSpeaker, setExpandedSpeaker] = useState<string | null>(null);

  interface TimeSlot {
    timeRange: string;
    title: string;
    description: string;
    type: "highlight" | "speech" | "workshop" | "break" | "general" | "star-guest" | "guest-share" | "key-event" | "opening" | "startup-share";
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
      date: t("schedule.day1.date"),
      shortDate: "Day 1",
      venue: t("schedule.venue.hkmu"),
      label: t("schedule.day1.label"),
      theme: t("schedule.day1.theme"),
      themeColor: "from-[#2f63e0] to-[#3d73f0]",
      slots: [
        {
          timeRange: "10:00",
          title: t("d1.s1.title"),
          description: t("d1.s1.desc"),
          type: "general",
        },
        {
          timeRange: "10:30",
          title: t("d1.s2.title"),
          description: t("d1.s2.desc"),
          type: "opening",
        },
        {
          timeRange: "10:35",
          title: t("d1.s3.title"),
          description: t("d1.s3.desc"),
          type: "guest-share",
          speakers: ["vha_business", "vha_tech", "marco", "davis"],
        },
        {
          timeRange: "11:00",
          title: t("d1.s4.title"),
          description: t("d1.s4.desc"),
          type: "guest-share",
          speakers: ["sophia"],
        },
        {
          timeRange: "11:10",
          title: t("d1.s5.title"),
          description: t("d1.s5.desc"),
          type: "guest-share",
          speakers: ["nathan"],
        },
        {
          timeRange: "11:20",
          title: t("d1.s6.title"),
          description: t("d1.s6.desc"),
          type: "guest-share",
          speakers: ["alan"],
        },
        {
          timeRange: "11:30",
          title: t("d1.s7.title"),
          description: t("d1.s7.desc"),
          type: "star-guest",
          speakers: ["xidorsi"],
          specialStyle: "red-glow",
        },
        {
          timeRange: "12:00",
          title: t("d1.s8.title"),
          description: t("d1.s8.desc"),
          type: "highlight",
          speakers: ["adrian"],
        },
        {
          timeRange: "12:45",
          title: t("d1.s9.title"),
          description: t("d1.s9.desc"),
          type: "highlight",
        },
        {
          timeRange: "1:00",
          title: t("d1.s10.title"),
          description: t("d1.s10.desc"),
          type: "break",
        },
        {
          timeRange: "2:15",
          title: t("d1.s11.title"),
          description: t("d1.s11.desc"),
          type: "highlight",
        },
        {
          timeRange: "2:30",
          title: t("d1.s12.title"),
          description: t("d1.s12.desc"),
          type: "startup-share",
          speakers: ["bobo"],
        },
        {
          timeRange: "2:50",
          title: t("d1.s13.title"),
          description: t("d1.s13.desc"),
          type: "highlight",
        },
        {
          timeRange: "3:00",
          title: t("d1.s14.title"),
          description: t("d1.s14.desc"),
          type: "startup-share",
          speakers: ["eric"],
        },
        {
          timeRange: "3:15",
          title: t("d1.s15.title"),
          description: t("d1.s15.desc"),
          type: "startup-share",
          speakers: ["angel"],
        },
        {
          timeRange: "3:30",
          title: t("d1.s16.title"),
          description: t("d1.s16.desc"),
          type: "highlight",
        },
        {
          timeRange: "3:45",
          title: t("d1.s17.title"),
          description: t("d1.s17.desc"),
          type: "break",
        },
        {
          timeRange: "4:00",
          title: t("d1.s18.title"),
          description: t("d1.s18.desc"),
          type: "startup-share",
          speakers: ["marcus"],
        },
        {
          timeRange: "4:15",
          title: t("d1.s19.title"),
          description: t("d1.s19.desc"),
          type: "startup-share",
          speakers: ["ryan"],
        },
        {
          timeRange: "4:30",
          title: t("d1.s20.title"),
          description: t("d1.s20.desc"),
          type: "general",
        },
        {
          timeRange: "5:30",
          title: t("d1.s21.title"),
          description: t("d1.s21.desc"),
          type: "general",
        },
      ],
    },
    {
      date: t("schedule.day2.date"),
      shortDate: "Day 2",
      venue: t("schedule.venue.youthsquare"),
      label: t("schedule.day2.label"),
      theme: t("schedule.day2.theme"),
      themeColor: "from-[#ff7a18] to-[#ff6b00]",
      slots: [
        {
          timeRange: "10:00",
          title: t("d2.s1.title"),
          description: t("d2.s1.desc"),
          type: "general",
        },
        {
          timeRange: "10:30",
          title: t("d2.s2.title"),
          description: t("d2.s2.desc"),
          type: "opening",
        },
        {
          timeRange: "10:40",
          title: t("d2.s3.title"),
          description: t("d2.s3.desc"),
          type: "highlight",
        },
        {
          timeRange: "11:00",
          title: t("d2.s4.title"),
          description: t("d2.s4.desc"),
          type: "highlight",
        },
        {
          timeRange: "12:00",
          title: t("d2.s5.title"),
          description: t("d2.s5.desc"),
          type: "guest-share",
          speakers: ["emil"],
        },
        {
          timeRange: "12:45",
          title: t("d2.s6.title"),
          description: t("d2.s6.desc"),
          type: "break",
        },
        {
          timeRange: "2:00",
          title: t("d2.s7.title"),
          description: t("d2.s7.desc"),
          type: "workshop",
        },
        {
          timeRange: "5:30",
          title: t("d2.s8.title"),
          description: t("d2.s8.desc"),
          type: "highlight",
        },
        {
          timeRange: "6:30",
          title: t("d2.s9.title"),
          description: t("d2.s9.desc"),
          type: "general",
        },
      ],
    },
    {
      date: t("schedule.day3.date"),
      shortDate: "Day 3-8",
      venue: t("schedule.venue.online"),
      label: t("schedule.day3.label"),
      theme: t("schedule.day3.theme"),
      themeColor: "from-[#7a5af8] to-[#6941c6]",
      slots: [
        {
          timeRange: t("schedule.allDay"),
          title: t("d3.s1.title"),
          description: t("d3.s1.desc"),
          type: "highlight",
        },
        {
          timeRange: t("schedule.allDay"),
          title: t("d3.s2.title"),
          description: t("d3.s2.desc"),
          type: "workshop",
        },
        {
          timeRange: t("schedule.allDay"),
          title: t("d3.s3.title"),
          description: t("d3.s3.desc"),
          type: "general",
        },
      ],
    },
    {
      date: t("schedule.day4.date"),
      shortDate: "Finale",
      venue: t("schedule.venue.online"),
      label: t("schedule.day4.label"),
      theme: t("schedule.day4.theme"),
      themeColor: "from-[#ec4899] to-[#db2777]",
      slots: [
        {
          timeRange: t("schedule.tbc"),
          title: t("d4.s1.title"),
          description: t("d4.s1.desc"),
          type: "highlight",
        },
        {
          timeRange: t("schedule.tbc"),
          title: t("d4.s2.title"),
          description: t("d4.s2.desc"),
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
    "guest-share": {
      card: "bg-gradient-to-br from-[#fff8e1] to-[#ffecb3] border-[#ffc107]",
      time: "text-[#e6a100]",
      title: "text-[#7a5800]",
      desc: "text-[#8d6e00]",
      dot: "bg-[#ffc107]",
    },
    "key-event": {
      card: "bg-gradient-to-br from-[#fce4ec] to-[#f8bbd0] border-[#e91e63]",
      time: "text-[#c2185b]",
      title: "text-[#880e4f]",
      desc: "text-[#ad1457]",
      dot: "bg-[#e91e63]",
    },
    "opening": {
      card: "bg-gradient-to-br from-[#ffe0eb] to-[#ffb3cc] border-[#ff5c8a]",
      time: "text-[#ff5c8a]",
      title: "text-[#d6336c]",
      desc: "text-[#e04980]",
      dot: "bg-[#ff5c8a]",
    },
    "startup-share": {
      card: "bg-gradient-to-br from-[#eaf4ff] to-[#dfeeff] border-[#bfdcff]",
      time: "text-[#2563eb]",
      title: "text-[#163a7a]",
      desc: "text-[#47618f]",
      dot: "bg-[#3b82f6]",
    },
  } as const;

  // Resolve speaker translation keys
  const SPEAKERS: Record<string, Speaker> = Object.fromEntries(
    Object.entries(SPEAKERS_STATIC).map(([key, s]) => [
      key,
      {
        ...s,
        name: t(s.nameKey),
        role: t(s.roleKey),
        bio: t(s.bioKey),
        companyName: s.companyNameKey ? t(s.companyNameKey) : s.companyName,
        companyName2: (s as any).companyName2Key ? t((s as any).companyName2Key) : (s as any).companyName2,
      },
    ])
  );

  const renderSpeakerCard = (speakerKey: string) => {
  const speaker = SPEAKERS[speakerKey];
  if (!speaker) return null;

  const isExpanded = expandedSpeaker === speakerKey;

  return (
    <div key={speakerKey} className="w-full mt-4">
      <div className="rounded-2xl md:rounded-3xl bg-white/95 border border-white shadow-sm overflow-hidden">
        <div className="p-4 md:p-5">
          {/* 摺疊時固定顯示：頭像 + 名字 + role + 箭咀 */}
          <button
            type="button"
            onClick={() => setExpandedSpeaker(isExpanded ? null : speakerKey)}
            className="w-full text-left"
          >
            <div className="flex items-center gap-4">
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-[#b8a9d4] shrink-0 shadow-sm"
              />

              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-[#1a1a4e] text-lg md:text-xl leading-tight break-words">
                  {speaker.name}
                </h4>
                <p className="text-[#7a5a9a] text-sm md:text-base mt-1 leading-relaxed break-words">
                  {speaker.role}
                </p>
              </div>

              <ChevronRight
                className={`w-5 h-5 md:w-6 md:h-6 text-[#9b87bd] shrink-0 transition-transform duration-300 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              />
            </div>
          </button>

          {/* 展開內容 */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.28 }}
              className="mt-4 border-t border-[#ece5f5] pt-4"
            >
              <div className="space-y-4">
                {/* Bio */}
                <p className="text-[#5a5a7a] text-sm md:text-base leading-7">
                  {speaker.bio}
                </p>

                {/* 補充說明 */}
                {speaker.notes && (
                  <div className="rounded-xl bg-[#f7f3fc] border border-[#e9e0f3] px-4 py-3">
                    <p className="text-[#6b5a88] text-sm md:text-base leading-7">
                      {speaker.notes}
                    </p>
                  </div>
                )}

                {/* 外部連結 */}
                {(speaker.linkedin || speaker.youtube) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#eef6ff] px-3 py-1.5 text-xs md:text-sm font-medium text-[#0077b5] hover:bg-[#ddeeff] transition-colors"
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
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#fff1f1] px-3 py-1.5 text-xs md:text-sm font-medium text-[#dc2626] hover:bg-[#ffe4e4] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0" />
                        YouTube
                      </a>
                    )}
                  </div>
                )}

                {/* 品牌 / 項目：放到 bio 下方，但保持清晰存在感 */}
                {(speaker.companyLogo || speaker.companyLogos) && (
                  <div className="pt-1">
                    <div className="text-xs md:text-sm font-semibold text-[#6b5a88] mb-3">
                      相關品牌 / 項目
                    </div>

                    <div className="flex flex-col gap-3">
                      {speaker.companyLogo && (
                        <div className="flex items-center gap-3 rounded-2xl bg-[#faf8ff] px-4 py-3 border border-[#e8e0f0] shadow-sm">
                          <img
                            src={speaker.companyLogo}
                            alt={speaker.companyName || ""}
                            className="h-10 md:h-12 w-auto max-w-[96px] md:max-w-[110px] object-contain shrink-0"
                          />
                          {speaker.companyName && (
                            <span className="text-sm md:text-base font-medium text-[#5a4a7a] leading-relaxed break-words">
                              {speaker.companyName}
                            </span>
                          )}
                        </div>
                      )}

                      {speaker.companyLogos?.map(
                        (
                          company: { logo: string; name?: string },
                          idx: number
                        ) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 rounded-2xl bg-[#faf8ff] px-4 py-3 border border-[#e8e0f0] shadow-sm"
                          >
                            <img
                              src={company.logo}
                              alt={company.name || ""}
                              className="h-10 md:h-12 w-auto max-w-[96px] md:max-w-[110px] object-contain shrink-0"
                            />
                            {company.name && (
                              <span className="text-sm md:text-base font-medium text-[#5a4a7a] leading-relaxed break-words">
                                {company.name}
                              </span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
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
              {t("schedule.tag")}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1a1a4e] mb-4">
              {t("schedule.title")}
            </h2>
            <p className="text-[#5a5a7a] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {t("schedule.desc")}
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
                              {t(`slot.${slot.type}`)}
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
  const { t } = useLanguage();
  const aiPhotos = [
    { src: IMAGES.heroKeynote, label: t("gallery.ai.keynote") },
    { src: IMAGES.workshop, label: t("gallery.ai.workshop") },
    { src: IMAGES.pitching, label: t("gallery.ai.pitching") },
    { src: IMAGES.networking, label: t("gallery.ai.networking") },
    { src: IMAGES.teamwork, label: t("gallery.ai.teamwork") },
  ];

  const venuePhotos = [
    { src: IMAGES.venuePhoto1, label: t("gallery.venue.1") },
    { src: IMAGES.venuePhoto2, label: t("gallery.venue.2") },
    { src: IMAGES.venuePhoto3, label: t("gallery.venue.3") },
    { src: IMAGES.venuePhoto4, label: t("gallery.venue.4") },
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
                {t("gallery.tag")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t("gallery.title")}
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                {t("gallery.desc")}
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
              <h3 className="text-xl font-bold text-white mb-2">{t("gallery.venue.title")}</h3>
              <p className="text-white/50 text-sm">{t("gallery.venue.desc")}</p>
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
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const testimonials = [
    {
      quote: t("testimonial.1.quote"),
      name: t("testimonial.1.name"),
      school: t("testimonial.1.school"),
      avatar: "C",
    },
    {
      quote: t("testimonial.2.quote"),
      name: t("testimonial.2.name"),
      school: t("testimonial.2.school"),
      avatar: "L",
    },
    {
      quote: t("testimonial.3.quote"),
      name: t("testimonial.3.name"),
      school: t("testimonial.3.school"),
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
              {t("testimonial.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4e] mb-4">
              {t("testimonial.title")}
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
  const { t } = useLanguage();
  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e8e0f0] text-[#5a4a7a] text-sm font-medium mb-4">
              {t("partners.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a4e] mb-4">
              {t("partners.title")}
            </h2>
            <p className="text-[#5a5a7a] max-w-xl mx-auto">
              {t("partners.funding")}
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {PARTNER_LOGOS_STATIC.map((partner, i) => {
            const name = t(partner.nameKey);
            const content = (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white shadow-lg border border-[#e8e0f0] flex items-center justify-center p-4 group-hover:shadow-xl transition-shadow group-hover:-translate-y-1 transition-transform">
                  <img
                    src={partner.logo}
                    alt={name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className="text-sm text-[#5a5a7a] font-medium text-center">{name}</span>
              </motion.div>
            );
            if ((partner as any).url) {
              return (
                <a key={i} href={(partner as any).url} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              );
            }
            return content;
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Signup Section ───
const JOTFORM_URL = "https://form.jotform.com/260611266654052";
const FREE_JOTFORM_URL = "https://form.jotform.com/260834232085151";
const VOLUNTEER_JOTFORM_URL = "https://form.jotform.com/260610919201044";

function SignupSection() {
  const { t } = useLanguage();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  const VALID_PROMO_CODES = ["VHA2026", "SAIDORSI", "GUNGHO300", "HKIUSL2026", "MODA300", "GBAYEA300"];

  const handlePromoSubmit = () => {
    if (VALID_PROMO_CODES.includes(promoCode.trim().toUpperCase())) {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

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
                {t("signup.tag")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {t("signup.title")}
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-10 text-lg">
                {t("signup.desc")}
              </p>

              {/* Pricing cards */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                {/* Early bird */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border-2 border-[#b8a9d4] p-8 group hover:-translate-y-1 transition-transform">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#b8a9d4] text-[#1a1a4e] text-sm font-bold">
                      <Sparkles className="w-4 h-4" />
                      {t("signup.earlybird")}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-5xl font-black text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      $100
                    </div>
                    <p className="text-[#d4c8e8] font-medium mb-1">{t("signup.earlybird.date")}</p>
                    <p className="text-white/40 text-sm">{t("signup.earlybird.note")}</p>
                  </div>
                </div>

                {/* Regular */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 group hover:-translate-y-1 transition-transform">
                  <div className="mt-6">
                    <div className="text-5xl font-black text-white/70 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      $300
                    </div>
                    <p className="text-white/50 font-medium mb-1">{t("signup.regular")}</p>
                    <p className="text-white/30 text-sm">{t("signup.regular.date")}</p>
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
                    {t("signup.hkmu")}
                  </p>
                </div>
              </motion.div>
                            
              {/* Promo code input */}
              <div className="max-w-md mx-auto mb-10 mt-8">
                <p className="text-white/70 text-sm font-medium mb-3">{t("signup.promo.label")}</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError(false);
                    }}
                    placeholder={t("signup.promo.placeholder")}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#b8a9d4] focus:ring-1 focus:ring-[#b8a9d4] transition-colors text-center font-mono tracking-widest"
                    onKeyDown={(e) => e.key === "Enter" && handlePromoSubmit()}
                  />
                  <Button
                    onClick={handlePromoSubmit}
                    className="bg-[#b8a9d4] hover:bg-[#a08ec0] text-[#1a1a4e] font-bold rounded-xl px-6 py-3 transition-all hover:scale-105"
                  >
                    {t("signup.promo.apply")}
                  </Button>
                </div>
                {promoError && (
                  <p className="text-[#ff6b9d] text-sm mt-2 animate-pulse">{t("signup.promo.invalid")}</p>
                )}
                {promoApplied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md"
                  >
                    <p className="text-emerald-300 font-bold text-lg flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      {t("signup.promo.success")}
                    </p>
                    <p className="text-emerald-200/70 text-sm mt-1">{t("signup.promo.successNote")}</p>
                  </motion.div>
                )}
              </div>

              {/* Deadline notice */}
              <div className="flex items-center justify-center gap-2 mb-10">
                <Clock className="w-5 h-5 text-[#ff6b9d]" />
                <span className="text-[#ff6b9d] font-bold text-lg">{t("signup.deadline")}</span>
              </div>

              <a href={promoApplied ? FREE_JOTFORM_URL : JOTFORM_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  className={`inline-flex items-center justify-center font-black text-xl md:text-2xl rounded-full px-12 py-7 md:px-16 md:py-8 shadow-2xl transition-all hover:scale-105 ${
                    promoApplied
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 hover:shadow-emerald-500/40"
                      : "bg-[#b8a9d4] hover:bg-[#a08ec0] text-[#1a1a4e] shadow-[#b8a9d4]/30 hover:shadow-[#b8a9d4]/40"
                  }`}>
                  {promoApplied ? t("signup.promo.freeRegister") : t("signup.registerBtn")}<ArrowRight className="w-6 h-6 md:w-7 md:h-7 mr-2.5 shrink-0" />
                </Button>

              </a>

              <p className="text-white/40 text-sm mt-6">
                {promoApplied ? t("signup.promo.freeNote") : t("signup.registerNote")}
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
                  {t("signup.volunteer.title")}
                </h3>
                <p className="text-white/60 mb-8 max-w-lg mx-auto">
                  {t("signup.volunteer.desc")}
                </p>
                <a href={VOLUNTEER_JOTFORM_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-[#b8a9d4] text-[#d4c8e8] hover:bg-[#b8a9d4]/10 font-bold text-lg rounded-full px-10 py-6 transition-all hover:scale-105"
                  >
                    <Heart className="w-5 h-5 mr-2.5 shrink-0" />{t("signup.volunteer.btn")}
                  </Button>
                </a>
                <p className="text-white/30 text-sm mt-4">
                  {t("signup.volunteer.note")}
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
  const { t } = useLanguage();
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
              {t("footer.brand")}
              {t("footer.brand2") && <><br />{t("footer.brand2")}</>}
            </p>
            <div className="flex flex-col items-start gap-3 mt-4">
              <img
                src={IMAGES.boboPhoto}
                alt="Bobo Tsui"
                className="rounded-full object-cover border-2 border-[#b8a9d4]/30"
                style={{ width: "200px", height: "200px" }}
              />
              <p className="text-white/50 text-sm font-medium">
                {t("footer.organizer")}
              </p>
              <p className="text-white/40 text-xs">
                {t("footer.organizer.desc")}
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
            <h4 className="text-white font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <div className="space-y-3">
              {[
                { label: t("nav.about"), href: "#about" },
                { label: t("nav.features"), href: "#features" },
                { label: t("nav.schedule"), href: "#schedule" },
                { label: t("nav.gallery"), href: "#gallery" },
                { label: t("nav.partners"), href: "#partners" },
                { label: t("nav.register"), href: JOTFORM_URL },
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
            <h4 className="text-white font-semibold mb-4">{t("footer.contact")}</h4>
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
            {t("footer.copyright")}
          </p>
          <p className="text-white/20 text-xs">
            {t("footer.funding")}
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
