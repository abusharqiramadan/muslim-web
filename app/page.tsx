"use client"

import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useMemo, type CSSProperties } from "react"

// Image Imports
import HidayaAcademyImage from "@/lib/images/hidaya-academy-hero.png"
import ArabicInstituteImage from "@/lib/images/arabic-institute-hero.png"

import { NavBar } from "@/components/landing-page/navbar"
import { DEFAULT_EASE, DEFAULT_VIEWPORT, createSectionVariants, createStaggerContainer, createStaggerItem } from "@/lib/motion-presets"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  Building2,
  CalendarRange,
  CheckCircle2,
  Compass,
  Globe2,
  Handshake,
  Lightbulb,
  Layers,
  MonitorSmartphone,
  Palette,
  PenTool,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  XCircle,
  Zap,
} from "lucide-react"
import { CommonFooter } from "@/components/landing-page/common-footer"

type Highlight = {
  title: string
  description: string
  icon: LucideIcon
  stat?: string
  statSource?: string
  contextNote?: string
}

type SolutionPoint = {
  highlight: string
  emphasis: string
  title: string
  description: string
  icon: LucideIcon
  bullets: string[]
}

type ServiceExample = {
  name: string
  category: string
  description: string
  image: StaticImageData
  imageAlt: string
  href: string
  icon: LucideIcon
}

type ProcessStep = {
  phase: number
  title: string
  timeframe: string
  outcome: string
  support: string
  icon: LucideIcon
  highlight?: boolean
}

type TrustSignal = {
  title: string
  description: string
  icon: LucideIcon
  stat?: string
  highlight?: boolean
  contrastOther: string
  contrastUs: string
}

type PricingTier = {
  name: string
  price: string
  period: string
  description: string
  features: {
    text: string
    isNegative?: boolean
  }[]
  highlighted?: boolean
  ribbon?: string
  badge?: string
  extra_badge?: string;
  countdownTarget?: string
  ctaLabel: string
  ctaHref: string
  theme?: "light" | "dark" | "premium"
  privacyNote: string
}

type FloatingIcon = {
  icon: LucideIcon
  className: string
  sizeClass: string
  opacityClass: string
  colorClass: string
  animationClass: string
  style?: CSSProperties
}

/*
const heroStats = [
  {
    label: "Websites live",
    value: "280+",
    icon: Rocket,
  },
  {
    label: "Average launch time",
    value: "7 days",
    icon: CalendarRange,
  },
  {
    label: "Service providers happy",
    value: "96%",
    icon: Handshake,
  },
] as const
*/

const heroFloatingIcons: FloatingIcon[] = [
  {
    icon: Palette,
    className: "top-20 left-[8%]",
    sizeClass: "h-10 w-10",
    opacityClass: "opacity-30",
    colorClass: "text-rose-400",
    animationClass: "animate-float-soft",
    style: { animationDelay: "0.4s", animationDuration: "18s" },
  },
  {
    icon: Lightbulb,
    className: "top-32 right-[12%]",
    sizeClass: "h-12 w-12",
    opacityClass: "opacity-40",
    colorClass: "text-rose-500",
    animationClass: "animate-float-soft-alt",
    style: { animationDelay: "1.2s", animationDuration: "20s" },
  },
  {
    icon: TrendingUp,
    className: "bottom-28 left-[18%]",
    sizeClass: "h-11 w-11",
    opacityClass: "opacity-35",
    colorClass: "text-rose-300",
    animationClass: "animate-float-soft-diagonal",
    style: { animationDelay: "0.8s", animationDuration: "22s" },
  },
  {
    icon: PenTool,
    className: "bottom-16 right-[10%]",
    sizeClass: "h-10 w-10",
    opacityClass: "opacity-30",
    colorClass: "text-rose-400",
    animationClass: "animate-float-soft",
    style: { animationDelay: "1.6s", animationDuration: "19s" },
  },
]

const challenges: Highlight[] = [
  {
    title: "Hard to find when people need help",
    description:
      "99% start online. A third of people skip online offers that don't have a proper website.",
    stat: "99% start online when seeking support",
    statSource: "Network Solutions 2025",
    contextNote: "No site means parents and community supporters pick someone else first.",
    icon: AlertTriangle,
  },
  {
    title: "Trust falls without proof",
    description:
      "Three of four people judge design first. Missing pages make them doubt what you offer.",
    stat: "75% judge credibility by design",
    statSource: "Network Solutions 2025",
    contextNote: "A polished site tells families and students you are real and ready.",
    icon: Users,
  },
  {
    title: "Impact and income slip away",
    description:
      "Groups without sites lose most potential students. Open seats will stay empty. Growth plans will be paused.",
    stat: "Lose 70-80% of potential families and clients",
    statSource: "The Small Business Blog 2023",
    contextNote: "That missing 70-80% could be families seeking Qur'an classes or supporters ready to help your ummah work.",
    icon: Layers,
  },
]

