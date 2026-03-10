"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "wealth-waterfall",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "wealth-waterfall",
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
          Message Sent
        </h3>
        <p className="text-slate">
          Thank you for reaching out. Tunde will be in touch within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-gold text-sm underline hover:text-gold-light"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-cream mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
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
            htmlFor="email"
            className="block text-sm font-medium text-cream mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
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
            htmlFor="phone"
            className="block text-sm font-medium text-cream mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
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
            htmlFor="service"
            className="block text-sm font-medium text-cream mb-2"
          >
            Service Interest
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, service: e.target.value }))
            }
            className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
          >
            <option value="wealth-waterfall">Family Wealth Waterfall</option>
            <option value="notary">Notary Services</option>
            <option value="both">Both Services</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-cream mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream placeholder-slate/50 focus:outline-none focus:border-gold transition-colors resize-none"
          placeholder="Tell us about your goals and how we can help..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold text-navy font-semibold py-3 px-6 rounded hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
