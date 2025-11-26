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
  Send,
  Heart,
  Repeat2,
  Eye,
} from "lucide-react";

// Animated floating eggs
function FloatingEggs() {
  const eggs = [
    { id: 1, left: "10%", top: "20%", delay: 0, size: "text-4xl" },
    { id: 2, left: "85%", top: "15%", delay: 1, size: "text-3xl" },
    { id: 3, left: "75%", top: "70%", delay: 2, size: "text-5xl" },
    { id: 4, left: "5%", top: "75%", delay: 0.5, size: "text-3xl" },
    { id: 5, left: "45%", top: "85%", delay: 1.5, size: "text-4xl" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {eggs.map((egg) => (
        <motion.div
          key={egg.id}
          className={`absolute ${egg.size} opacity-20`}
          style={{ left: egg.left, top: egg.top }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            delay: egg.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🥚
        </motion.div>
      ))}
    </div>
  );
}

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
      className="bg-white rounded-2xl p-6 shadow-xl border-2 border-stone-100 max-w-md mx-auto"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl">
          🪿
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
      className="bg-white rounded-2xl p-6 border-2 border-stone-100 hover:border-orange-200 transition-colors cursor-pointer"
    >
      <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-orange-500" />
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600">{description}</p>
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
            Join 2,000+ marketers already on the waitlist
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
      className="text-center"
    >
      <motion.p
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, type: "spring" }}
        className="text-4xl md:text-5xl font-bold text-orange-500 mb-2"
      >
        {value}
      </motion.p>
      <p className="text-stone-600">{label}</p>
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
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{emoji}</span>
          <h3 className="text-xl font-bold text-stone-900">{title}</h3>
        </div>
        <p className="text-stone-600">{description}</p>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Floating eggs background */}
      <FloatingEggs />

      {/* Interactive cursor glow */}
      <div
        className="fixed w-64 h-64 rounded-full pointer-events-none opacity-30 blur-3xl bg-orange-300 transition-all duration-300"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-3xl">🪿</span>
            <span className="text-xl font-bold text-stone-900">MommyGoose</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-stone-600"
          >
            <Twitter className="w-5 h-5" />
            <span className="text-sm">@mommygoose</span>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full text-orange-600 font-medium text-sm mb-6"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Marketing Automation
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight"
              >
                Your Marketing
                <br />
                <span className="text-orange-500">on Autopilot</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-stone-600 mb-8"
              >
                Deploy autonomous AI agents that market your product 24/7. No
                more scheduling posts. No more staring at analytics. Just
                results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <WaitlistForm />
              </motion.div>
            </div>

            {/* Right side - Demo tweet */}
            <div className="relative">
              <DemoTweet />

              {/* Decorative elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 text-6xl"
              >
                🥚
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-10 -left-10 text-5xl"
              >
                🪿
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            <AnimatedStat value="24/7" label="Always Active" delay={0} />
            <AnimatedStat value="10x" label="More Engagement" delay={0.1} />
            <AnimatedStat value="0" label="Manual Posts" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
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

          <div className="grid md:grid-cols-3 gap-6">
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-12 border-2 border-stone-100 shadow-xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              🪿
            </motion.div>
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Ready to put your marketing on autopilot?
            </h2>
            <p className="text-xl text-stone-600 mb-8">
              Join the waitlist and be first to know when MommyGoose hatches.
            </p>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-stone-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🪿</span>
          <span className="font-semibold text-stone-700">MommyGoose</span>
        </div>
        <p className="text-sm">
          AI-powered marketing automation. Coming soon.
        </p>
      </footer>
    </main>
  );
}
