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
      className="bg-white rounded-2xl p-6 shadow-xl border-2 border-stone-100"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl flex-shrink-0">
          🪿
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
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
            className="inline-block w-0.5 h-5 bg-orange-500 ml-1 align-middle"
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
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 border-2 border-stone-100 hover:border-orange-200 transition-all"
    >
      <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-orange-500" />
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{description}</p>
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
          className="text-center py-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-16 h-16 rounded-full bg-orange-500 mx-auto flex items-center justify-center mb-4"
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-stone-900 mb-2">
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
          className="w-full max-w-md mx-auto"
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
              className="flex-1 px-5 py-3.5 bg-transparent outline-none text-stone-900 placeholder-stone-400 min-w-0"
            />
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="m-1.5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold flex items-center gap-2 transition-colors disabled:opacity-70 whitespace-nowrap"
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
            Join <span className="font-semibold text-orange-600">500+</span> marketers already on the waitlist
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// Animated stats
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center px-4"
    >
      <motion.p
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, type: "spring" }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-2"
      >
        {value}
      </motion.p>
      <p className="text-stone-600 text-sm sm:text-base">{label}</p>
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
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-start gap-4"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{emoji}</span>
          <h3 className="text-xl font-bold text-stone-900">{title}</h3>
        </div>
        <p className="text-stone-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-3xl">🪿</span>
            <span className="text-xl font-bold text-stone-900">MommyGoose</span>
          </motion.div>
          <motion.a
            href="https://twitter.com/mommygoose"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-stone-600 hover:text-orange-500 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">@mommygoose</span>
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Text */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-600 font-medium text-sm mb-6"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Marketing Automation
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 leading-tight"
              >
                Your Marketing
                <br />
                <span className="text-orange-500">on Autopilot</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-stone-600 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Deploy autonomous AI agents that market your product 24/7. No
                more scheduling posts. No more staring at analytics. Just
                results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <WaitlistForm />
              </motion.div>
            </div>

            {/* Right side - Demo tweet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <DemoTweet />

              {/* Subtle decorative elements */}
              <div className="absolute -top-6 -right-6 text-5xl opacity-50 hidden lg:block">
                🥚
              </div>
              <div className="absolute -bottom-6 -left-6 text-4xl opacity-50 hidden lg:block">
                🪿
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white border-y border-stone-200">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <AnimatedStat value="24/7" label="Always Active" delay={0} />
            <AnimatedStat value="10x" label="More Engagement" delay={0.1} />
            <AnimatedStat value="0" label="Manual Posts" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              Why MommyGoose?
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
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
              delay={0.1}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Real Analytics"
              description="Track what works and watch your AI learn and improve over time."
              delay={0.2}
            />
            <FeatureCard
              icon={Clock}
              title="24/7 Presence"
              description="Your marketing never sleeps. AI works around the clock in every timezone."
              delay={0.3}
            />
            <FeatureCard
              icon={Zap}
              title="Instant Setup"
              description="Deploy your first AI agent in minutes. No complex configuration needed."
              delay={0.4}
            />
            <FeatureCard
              icon={Sparkles}
              title="Human-like Content"
              description="Content that feels genuine, not robotic. Your audience won't know the difference."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 px-6 bg-white border-y border-stone-200">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-stone-600">
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
      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-stone-200 shadow-lg text-center"
          >
            <div className="text-6xl mb-6">🪿</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
              Ready to put your marketing on autopilot?
            </h2>
            <p className="text-lg text-stone-600 mb-8">
              Join the waitlist and be first to know when MommyGoose hatches.
            </p>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪿</span>
            <span className="font-semibold text-stone-700">MommyGoose</span>
          </div>
          <p className="text-sm text-stone-500">
            AI-powered marketing automation. Coming soon.
          </p>
        </div>
      </footer>
    </main>
  );
}
