"use client";

import { useState, FormEvent } from "react";

export default function InsuranceInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    coverageType: "whole-life",
    coverageAmount: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const coverageLabels: Record<string, string> = {
      "whole-life": "Whole Life Insurance",
      "term-life": "Term Life Insurance",
      "variable-annuity": "Variable Annuity",
      "iul": "Indexed Universal Life (IUL)",
      "not-sure": "Not Sure — Need Guidance",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: "wealth-waterfall",
          message: [
            `Age: ${formData.age}`,
            `Coverage Type: ${coverageLabels[formData.coverageType] || formData.coverageType}`,
            formData.coverageAmount
              ? `Coverage Amount: ${formData.coverageAmount}`
              : null,
            formData.message ? `\nAdditional Details:\n${formData.message}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        coverageType: "whole-life",
        coverageAmount: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-navy-light border border-gold/30 rounded-lg p-8 text-center">
        <div className="text-gold text-4xl mb-4">&#10003;</div>
        <h3 className="text-xl font-heading font-bold text-cream mb-2">
          Inquiry Received
        </h3>
        <p className="text-slate">
          Tunde will review your information and reach out within 24 hours to
          discuss your personalized Wealth Waterfall strategy.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-gold text-sm underline hover:text-gold-light"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="inq-name"
            className="block text-sm font-medium text-cream mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="inq-name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream placeholder-slate/50 focus:outline-none focus:border-gold transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label
            htmlFor="inq-email"
            className="block text-sm font-medium text-cream mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="inq-email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream placeholder-slate/50 focus:outline-none focus:border-gold transition-colors"
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="inq-phone"
            className="block text-sm font-medium text-cream mb-2"
          >
            Phone *
          </label>
          <input
            type="tel"
            id="inq-phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream placeholder-slate/50 focus:outline-none focus:border-gold transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label
            htmlFor="inq-age"
            className="block text-sm font-medium text-cream mb-2"
          >
            Age *
          </label>
          <input
            type="number"
            id="inq-age"
            required
            min="18"
            max="85"
            value={formData.age}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, age: e.target.value }))
            }
            className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream placeholder-slate/50 focus:outline-none focus:border-gold transition-colors"
            placeholder="35"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="inq-coverage-type"
            className="block text-sm font-medium text-cream mb-2"
          >
            Coverage Type
          </label>
          <select
            id="inq-coverage-type"
            value={formData.coverageType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                coverageType: e.target.value,
              }))
            }
            className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
          >
            <option value="whole-life">Whole Life Insurance</option>
            <option value="term-life">Term Life Insurance</option>
            <option value="variable-annuity">Variable Annuity</option>
            <option value="iul">Indexed Universal Life (IUL)</option>
            <option value="not-sure">Not Sure — Need Guidance</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="inq-coverage-amount"
            className="block text-sm font-medium text-cream mb-2"
          >
            Desired Coverage Amount
          </label>
          <select
            id="inq-coverage-amount"
            value={formData.coverageAmount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                coverageAmount: e.target.value,
              }))
            }
            className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
          >
            <option value="">Select an amount</option>
            <option value="$50,000 - $100,000">$50,000 - $100,000</option>
            <option value="$100,000 - $250,000">$100,000 - $250,000</option>
            <option value="$250,000 - $500,000">$250,000 - $500,000</option>
            <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
            <option value="$1,000,000+">$1,000,000+</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="inq-message"
          className="block text-sm font-medium text-cream mb-2"
        >
          Tell us about your goals
        </label>
        <textarea
          id="inq-message"
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream placeholder-slate/50 focus:outline-none focus:border-gold transition-colors resize-none"
          placeholder="What are your financial goals? Who are you looking to protect? Any existing coverage?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold text-navy font-semibold py-3 px-6 rounded hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Submitting..." : "Get Your Free Consultation"}
      </button>

      <p className="text-slate/60 text-xs text-center">
        This is not a binding quote. Tunde will reach out to discuss your
        personalized strategy and provide accurate pricing.
      </p>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again or call us at (786) 591-1354.
        </p>
      )}
    </form>
  );
}
