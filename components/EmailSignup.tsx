"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, SpinnerGap } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmailSignup({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setEmail("");
        }, 3000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to subscribe. Please try again.");
    }
  };

  const isDark = theme === "dark";

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="relative flex items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          disabled={status === "loading" || status === "success"}
          className={`w-full rounded-full pl-6 pr-14 py-3.5 outline-none transition-all focus:ring-2 focus:ring-saffron disabled:opacity-70 font-body ${
            isDark
              ? "bg-white/10 text-white placeholder-white/40 border-none"
              : "bg-white text-navy border border-black/10 shadow-sm"
          }`}
          required
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`absolute right-1.5 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-70 ${
            status === "success"
              ? "bg-green-500 text-white"
              : "bg-saffron text-navy hover:bg-saffron-light active:scale-95"
          }`}
        >
          <AnimatePresence mode="wait">
            {status === "loading" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                className="animate-spin"
              >
                <SpinnerGap weight="bold" className="w-5 h-5" />
              </motion.div>
            ) : status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle weight="fill" className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <ArrowRight weight="bold" className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-4 text-xs font-medium text-green-500"
        >
          You're in! Check your inbox.
        </motion.p>
      )}
      
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-4 text-xs font-medium text-red-500"
        >
          {errorMessage}
        </motion.p>
      )}
    </form>
  );
}