const solutionPoints: SolutionPoint[] = [
  {
    highlight: "Launch your site",
    emphasis: "Faithful design in 7 days",
    title: "Show your mission with care",
    description:
      "We build each page fast so your values and programs shine with care.",
    icon: MonitorSmartphone,
    bullets: [
      "Launch with layouts that show your story, programs, and mission together.",
      "Skip DIY tools. Get a crafted site that sounds like you.",
    ],
  },
  {
    highlight: "Win trust fast",
    emphasis: "Tell your story with your values",
    title: "Help families feel sure",
    description:
      "We use clear words and Islamic values so families trust your care and niyyah.",
    icon: Compass,
    bullets: [
      "Explain programs, support, and student life in warm, everyday words.",
      "Show your wins so families feel confident choosing you first.",
    ],
  },
  {
    highlight: "Guide people to act",
    emphasis: "Easy forms for bookings",
    title: "Make next steps easy",
    description:
      "We connect simple enrollment, support, and interest forms so families respond fast and feel guided.",
    icon: Rocket,
    bullets: [
      "Start enrolling families and keeping supporters informed with tested forms and gentle reminders.",
      "Track every inquiry with alerts so no parent slips away.",
    ],
  },
  {
    highlight: "Keep your site fresh",
    emphasis: "We help you every month",
    title: "Keep your site true and current",
    description:
      "We handle changes so your site stays accurate, faith-rooted, and ready for new families in every season.",
    icon: Plus,
    bullets: [
      "We refresh class details, program offerings, and community news for you with a long-term lens.",
      "See simple reports that show how families explore your site and grow closer to your community.",
    ],
  },
]

const processSteps: ProcessStep[] = [
  {
    phase: 1,
    title: "Plan your story",
    timeframe: "Day 1",
    outcome: "We capture your true story and what families need from your amanah",
    support: "We gather your program details and share a launch checklist that fits your institution's strengths.",
    icon: Sparkles,
  },
  {
    phase: 2,
    title: "Build and launch",
    timeframe: "Week 1 · Launch day",
    outcome: "Your site goes live and welcomes families and community supporters to your mission",
    support: "We design each page, connect enrollment and inquiry forms, and publish in seven days with care and tawakkul.",
    icon: Rocket,
    highlight: true,
  },
  {
    phase: 3,
    title: "Grow and improve",
    timeframe: "Week 2 and beyond",
    outcome: "Your site keeps building trust and serving every day",
    support: "We track visits, refresh program stories, and keep you in front of the Ummah you proudly serve.",
    icon: Workflow,
  },
]

const featureHighlights: Highlight[] = [
  {
    title: "Respectful design choices",
    description:
      "We pick layouts, colors, and photos that feel warm and respectful.",
    icon: ShieldCheck,
  },
  {
    title: "Fast tech under the hood",
    description:
      "Your site loads fast and works well even on slow internet.",
    icon: BarChart3,
  },
  {
    title: "Built-in tracking",
    description:
      "Check visits, bookings, and calls in one simple view.",
    icon: CheckCircle2,
  },
]

const serviceExamples: ServiceExample[] = [
  {
    name: "Hidaya Academy",
    category: "Qur'an Academy",
    description: "Hero area, class info, and teacher details easy to read.",
    image: HidayaAcademyImage,
    imageAlt: "Preview of the Hidaya Academy website hero section with class information",
    href: "https://abusharqi.github.io/arabic-landing-page-2/",
    icon: Globe2,
  },
  {
    name: "Al-Mukhtasarat Insitute",
    category: "Arabic Program",
    description: "Hero area, curriculum outline, and pricing shown clearly.",
    image: ArabicInstituteImage,
    imageAlt: "Preview of the Al-Mukhtasarat Institute website highlighting curriculum and pricing",
    href: "https://abusharqi.github.io/arabic-landing-page/",
    icon: Sparkles,
  },
]

const trustSignals: TrustSignal[] = [
  {
    title: "Faith-first design",
    description:
      "We put your faith, values, and mission first on every page.",
    icon: BadgeCheck,
    stat: "Mission comes first",
    highlight: true,
    contrastOther: "Other sites talk about sales before your mission.",
    contrastUs: "We plan each page with your leaders so values show first.",
  },
  {
    title: "We stick to our promise",
    description:
      "We lock the plan on day one and follow it with care.",
    icon: Rocket,
    stat: "Plan set Day 1",
    contrastOther: "Other teams chase changes and miss the launch date.",
    contrastUs: "We keep a steady pace and stay until each page feels right.",
  },
  {
    title: "Keep family information safe",
    description:
      "We protect family and student info with private hosting and no resale.",
    icon: ShieldCheck,
    stat: "Sacred data safe",
    contrastOther: "Shared platforms can move your community data around.",
    contrastUs: "We lock important data and control who can see it.",
  },
  {
    title: "We help you every month",
    description:
      "We stay with you for three months so updates stay easy.",
    icon: Handshake,
    stat: "3 months of support",
    contrastOther: "Without help, leaders carry every update alone.",
    contrastUs: "We meet each month, share simple updates, and make changes for you.",
  },
]

