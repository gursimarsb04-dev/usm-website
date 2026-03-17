"use client";

import { useState } from "react";
import { ArrowRight, SpinnerGap } from "@phosphor-icons/react";
import { formatCurrency } from "@/lib/utils";

const AMOUNTS = [2500, 5000, 10000, 25000]; // in cents

export default function DonationForm({ donationGoal = 5000000 }: { donationGoal?: number }) {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amountState, setAmountState] = useState<number | "custom">(5000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedAmount = amountState === "custom" 
    ? (parseFloat(customAmount) * 100 || 0) 
    : amountState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAmount < 100) {
      setErrorMessage("Minimum donation is $1.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedAmount, frequency }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to initialize checkout.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_32px_rgba(0,0,0,0.05)] ring-1 ring-black/5 flex flex-col gap-8 max-w-xl w-full">
        
        {/* Frequency Toggle */}
        <div className="flex p-1 bg-navy/5 rounded-full relative">
          <button
            type="button"
            onClick={() => setFrequency("one-time")}
            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all z-10 ${
              frequency === "one-time" ? "text-navy shadow-sm bg-white" : "text-slate-body hover:text-navy"
            }`}
          >
            One-time
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all z-10 ${
              frequency === "monthly" ? "text-navy shadow-sm bg-white" : "text-slate-body hover:text-navy"
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Amount Preset Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {
                setAmountState(amt);
                setCustomAmount("");
              }}
              className={`py-3 rounded-2xl text-lg font-medium transition-all border ${
                amountState === amt
                  ? "bg-saffron/10 border-saffron text-saffron"
                  : "bg-white border-off-white text-slate-body hover:border-saffron/50 hover:bg-saffron/5"
              }`}
            >
              {formatCurrency(amt).replace(/\.00$/, "")}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-body font-medium">$</span>
          </div>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="Custom Amount"
            value={customAmount}
            onChange={(e) => {
              setAmountState("custom");
              setCustomAmount(e.target.value);
            }}
            className={`w-full bg-white border rounded-2xl pl-8 pr-4 py-3.5 outline-none transition-all font-medium placeholder:text-warm-gray/70 focus:ring-2 focus:ring-saffron/50 ${
              amountState === "custom" ? "border-saffron" : "border-off-white"
            }`}
          />
        </div>

        {/* Error Message */}
        {status === "error" && (
          <p className="text-red-500 text-sm font-medium -mt-4">{errorMessage}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading" || selectedAmount < 100}
          className="w-full bg-saffron text-navy py-4 rounded-full font-medium text-lg flex items-center justify-center gap-2 group transition-all hover:bg-saffron-light active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {status === "loading" ? (
            <SpinnerGap className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Donate {formatCurrency(selectedAmount || 0).replace(/\.00$/, "")} {frequency === "monthly" ? "Monthly" : ""}
              <ArrowRight weight="bold" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <p className="text-xs text-center text-warm-gray">
          Secure payment processing by Stripe. USM is a 501(c)(3) tax-exempt organization.
        </p>
      </form>
    </div>
  );
}
