"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sparkles,
  Bot,
  MessageSquare,
  TrendingUp,
  Clock,
  Zap,
  Twitter,
  Heart,
  Repeat2,
  Eye,
  Feather,
  Workflow,
} from "lucide-react";

// Interactive demo tweet
function DemoTweet() {
  const [likes, setLikes] = useState(47);
  const [retweets, setRetweets] = useState(12);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [showTyping, setShowTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");

  const tweetText =
    "Just discovered MommyGoose and my marketing is literally running itself now. The AI understands my brand voice perfectly. This is the future.";

  useEffect(() => {
    if (showTyping && displayedText.length < tweetText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(tweetText.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (displayedText.length === tweetText.length) {
      setShowTyping(false);
    }
  }, [displayedText, showTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-stone-200 max-w-md mx-auto"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
          <Feather className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">Goldie</span>
            <span className="text-stone-500 text-sm">@mommygoose_ai</span>
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-medium">
              AI Agent
            </span>
          </div>
          <p className="text-stone-500 text-sm">Just now</p>
        </div>
      </div>

      <p className="text-stone-800 text-lg mb-4 min-h-[80px]">
        {displayedText}
        {showTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-5 bg-orange-500 ml-1"
          />
        )}
      </p>

      <div className="flex items-center gap-6 text-stone-500">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsLiked(!isLiked);
            setLikes((l) => (isLiked ? l - 1 : l + 1));
          }}
          className={`flex items-center gap-2 transition-colors ${
            isLiked ? "text-red-500" : "hover:text-red-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          <span>{likes}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsRetweeted(!isRetweeted);
            setRetweets((r) => (isRetweeted ? r - 1 : r + 1));
          }}
          className={`flex items-center gap-2 transition-colors ${
            isRetweeted ? "text-green-500" : "hover:text-green-500"
          }`}
        >
          <Repeat2 className="w-5 h-5" />
          <span>{retweets}</span>
        </motion.button>

        <div className="flex items-center gap-2 ml-auto">
          <Eye className="w-5 h-5" />
          <span>1.2K</span>
        </div>
      </div>
    </motion.div>
  );
}

// Feature card
function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-orange-300 transition-colors cursor-pointer h-full flex flex-col"
    >
      <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-orange-500" />
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 leading-relaxed flex-1">{description}</p>
    </motion.div>
  );
}

// Waitlist form
function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-20 h-20 rounded-full bg-orange-500 mx-auto flex items-center justify-center mb-4"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-stone-900 mb-2">
            You're on the list!
          </h3>
          <p className="text-stone-600">
            We'll notify you when MommyGoose is ready to hatch.
          </p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
        >
          <div
            className={`relative flex items-center bg-white rounded-full border-2 transition-all duration-300 ${
              isFocused
                ? "border-orange-500 shadow-lg shadow-orange-100"
                : "border-stone-200"
            }`}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 bg-transparent outline-none text-stone-900 placeholder-stone-400"
            />
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="m-1.5 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold flex items-center gap-2 transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
          <p className="text-center text-stone-500 text-sm mt-4">
            Join 500+ marketers already on the waitlist
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function StatCard({
  value,
  label,
  detail,
  delay,
}: {
  value: string;
  label: string;
  detail: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white border border-stone-200 rounded-2xl p-6 text-center shadow-sm"
    >
      <p className="text-4xl font-bold text-orange-600 mb-2">{value}</p>
      <p className="text-stone-900 font-semibold mb-1">{label}</p>
      <p className="text-stone-500 text-sm leading-relaxed">{detail}</p>
    </motion.div>
  );
}

function HowItWorksStep({
  step,
  icon: Icon,
  title,
  description,
  delay,
}: {
  step: number;
  icon: any;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative bg-white border border-stone-200 rounded-2xl p-6 shadow-sm h-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 text-orange-700 font-semibold flex items-center justify-center">
          {step}
        </div>
        <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-orange-600" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/90 backdrop-blur-md border-b border-stone-200/60">
        <div className="max-w-6xl mx-auto grid grid-cols-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-8 flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center">
              <Feather className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">MommyGoose</p>
              <p className="text-lg font-bold text-stone-900">Autopilot Marketing</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-4 flex items-center justify-end gap-2 text-stone-600"
          >
            <Twitter className="w-5 h-5" />
            <span className="text-sm font-medium">@mommygoose</span>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-10 items-center">
          {/* Left side - Text */}
          <div className="col-span-12 md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full text-orange-600 font-semibold text-xs uppercase tracking-[0.15em] mb-6"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Growth Engine
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight mb-6"
            >
              Marketing that runs itself.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-stone-600 leading-relaxed mb-10"
            >
              Launch a fleet of AI agents that protect your voice, publish in a unified rhythm, and keep your brand growing while you sleep.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <WaitlistForm />
            </motion.div>
          </div>

          {/* Right side - Mascot + preview */}
          <div className="col-span-12 md:col-span-5">
            <div className="bg-white border border-orange-100 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center">
                  <Feather className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Meet the Goose</p>
                  <p className="text-2xl font-bold text-stone-900">Steady, on-brand, always live.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                  <p className="text-sm font-semibold text-orange-700 mb-1">Tone</p>
                  <p className="text-stone-800">Warm, confident, and concise. Never spammy.</p>
                </div>
                <DemoTweet />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <StatCard
                value="24/7"
                label="Always Active"
                detail="Agents publishing, replying, and iterating continuously."
                delay={0}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <StatCard
                value="10x"
                label="More Engagement"
                detail="Consistent presence and fast responses keep audiences hooked."
                delay={0.1}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <StatCard
                value="0"
                label="Manual Posts"
                detail="Strategy-first automation, not endless scheduling." 
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Why MommyGoose?
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Stop wasting hours on social media. Let AI do the heavy lifting.
            </p>
          </motion.div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            <div className="col-span-12 md:col-span-4">
              <FeatureCard
                icon={Bot}
                title="Autonomous Agents"
                description="AI agents that understand your brand voice and engage authentically with your audience."
                delay={0}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <FeatureCard
                icon={MessageSquare}
                title="Smart Engagement"
                description="Automatically find and respond to relevant conversations in your niche."
                delay={0.1}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <FeatureCard
                icon={TrendingUp}
                title="Real Analytics"
                description="Track what works and watch your AI learn and improve over time."
                delay={0.2}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <FeatureCard
                icon={Clock}
                title="24/7 Presence"
                description="Your marketing never sleeps. AI works around the clock in every timezone."
                delay={0.3}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <FeatureCard
                icon={Zap}
                title="Instant Setup"
                description="Deploy your first AI agent in minutes. No complex configuration needed."
                delay={0.4}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <FeatureCard
                icon={Sparkles}
                title="Human-like Content"
                description="Content that feels genuine, not robotic. Your audience won't know the difference."
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-stone-600">
              Three deliberate steps from setup to live results
            </p>
          </motion.div>

          <div className="relative grid grid-cols-12 gap-6">
            <div className="hidden md:block absolute top-[52px] left-4 right-4 h-px bg-orange-100" aria-hidden />

            <div className="col-span-12 md:col-span-4">
              <HowItWorksStep
                step={1}
                icon={Bot}
                title="Create your goose"
                description="Define your brand voice, guardrails, and goals. The agent learns before it posts."
                delay={0}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <HowItWorksStep
                step={2}
                icon={Workflow}
                title="Watch it lay eggs"
                description="Content, replies, and outreach are scheduled on a unified 12-column grid so every touchpoint aligns."
                delay={0.1}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <HowItWorksStep
                step={3}
                icon={TrendingUp}
                title="See results"
                description="Dashboards surface wins, and the agent adapts automatically for the next cycle."
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-28 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-12 border border-stone-200 shadow-xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-50 text-orange-700 font-semibold uppercase text-xs tracking-[0.2em] mb-6">
              <Sparkles className="w-4 h-4" />
              Ready to launch
            </div>
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Ready to put your marketing on autopilot?
            </h2>
            <p className="text-xl text-stone-600 leading-relaxed mb-8">
              Join the waitlist and be first to know when MommyGoose opens the coop.
            </p>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-stone-500 bg-white border-t border-stone-100">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center">
            <Feather className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-left">
            <p className="text-sm uppercase tracking-[0.18em] text-stone-500">MommyGoose</p>
            <p className="text-base font-semibold text-stone-800">Autonomous marketing</p>
          </div>
        </div>
        <p className="text-sm">AI-powered marketing automation. Coming soon.</p>
      </footer>
    </main>
  );
}