const pricingTiers: PricingTier[] = [
  {
    name: "Community Launch",
    price: "$0",
    period: "+ website domain fee (optional)",
    description:
      "Great for Islamic schools, mosques, and centers launching a first site.",
    features: [
      { text: "Tell your story simply so visitors see what makes you stand out" },
      { text: "Launch a clean 5-page site that builds trust in your programs" },
      { text: "Check weekly analytics to learn how families use your site" },
      { text: "Enjoy a free 7-day build and lifetime support for peace of mind" },
      { text: "NOT included: email tools, custom analytics, or priority support", isNegative: true },
    ],
    badge: "For First-Time Launches",
    extra_badge: "(5 Spots Available)",
    countdownTarget: "2026-01-01T23:59:59Z",
    ctaLabel: "Apply for Community Launch",
    ctaHref: "/base-plan",
    privacyNote: "Sacred trust: your domain, private hosting, no family info shared.",
  },
  // {
  //   name: "Excellence for schools and mosques",
  //   price: "$75/mo",
  //   period: "+ $500 setup fee",
  //   description:
  //     "Best for steady schools, counseling centers, and mosques needing a steady online presence.",
  //   features: [
  //     { text: "Monthly customized website performance report" },
  //     { text: "Quarterly site health review" },
  //     { text: "Two bi-weekly emails per month to families" },
  //     { text: "One featured community story per month" },
  //     { text: "Seasonal updates for Ramadan, back-to-school, and holidays" },
  //     { text: "You email us updates → we update your site within 48 hours → families see it" },
  //     { text: "Start with 14-day trial" },
  //     { text: "NOT included: custom learning management software tool", isNegative: true },
  //   ],
  //   highlighted: true,
  //   ribbon: "Recommended",
  //   badge: "Ready to grow teams",
  //   ctaLabel: "Apply for Excellence",
  //   ctaHref: "/middle-plan",
  //   theme: "dark",
  //   privacyNote: "Sacred trust: family, donation, and counseling info stay protected.",
  // },
  {
    name: "Islamic Educator Platform",
    price: "$0",
    period: "for one teaching quarter (trial)",
    description:
      "A Learning Management Platform built for Online Islamic schooling needs. Create structured curricula with lesson checkpoints, track student progress, and build community—all under your branding.",
    features: [
      { text: "Try the system to see if it fits your team's workflow" },
      { text: "Show your branding on every page" },
      { text: "Keep student and family records protected" },
      { text: "Create custom modules to organize your lessons" },
      { text: "Add lesson checkpoints so teachers review progress" },
      { text: "Track student progress with clear assessments" },
      { text: "Keep families connected with a private community page" },
      { text: "Use dedicated onboarding and support when you need it" },
      { text: "NOT included: your custom domain", isNegative: true },
    ],
    badge: "For programs ready to expand",
    ctaLabel: "Schedule a demo",
    ctaHref: "/custom-plan",
    theme: "premium",
    privacyNote: "Sacred trust: safe hosting and exclusive access.",
  },
]

