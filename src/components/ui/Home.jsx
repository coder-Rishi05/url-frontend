import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🔗",
      title: "Instant Shortening",
      desc: "Paste any long URL and get a clean short link in one click. No friction, no delays.",
    },
    {
      icon: "📊",
      title: "Click Analytics",
      desc: "See exactly how many times your link was clicked. Real-time data at your fingertips.",
    },
    {
      icon: "🛡️",
      title: "Secure & Reliable",
      desc: "All links are stored securely. JWT-protected accounts keep your data safe.",
    },
    {
      icon: "⏳",
      title: "Link Expiry",
      desc: "Set expiry on your short links. Expired links automatically stop working.",
    },
    {
      icon: "🧑‍💼",
      title: "Admin Panel",
      desc: "Admins can manage all users, approve credit requests, and oversee every link on the platform.",
    },
    {
      icon: "📋",
      title: "User Dashboard",
      desc: "View all your shortened links, check click counts, and manage everything from one place.",
    },
    {
      icon: "🪙",
      title: "Credit System",
      desc: "Each link creation costs one credit. Request more credits from admin anytime.",
    },
    {
      icon: "🔒",
      title: "Role-Based Access",
      desc: "Separate roles for users and admins. Everyone sees only what they need.",
    },
    {
      icon: "📱",
      title: "Works Everywhere",
      desc: "Fully responsive. Use Shortify on desktop, tablet, or mobile without any issues.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Create Your Account",
      desc: "Sign up in seconds. You get 5 free credits immediately — no credit card needed.",
      tag: "Free",
    },
    {
      step: "02",
      title: "Paste Your Long URL",
      desc: "Enter any URL, no matter how long. Shortify will generate a unique short link instantly.",
      tag: "Instant",
    },
    {
      step: "03",
      title: "Share Your Short Link",
      desc: "Copy the short link and share it anywhere — social media, emails, messages, wherever.",
      tag: "Easy",
    },
    {
      step: "04",
      title: "Track Every Click",
      desc: "Visit your dashboard to see click counts and monitor how your links are performing.",
      tag: "Insights",
    },
  ];

  const plans = [
    {
      name: "Free",
      credits: "5 Credits",
      price: "₹0",
      desc: "Perfect to get started. 5 credits on signup with no conditions.",
      perks: [
        "5 short links",
        "Click tracking",
        "Link expiry",
        "Dashboard access",
      ],
      badge: null,
    },
    {
      name: "Request More",
      credits: "Custom",
      price: "On Request",
      desc: "Need more links? Request additional credits directly from the admin panel.",
      perks: [
        "Unlimited requests",
        "Admin approval",
        "Instant credit top-up",
        "Priority support",
      ],
      badge: "Popular",
    },
  ];

  return (
    <div className="bg-base-200">
      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="badge badge-warning bg-orange-400/80 text-white font-bold font-mono badge-lg gap-2 px-4 py-3"
            >
              🚧 Currently in Beta — Feedback welcome!
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="badge badge-primary badge-lg gap-2 px-4 py-3"
            >
              ✨ Free to use — No credit card required
            </motion.div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black leading-tight">
            Shorten. <span className="text-primary">Share.</span> Track.
          </h1>

          <p className="mt-6 text-base-content/70 text-base sm:text-xl leading-relaxed">
            Turn long, ugly URLs into clean, powerful short links in seconds.
            Track every click, manage all your links, and share with confidence.
          </p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 sm:gap-10 mt-10 text-center"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-black text-primary">
                10k+
              </p>
              <p className="text-xs sm:text-sm text-base-content/50 mt-1">
                Links Shortened
              </p>
            </div>
            <div className="w-px bg-base-content/20" />
            <div>
              <p className="text-2xl sm:text-3xl font-black text-primary">
                500+
              </p>
              <p className="text-xs sm:text-sm text-base-content/50 mt-1">
                Active Users
              </p>
            </div>
            <div className="w-px bg-base-content/20" />
            <div>
              <p className="text-2xl sm:text-3xl font-black text-primary">
                99.9%
              </p>
              <p className="text-xs sm:text-sm text-base-content/50 mt-1">
                Uptime
              </p>
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="btn btn-primary btn-lg w-full sm:w-auto"
              onClick={() => navigate("/register")}
            >
              Get Started Free
            </button>
            <button className="btn btn-outline btn-lg w-full sm:w-auto">
              Learn More
            </button>
          </div>

          <p className="mt-6 text-xs sm:text-sm text-base-content/40">
            Join hundreds of users already shortening links with Shortify
          </p>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-4 sm:px-6 bg-base-100">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-black">
            Everything You Need
          </h2>
          <p className="text-base-content/60 mt-3 text-base sm:text-lg">
            Powerful features packed into a simple, clean interface.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="card bg-base-200 shadow p-6 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="text-base-content/60 mt-1 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-black">How It Works</h2>
          <p className="text-base-content/60 mt-3 text-base sm:text-lg">
            Up and running in under a minute.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="card bg-base-100 shadow-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <span className="text-7xl font-black text-primary/10 absolute -top-2 -right-2 select-none">
                {s.step}
              </span>
              <span className="badge badge-primary badge-sm mb-3">{s.tag}</span>
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="text-base-content/60 mt-2 text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-20 px-4 sm:px-6 bg-base-100">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-black">Simple Pricing</h2>
          <p className="text-base-content/60 mt-3 text-base sm:text-lg">
            No subscriptions. No hidden fees. Just credits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              className={`card bg-base-200 shadow-xl p-6 sm:p-8 relative ${p.badge ? "border-2 border-primary" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              {p.badge && (
                <span className="badge badge-primary absolute top-4 right-4">
                  {p.badge}
                </span>
              )}
              <h3 className="text-xl font-black">{p.name}</h3>
              <p className="text-4xl sm:text-5xl font-black text-primary mt-3">
                {p.price}
              </p>
              <p className="text-base-content/60 mt-2 text-sm">{p.desc}</p>

              <ul className="mt-5 space-y-2">
                {p.perks.map((perk, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-sm text-base-content/70"
                  >
                    <span className="text-primary font-black">✓</span> {perk}
                  </li>
                ))}
              </ul>

              <button
                className={`btn mt-8 w-full ${p.badge ? "btn-primary" : "btn-outline"}`}
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-base-300 pt-14 pb-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-2xl font-black text-primary">Shortify</p>
            <p className="text-base-content/60 mt-2 text-sm leading-relaxed">
              A simple, fast URL shortener built for everyone. Shorten smarter.
              Track better.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold mb-3 text-base-content/80">Quick Links</p>
            <ul className="space-y-2 text-sm text-base-content/60">
              <li>
                <a className="hover:text-primary cursor-pointer transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary cursor-pointer transition-colors"
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary cursor-pointer transition-colors"
                  onClick={() => navigate("/register")}
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary cursor-pointer transition-colors"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-bold mb-3 text-base-content/80">Info</p>
            <ul className="space-y-2 text-sm text-base-content/60">
              <li>
                <a className="hover:text-primary cursor-pointer transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-primary cursor-pointer transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a className="hover:text-primary cursor-pointer transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-base-content/10 pt-6 text-center text-sm text-base-content/40">
          © 2025 Shortify. All rights reserved. Built with ❤️ by Rishi.
        </div>
      </footer>
    </div>
  );
};

export default Home;
