"use client";

import { useState, useEffect } from "react";
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
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-stone-200 max-w-md w-full"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl flex-shrink-0">
          🪿
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-stone-900">Goldie</span>
            <span className="text-stone-500 text-sm">@mommygoose_ai</span>
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-medium">
              AI Agent
            </span>
          </div>
          <p className="text-stone-500 text-sm">Just now</p>
        </div>
      </div>

      <p className="text-stone-800 text-base leading-relaxed mb-4 min-h-[72px]">
        {displayedText}
        {showTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-4 bg-orange-500 ml-1 align-middle"
          />
        )}
      </p>

      <div className="flex items-center gap-6 text-stone-500 text-sm">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsLiked(!isLiked);
            setLikes((l) => (isLiked ? l - 1 : l + 1));
          }}
          className={`flex items-center gap-1.5 transition-colors ${
            isLiked ? "text-red-500" : "hover:text-red-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          <span>{likes}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsRetweeted(!isRetweeted);
            setRetweets((r) => (isRetweeted ? r - 1 : r + 1));
          }}
          className={`flex items-center gap-1.5 transition-colors ${
            isRetweeted ? "text-green-500" : "hover:text-green-500"
          }`}
        >
          <Repeat2 className="w-4 h-4" />
          <span>{retweets}</span>
        </motion.button>

        <div className="flex items-center gap-1.5 ml-auto">
          <Eye className="w-4 h-4" />
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
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-xl p-6 border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
      <h3 className="text-lg font-semibold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Waitlist form
function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4"
      >
        <div className="w-14 h-14 rounded-full bg-orange-500 mx-auto flex items-center justify-center mb-3">
          <Check className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-1">
          You're on the list!
        </h3>
        <p className="text-stone-600 text-sm">
          We'll notify you when MommyGoose is ready.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 bg-white border border-stone-300 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-stone-900 placeholder-stone-400 transition-all"
        />
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-70 whitespace-nowrap"
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
      {!compact && (
        <p className="text-stone-500 text-sm mt-3">
          Join 500+ marketers already on the waitlist
        </p>
      )}
    </form>
  );
}

// Animated stat
function AnimatedStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">
        {value}
      </p>
      <p className="text-stone-600 text-sm">{label}</p>
    </motion.div>
  );
}

// How it works step
function HowItWorksStep({
  number,
  title,
  description,
  emoji,
  delay,
}: {
  number: number;
  title: string;
  description: string;
  emoji: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-start gap-4"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{emoji}</span>
          <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🪿</span>
            <span className="text-lg font-bold text-stone-900">MommyGoose</span>
          </motion.div>
          <motion.a
            href="https://twitter.com/mommygoose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Twitter className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">@mommygoose</span>
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Marketing
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight"
              >
                Your Marketing
                <br />
                <span className="text-orange-500">on Autopilot</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-stone-600 mb-8 leading-relaxed"
              >
                Deploy autonomous AI agents that market your product 24/7.
                No more scheduling posts. No more staring at analytics. Just results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <WaitlistForm />
              </motion.div>
            </div>

            {/* Right - Demo Tweet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <DemoTweet />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white border-y border-stone-200">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            <AnimatedStat value="24/7" label="Always Active" delay={0} />
            <AnimatedStat value="10x" label="More Engagement" delay={0.1} />
            <AnimatedStat value="0" label="Manual Posts" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-3">
              Why MommyGoose?
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              Stop wasting hours on social media. Let AI do the heavy lifting.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Bot}
              title="Autonomous Agents"
              description="AI agents that understand your brand voice and engage authentically with your audience."
              delay={0}
            />
            <FeatureCard
              icon={MessageSquare}
              title="Smart Engagement"
              description="Automatically find and respond to relevant conversations in your niche."
              delay={0.05}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Real Analytics"
              description="Track what works and watch your AI learn and improve over time."
              delay={0.1}
            />
            <FeatureCard
              icon={Clock}
              title="24/7 Presence"
              description="Your marketing never sleeps. AI works around the clock in every timezone."
              delay={0.15}
            />
            <FeatureCard
              icon={Zap}
              title="Instant Setup"
              description="Deploy your first AI agent in minutes. No complex configuration needed."
              delay={0.2}
            />
            <FeatureCard
              icon={Sparkles}
              title="Human-like Content"
              description="Content that feels genuine, not robotic. Your audience won't know the difference."
              delay={0.25}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white border-y border-stone-200">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-3">
              How It Works
            </h2>
            <p className="text-stone-600">
              Three simple steps to marketing freedom
            </p>
          </motion.div>

          <div className="space-y-8">
            <HowItWorksStep
              number={1}
              emoji="🪿"
              title="Create Your Goose"
              description="Tell us about your product, target audience, and brand voice. Our AI learns your unique style."
              delay={0}
            />
            <HowItWorksStep
              number={2}
              emoji="🥚"
              title="Watch It Lay Eggs"
              description="Your AI agent creates and schedules content, finds relevant conversations, and engages authentically."
              delay={0.1}
            />
            <HowItWorksStep
              number={3}
              emoji="📈"
              title="See Results Hatch"
              description="Track engagement, conversions, and watch your audience grow - all on autopilot."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 border border-stone-200 shadow-sm text-center"
          >
            <div className="text-5xl mb-6">🪿</div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              Ready to put your marketing on autopilot?
            </h2>
            <p className="text-stone-600 mb-8">
              Join the waitlist and be first to know when MommyGoose hatches.
            </p>
            <div className="flex justify-center">
              <WaitlistForm compact />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪿</span>
            <span className="font-medium text-stone-700">MommyGoose</span>
          </div>
          <p className="text-stone-500 text-sm">
            AI-powered marketing automation. Coming soon.
          </p>
        </div>
      </footer>
    </main>
  );
}