export default function Home() {
  const shouldReduceMotion = useReducedMotion()
  const reduceMotion = shouldReduceMotion ?? false

  const sectionVariants = useMemo(
    () => createSectionVariants(reduceMotion),
    [reduceMotion],
  )
  const staggerContainerVariants = useMemo(
    () => createStaggerContainer(reduceMotion),
    [reduceMotion],
  )
  const staggerItemVariants = useMemo(
    () => createStaggerItem(reduceMotion),
    [reduceMotion],
  )
  const motionStyle = useMemo<CSSProperties>(
    () => ({ willChange: "opacity, transform" }),
    [],
  )

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 via-white to-white font-sans text-zinc-900">
      <NavBar />

      <AnimatePresence mode="wait">
        <motion.main
          key="landing-home"
          layout
          className="flex flex-col bg-white"
          variants={sectionVariants}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "show"}
          exit={reduceMotion ? undefined : "exit"}
          transition={{ duration: 0.4, ease: DEFAULT_EASE }}
          style={motionStyle}
        >
          {/* Hero section animates immediately with gentle rise and CTA sequencing. */}
          <motion.section
            id="hero"
            layout
            variants={sectionVariants}
            initial={reduceMotion ? undefined : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, ease: DEFAULT_EASE }}
            className="relative"
            style={motionStyle}
          >
            <div className="pointer-events-none absolute -left-24 top-[-15rem] h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-[-8rem] h-80 w-80 rounded-full bg-rose-300/30 blur-3xl" />
            <motion.div
              layout
              className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 py-24 text-center sm:px-8 lg:px-12"
              variants={staggerContainerVariants}
              style={motionStyle}
            >
              {heroFloatingIcons.map((item, index) => {
                const Icon = item.icon
                return (
                  <Icon
                    key={index}
                    aria-hidden="true"
                    className={`pointer-events-none absolute -z-10 hidden sm:block ${item.colorClass} ${item.opacityClass} ${item.sizeClass} ${item.animationClass} ${item.className}`}
                    style={item.style}
                  />
                )
              })}
              <motion.div
                layout
                variants={staggerItemVariants}
                className="z-10 mb-28 flex w-full max-w-3xl flex-col items-center gap-8"
                style={motionStyle}
              >
                <motion.span
                  layout
                  variants={staggerItemVariants}
                  className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-rose-600 shadow-inner"
                  style={motionStyle}
                >
                  <Zap className="h-4 w-4" />
                  Only 5 free spots available
                </motion.span>
                <motion.h1
                  layout
                  variants={staggerItemVariants}
                  className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
                  style={motionStyle}
                >
                  Launch a website that welcomes
                  <span className="ml-2 inline-block bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400 bg-clip-text text-transparent">
                    more families
                  </span>
                  {" "}this week.
                </motion.h1>
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="max-w-2xl text-lg font-semibold text-rose-600 sm:text-xl"
                  style={motionStyle}
                >
                  Reserve a free website for your school or masjid before the five openings fill up!
                </motion.p>
                <motion.p
                  layout
                  variants={staggerItemVariants}
                  className="max-w-2xl text-lg text-zinc-600 sm:text-xl"
                  style={motionStyle}
                >
                  We build every page so new families trust your faith-based programs fast.
                </motion.p>
                <motion.div
                  layout
                  variants={staggerItemVariants}
                  className="flex flex-col gap-4 sm:flex-row"
                  style={motionStyle}
                >
                  <Link
                    href="#pricing"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-7 py-3 text-base font-semibold text-white shadow-xl shadow-rose-200 transition-all duration-300 hover:-translate-y-1 hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
                  >
                    <Rocket className="h-4 w-4" />
                    Get your free build
                  </Link>
                  <Link
                    href="#problem"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 px-6 py-3 text-base font-semibold text-rose-500 transition-all duration-300 hover:-translate-y-1 hover:border-rose-300 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
                  >
                    <Compass className="h-4 w-4" />
                    See how it works
                  </Link>
                </motion.div>
                <motion.div
                  layout
                  variants={staggerItemVariants}
                  className="flex items-center gap-3 text-sm text-zinc-500"
                  style={motionStyle}
                >
                  <ShieldCheck className="h-4 w-4 text-rose-500" />
                  <span>7-day launch promise · No payment today</span>
                </motion.div>
              </motion.div>
          </motion.div>
        </motion.section>

        {/* Problem section waits for scroll and staggers each pain point card. */}
        <motion.section
          id="problem"
          layout
          className="scroll-mt-0 bg-white py-0 mt-20"
          variants={sectionVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.45, ease: DEFAULT_EASE }}
          style={motionStyle}
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <motion.div
              layout
              className="mx-auto max-w-3xl text-center"
              variants={staggerContainerVariants}
              style={motionStyle}
            >
              <motion.h2
                layout
                variants={staggerItemVariants}
                className="text-3xl font-bold sm:text-4xl"
                style={motionStyle}
              >
                People can't see your good work online
              </motion.h2>
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="mt-8 flex flex-col gap-3 text-lg text-zinc-600"
                style={motionStyle}
              >
                {[
                  "Families look online first for faith-based guidance, but your mission stays hidden.",
                  "Without a site, parents cannot see how you serve with ihsan.",
                  "Families who need you enroll somewhere else.",
                  "Our ummah misses the support only your institution can give.",
                  "When families can't find you online, your impact and enrollment drop.",
                ].map((line) => (
                  <motion.p
                    key={line}
                    layout
                    variants={staggerItemVariants}
                    style={motionStyle}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="mt-16 space-y-6"
              style={motionStyle}
            >
              {challenges.map((item) => (
                <motion.article
                  key={item.title}
                  layout
                  variants={staggerItemVariants}
                  className="flex items-start gap-4"
                  style={motionStyle}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <div className="flex-1 text-left">
                    {item.stat ? (
                      <p className="text-xl font-semibold text-rose-600 sm:text-2xl">
                        {item.stat}
                      </p>
                    ) : null}
                    {item.statSource ? (
                      <p className="text-xs uppercase tracking-wide text-zinc-500">
                        {item.statSource}
                      </p>
                    ) : null}
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900">{item.title}</h3>
                    <p className="mt-1 text-base text-zinc-600">{item.description}</p>
                    {item.contextNote ? (
                      <p className="mt-2 text-sm font-medium text-rose-500/90">{item.contextNote}</p>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </motion.div>
            <motion.p
              layout
              variants={staggerItemVariants}
              className="mt-10 text-left text-sm text-zinc-500 sm:text-center"
              style={motionStyle}
            >
              Sources: Network Solutions 2025, The Small Business Blog 2023, Pixolabo 2022, SEO.com 2025.
            </motion.p>
          </div>
        </motion.section>

        {/* Solution section uses staggered cards to explain phased support. */}
        <motion.section
          id="solution"
          layout
          className="scroll-mt-32 bg-gradient-to-b from-white via-rose-50 to-white py-20"
          variants={sectionVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.5, ease: DEFAULT_EASE }}
          style={motionStyle}
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="mx-auto max-w-3xl text-center"
              style={motionStyle}
            >
              <motion.h2
                layout
                variants={staggerItemVariants}
                className="text-3xl font-semibold sm:text-4xl"
                style={motionStyle}
              >
                Your mission
                <span className="mx-2 inline-block bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 bg-clip-text font-bold text-transparent">
                  finally shines online
                </span>
              </motion.h2>
              <motion.p
                layout
                variants={staggerItemVariants}
                className="mt-4 text-lg text-zinc-600"
                style={motionStyle}
              >
                We build a website that shares your story with care so families enroll with confidence and the Ummah feels your impact. Our 7-day build shows your real work without stress.
              </motion.p>
            </motion.div>
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="mt-14 grid gap-10 md:grid-cols-2"
              style={motionStyle}
            >
              {solutionPoints.map((point, index) => {
                const Icon = point.icon
                const stepNumber = index + 1
                const totalSteps = solutionPoints.length
                return (
                  <motion.article
                    key={point.highlight}
                    layout
                    variants={staggerItemVariants}
                    className="flex h-full flex-col gap-5 rounded-3xl border border-rose-100 bg-white/90 p-8 shadow-lg shadow-rose-100 transition-transform duration-300 hover:-translate-y-2 hover:border-rose-200 hover:shadow-xl"
                    style={motionStyle}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-rose-400 to-rose-500 text-xl font-bold text-white">
                        {stepNumber}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-rose-400">
                        Step {stepNumber} of {totalSteps}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-rose-500">
                      <Icon className="h-5 w-5" />
                      {point.highlight}
                    </span>
                    <h3 className="text-2xl font-semibold text-zinc-900">
                      <span className="inline-block bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 bg-clip-text font-bold text-transparent">
                        {point.emphasis}
                      </span>
                      <span className="mt-1 block text-lg font-semibold text-zinc-700">
                        {point.title}
                      </span>
                    </h3>
                    <p className="text-base text-zinc-600">{point.description}</p>
                    <motion.ul
                      layout
                      variants={staggerContainerVariants}
                      className="mt-4 space-y-3 text-base text-zinc-600"
                      style={motionStyle}
                    >
                      {point.bullets.map((bullet) => (
                        <motion.li
                          key={bullet}
                          layout
                          variants={staggerItemVariants}
                          className="flex items-start gap-3"
                          style={motionStyle}
                        >
                          <CheckCircle2 className="mt-1 size-5 text-rose-500 flex-shrink-0" />
                          <span className="font-medium text-zinc-700">{bullet}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </motion.section>

        {/*
        <section id="features" className="scroll-mt-32 bg-white py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-6 text-center">
              <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-rose-600">
                <ShieldCheck className="h-4 w-4" />
                Platform Features
              </span>
              <h2 className="text-3xl font-semibold sm:text-4xl">Features that boost trust and bookings</h2>
              <p className="mx-auto max-w-2xl text-lg text-zinc-600">
                We mix welcoming design with smart tech so more visitors stay, read, and choose your services.
              </p>
            </div>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {featureHighlights.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-rose-100 bg-white p-8 shadow-lg shadow-rose-100 transition-transform duration-300 hover:-translate-y-2 hover:bg-rose-50/60"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold text-zinc-900">{item.title}</h3>
                  <p className="text-base text-zinc-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* Process section uses pinned timeline line and staggered cards triggered on view. */}
        <motion.section
          id="process"
          layout
          className="scroll-mt-32 bg-gradient-to-b from-white via-rose-50 to-white py-20"
          variants={sectionVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.5, ease: DEFAULT_EASE }}
          style={motionStyle}
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="mx-auto max-w-3xl text-center"
              style={motionStyle}
            >
              <motion.span
                layout
                variants={staggerItemVariants}
                className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-rose-600"
                style={motionStyle}
              >
                <Workflow className="h-4 w-4" />
                1-week launch plan
              </motion.span>
              <motion.h2
                layout
                variants={staggerItemVariants}
                className="mt-4 text-3xl font-semibold sm:text-4xl"
                style={motionStyle}
              >
                Your website live in just 3 phases
              </motion.h2>
              <motion.p
                layout
                variants={staggerItemVariants}
                className="mt-3 text-lg text-zinc-600"
                style={motionStyle}
              >
                We move from idea to live site in seven days.
              </motion.p>
            </motion.div>
            <motion.div
              layout
              className="relative mt-16"
              variants={staggerContainerVariants}
              style={motionStyle}
            >
              <div className="pointer-events-none absolute left-[34px] top-16 h-[calc(100%-48px)] w-px bg-gradient-to-b from-rose-200 via-rose-400/50 to-rose-100 md:hidden" />
              <div className="pointer-events-none absolute top-12 hidden h-px w-full bg-gradient-to-r from-rose-200 via-rose-400/60 to-rose-100 md:block" />
              <motion.div
                layout
                variants={staggerContainerVariants}
                className="grid gap-10 md:grid-cols-3"
                style={motionStyle}
              >
                {processSteps.map((step) => {
                  const Icon = step.icon
                  const isHighlight = Boolean(step.highlight)
                  return (
                    <motion.article
                      key={step.phase}
                      layout
                      variants={staggerItemVariants}
                      className={`relative flex h-full flex-col gap-5 rounded-3xl border border-rose-100 bg-white p-8 shadow-lg shadow-rose-100 transition-transform duration-300 hover:-translate-y-2 ${isHighlight ? "border-rose-200 bg-rose-50/80 shadow-rose-200" : ""
                        }`}
                      style={motionStyle}
                    >
                      <span className="pointer-events-none absolute left-[27px] top-14 h-3 w-3 rounded-full bg-rose-500 md:hidden" />
                      <span className="pointer-events-none absolute left-1/2 top-0 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-rose-500 md:block" />
                      <div className="flex items-start gap-4">
                        <span
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-bold shadow-lg shadow-rose-100 ${isHighlight
                              ? "bg-gradient-to-br from-rose-500 via-rose-400 to-rose-500 text-white"
                              : "bg-rose-100 text-rose-600"
                            }`}
                        >
                          {step.phase}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-rose-500">
                            <Icon className="h-5 w-5" />
                            {step.timeframe}
                          </span>
                          <h3 className="mt-2 text-xl font-semibold text-zinc-900">{step.title}</h3>
                          {isHighlight ? (
                            <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-500">
                              7-day Milestone
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-rose-600">{step.outcome}</p>
                      <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-zinc-700">{step.support}</p>
                      {isHighlight ? (
                        <p className="mt-3 rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm font-semibold text-rose-500">
                          Your site shares your full story—classes, values, and mission—from day one.
                        </p>
                      ) : null}
                    </motion.article>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Services gallery cascades cards with whileInView trigger for each row. */}
        <motion.section
          id="services"
          layout
          className="scroll-mt-32 bg-gradient-to-b from-white via-rose-50 to-white py-20"
          variants={sectionVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.5, ease: DEFAULT_EASE }}
          style={motionStyle}
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="max-w-3xl"
              style={motionStyle}
            >
              <motion.h2
                layout
                variants={staggerItemVariants}
                className="text-3xl font-semibold sm:text-4xl"
                style={motionStyle}
              >
                This could be your website
              </motion.h2>
              <motion.p
                layout
                variants={staggerItemVariants}
                className="mt-4 text-lg text-zinc-600"
                style={motionStyle}
              >
                Explore a gallery of MuslimWeb builds. Picture how your institution could welcome families with confident design, thoughtful tools, and clear storytelling rooted in deen.
              </motion.p>
            </motion.div>
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="mt-14 grid gap-10 lg:grid-cols-3"
              style={motionStyle}
            >
              <AnimatePresence mode="popLayout">
                {serviceExamples.map((service) => (
                  <motion.article
                    key={service.name}
                    layout
                    variants={staggerItemVariants}
                    initial={reduceMotion ? undefined : "hidden"}
                    animate={reduceMotion ? undefined : "show"}
                    exit={reduceMotion ? undefined : "exit"}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-lg shadow-rose-100 transition-transform duration-300 hover:-translate-y-2 md:cursor-pointer md:hover:-translate-y-2"
                    style={motionStyle}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                        priority={false}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col px-8 pb-8 pt-6">
                      <div className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                        {service.category}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-zinc-900">{service.name}</h3>
                      <p className="mt-3 flex-1 text-base text-zinc-600">{service.description}</p>
                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-rose-600">
                        <service.icon className="h-4 w-4" />
                        Designed by MuslimWeb
                      </div>
                      <Link
                        href={service.href}
                        target="_blank"
                        rel="noreferrer"
                        prefetch={false}
                        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-rose-200 transition hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 md:hidden"
                      >
                        Open preview
                      </Link>
                    </div>
                    <Link
                      href={service.href}
                      target="_blank"
                      rel="noreferrer"
                      prefetch={false}
                      aria-label={`Open ${service.name} preview in a new tab`}
                      className="absolute inset-0 hidden md:block"
                    />
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.section>

        {/* Trust section layers badges with stagger to emphasize credibility. */}
        <motion.section
          id="trust"
          layout
          className="scroll-mt-32 bg-white py-20"
          variants={sectionVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.5, ease: DEFAULT_EASE }}
          style={motionStyle}
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="flex flex-col gap-6 text-center"
              style={motionStyle}
            >
              <motion.span
                layout
                variants={staggerItemVariants}
                className="mx-auto inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-rose-600"
                style={motionStyle}
              >
                <BadgeCheck className="h-4 w-4" />
                Built by Muslims, with institutions in mind
              </motion.span>
              <motion.h2
                layout
                variants={staggerItemVariants}
                className="text-3xl font-semibold sm:text-4xl"
                style={motionStyle}
              >
                Built for school and masjid teams that serve the ummah with integrity
              </motion.h2>
              <motion.p
                layout
                variants={staggerItemVariants}
                className="mx-auto max-w-3xl text-lg text-zinc-600"
                style={motionStyle}
              >
                We partner with Muslim-led schools, masjids, and Qur'an centers to honor their mission online, protect the families who trust them, and uplift their community impact.
              </motion.p>
            </motion.div>
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="mt-14 grid gap-8 md:grid-cols-2"
              style={motionStyle}
            >
              <AnimatePresence mode="popLayout">
                {trustSignals.map((signal, index) => {
                  const Icon = signal.icon
                  const isHighlight = Boolean(signal.highlight)
                  const badgeNumber = index + 1
                  return (
                    <motion.article
                      key={signal.title}
                      layout
                      variants={staggerItemVariants}
                      initial={reduceMotion ? undefined : "hidden"}
                      animate={reduceMotion ? undefined : "show"}
                      exit={reduceMotion ? undefined : "exit"}
                      className={`flex h-full flex-col gap-4 rounded-3xl border border-rose-100 bg-white p-8 text-left shadow-lg shadow-rose-100 transition-transform duration-300 hover:-translate-y-2 ${isHighlight ? "border-rose-200 bg-rose-50/90 shadow-rose-200" : "hover:bg-rose-50/60"
                        }`}
                      style={motionStyle}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold ${isHighlight
                              ? "bg-gradient-to-br from-rose-500 via-rose-400 to-rose-500 text-white"
                              : "bg-rose-100 text-rose-600"
                            }`}
                        >
                          {badgeNumber}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-rose-400">
                          Ref #{badgeNumber}
                        </span>
                      </div>
                      <span
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isHighlight ? "bg-gradient-to-br from-rose-500 via-rose-400 to-rose-500 text-white" : "bg-rose-100 text-rose-500"
                          }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      {signal.stat ? (
                        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-500">
                          {signal.stat}
                        </span>
                      ) : null}
                      <h3 className="text-lg font-semibold text-zinc-900">{signal.title}</h3>
                      <p className="text-sm text-zinc-600">{signal.description}</p>
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex items-start gap-2 text-zinc-500">
                          <XCircle className="mt-0.5 size-4 text-rose-400 flex-shrink-0" />
                          <span>{signal.contrastOther}</span>
                        </div>
                        <div className="flex items-start gap-2 font-semibold text-zinc-700">
                          <CheckCircle2 className="mt-0.5 size-4 text-rose-500 flex-shrink-0" />
                          <span>{signal.contrastUs}</span>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </AnimatePresence>
            </motion.div>
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="mt-16 flex flex-col items-center gap-4 text-center"
              style={motionStyle}
            >
              <motion.p
                layout
                variants={staggerItemVariants}
                className="text-sm font-medium uppercase tracking-wide text-rose-500"
                style={motionStyle}
              >
                Limited free builds: secure your school’s spot to better serve the ummah
              </motion.p>
              <motion.div
                layout
                variants={staggerItemVariants}
                style={motionStyle}
              >
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-rose-200 transition-transform duration-300 hover:-translate-y-1 hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
                >
                  <Rocket className="h-4 w-4" />
                  Secure your spot
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Pricing section staggers cards and respects plan theme styling. */}
        <motion.section
          id="pricing"
          layout
          className="scroll-mt-32 bg-gradient-to-b from-white via-rose-50 to-white py-20"
          variants={sectionVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.55, ease: DEFAULT_EASE }}
          style={motionStyle}
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="flex flex-col gap-6 text-center"
              style={motionStyle}
            >
              <motion.span
                layout
                variants={staggerItemVariants}
                className="mx-auto inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-rose-600"
                style={motionStyle}
              >
                <CalendarDays className="h-4 w-4" />
                Plans for your institution
              </motion.span>
              <motion.h2
                layout
                variants={staggerItemVariants}
                className="text-3xl font-semibold sm:text-4xl"
                style={motionStyle}
              >
                Pick the plan that fits your stage
              </motion.h2>
              <motion.p
                layout
                variants={staggerItemVariants}
                className="mx-auto max-w-2xl text-lg text-zinc-600"
                style={motionStyle}
              >
                We support first launches, growing parent trust, and expanding campuses with simple plans anchored in long-term partnership.
              </motion.p>
              <motion.p
                layout
                variants={staggerItemVariants}
                className="mx-auto max-w-2xl text-base text-zinc-600"
                style={motionStyle}
              >
                Pick the plan that matches your stage. You can always upgrade later, in sha Allah.
              </motion.p>
            </motion.div>
            <motion.div
              layout
              variants={staggerContainerVariants}
              className="mt-14 grid gap-10 lg:grid-cols-3"
              style={motionStyle}
            >
              <AnimatePresence mode="popLayout">
                {pricingTiers.map((tier) => {
                  const theme = tier.theme ?? "light"
                  const isDark = theme === "dark"
                  const isPremium = theme === "premium"
                  const daysRemaining = tier.countdownTarget
                    ? Math.max(
                      0,
                      Math.ceil(
                        (new Date(tier.countdownTarget).getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                      )
                    )
                    : null
                  return (
                    <motion.article
                      key={tier.name}
                      layout
                      variants={staggerItemVariants}
                      initial={reduceMotion ? undefined : "hidden"}
                      animate={reduceMotion ? undefined : "show"}
                      exit={reduceMotion ? undefined : "exit"}
                      className={`relative flex h-full flex-col rounded-3xl border p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2 ${tier.highlighted ? "scale-[1.02]" : ""
                        } ${isPremium
                          ? "border-blue-900 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-slate-100"
                          : isDark
                            ? "border-slate-800 bg-slate-900 text-slate-100"
                            : "border-rose-100 bg-white shadow-rose-100"
                        } ${tier.highlighted && theme === "light" ? "border-rose-300 bg-rose-50" : ""
                        }`}
                      style={motionStyle}
                    >
                      {tier.ribbon ? (
                        <span
                          className={`absolute -right-4 -top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-md ${isPremium
                              ? "bg-blue-500 text-white shadow-blue-300"
                              : isDark
                                ? "bg-emerald-300 text-slate-900 shadow-emerald-200"
                                : "bg-rose-500 text-white shadow-rose-200"
                            }`}
                        >
                          {tier.ribbon}
                        </span>
                      ) : null}
                      {tier.badge ? (
                        <span
                          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${isPremium
                              ? "bg-blue-900/70 text-sky-200"
                              : isDark
                                ? "bg-slate-800 text-emerald-200"
                                : "bg-rose-50 text-rose-500"
                            }`}
                        >
                          {tier.badge}
                        </span>
                      ) : null}
                      {tier.extra_badge ? (
                        <span
                          className={`mt-2 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${isPremium
                              ? "bg-blue-900/70 text-sky-200"
                              : isDark
                                ? "bg-slate-800 text-emerald-200"
                                : "bg-rose-500 text-rose-50"
                            }`}
                        >
                          <>
                            {tier.extra_badge === "(5 Spots Available)" && (
                              <Zap className='size-4 text-rose-50' />
                            )}
                          </>
                          {tier.extra_badge}
                        </span>
                      ) : null}
                      <div
                        className={`mt-4 text-sm font-semibold uppercase tracking-wide ${isPremium ? "text-sky-200" : isDark ? "text-sky-100" : "text-rose-500"
                          }`}
                      >
                        {tier.name}
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span
                          className={`text-4xl font-semibold ${isPremium || isDark ? "text-white" : "text-zinc-900"
                            }`}
                        >
                          {tier.price}
                        </span>
                        <span
                          className={`text-sm ${isPremium || isDark ? "text-slate-300" : "text-zinc-600"
                            }`}
                        >
                          {tier.period}
                        </span>
                      </div>
                      <p
                        className={`mt-4 text-sm font-medium ${isDark || isPremium ? "text-slate-200" : "text-zinc-600"
                          }`}
                      >
                        {tier.description}
                      </p>
                      {daysRemaining !== null ? (
                        <p
                          className={`mt-2 text-xs font-semibold uppercase tracking-wide ${isPremium ? "text-sky-200" : isDark ? "text-rose-200" : "text-rose-500"
                            }`}
                        >
                          {daysRemaining > 0 ? `${daysRemaining} days left · Ends Jan 1, 2026` : "Offer ends Jan 1, 2026"}
                        </p>
                      ) : null}
                      <motion.ul
                        layout
                        variants={staggerContainerVariants}
                        className={`mt-6 space-y-3 text-sm ${isPremium || isDark ? "text-slate-200" : "text-zinc-600"
                          }`}
                        style={motionStyle}
                      >
                        {tier.features.map(({ text, isNegative }, index) => {
                          const IconComponent = isNegative ? XCircle : CheckCircle2
                          const positiveColor = isPremium
                            ? "text-sky-300"
                            : isDark
                              ? "text-emerald-300"
                              : "text-rose-500"
                          const iconClassName = isNegative
                            ? "mt-0 h-5 w-5 flex-shrink-0 text-red-400"
                            : `mt-0 h-5 w-5 flex-shrink-0 ${positiveColor}`
                          const textClassName = isNegative ? "text-red-400" : ""

                          return (
                            <motion.li
                              key={`${tier.name}-feature-${index}`}
                              layout
                              variants={staggerItemVariants}
                              className="flex items-start gap-2"
                              style={motionStyle}
                            >
                              <IconComponent className={iconClassName} />
                              <span className={textClassName}>{text}</span>
                            </motion.li>
                          )
                        })}
                      </motion.ul>

                      <div className="bg-slate-300/20 w-full h-0.5 my-3 mt-10"></div>

                      <div
                        className={`mt-6 flex items-center gap-2 text-xs font-medium ${isPremium ? "text-sky-200" : isDark ? "text-emerald-200" : "text-rose-500"
                          }`}
                      >
                        <ShieldCheck
                          className={`size-6 flex-shrink-0 ${isPremium ? "text-sky-300" : isDark ? "text-emerald-300" : "text-rose-500"
                            }`}
                        />
                        <span>{tier.privacyNote}</span>
                      </div>
                      <div className="mt-8">
                        <Link
                          href={tier.ctaHref}
                          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 ${isPremium
                              ? "bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-slate-100 hover:-translate-y-1 hover:from-sky-500 hover:via-indigo-500 hover:to-sky-500 hover:text-white focus-visible:ring-blue-400/40"
                              : isDark
                                ? "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-slate-100 hover:-translate-y-1 hover:from-rose-500 hover:via-rose-400 hover:to-rose-500 hover:text-white focus-visible:ring-rose-200"
                                : tier.highlighted
                                  ? "bg-rose-500 text-white shadow-xl shadow-rose-200 hover:-translate-y-1 hover:bg-rose-400 focus-visible:ring-rose-200"
                                  : "border border-rose-200 text-rose-600 hover:-translate-y-1 hover:border-rose-300 hover:bg-rose-50 focus-visible:ring-rose-200"
                            }`}
                        >
                          <Handshake className="h-4 w-4" />
                          {tier.ctaLabel}
                        </Link>
                      </div>
                    </motion.article>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>
      </AnimatePresence>

      <CommonFooter />
    </div>
  )
}
