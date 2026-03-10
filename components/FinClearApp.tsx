"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, FormEvent, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────
type Tab = "dashboard" | "transactions" | "documents" | "report" | "notes";
type ViewRole = "client" | "accountant";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  account: string;
  type: "income" | "expense";
}

interface Document {
  id: string;
  name: string;
  size: string;
  date: string;
  type: string;
}

interface Note {
  id: string;
  sender: string;
  role: "client" | "accountant";
  content: string;
  timestamp: string;
}

// ─── Demo Data ──────────────────────────────────────────
const DEMO_TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "2026-03-01", description: "Consulting Fee — Johnson Family Trust", category: "Consulting Income", amount: 4500, account: "Business Checking", type: "income" },
  { id: "t2", date: "2026-03-01", description: "Office Rent — Suite 204", category: "Rent", amount: -1800, account: "Business Checking", type: "expense" },
  { id: "t3", date: "2026-02-28", description: "Insurance Commission — MetLife", category: "Commission Income", amount: 3200, account: "Business Checking", type: "income" },
  { id: "t4", date: "2026-02-27", description: "Professional Liability Insurance", category: "Insurance", amount: -450, account: "Business Checking", type: "expense" },
  { id: "t5", date: "2026-02-26", description: "Client Lunch — Williams Estate", category: "Meals & Entertainment", amount: -85.50, account: "Business Credit Card", type: "expense" },
  { id: "t6", date: "2026-02-25", description: "Notary Commission — Real Estate Closing", category: "Notary Income", amount: 150, account: "Business Checking", type: "income" },
  { id: "t7", date: "2026-02-24", description: "Adobe Creative Cloud", category: "Software & Subscriptions", amount: -54.99, account: "Business Credit Card", type: "expense" },
  { id: "t8", date: "2026-02-22", description: "Wealth Strategy Seminar Fee", category: "Consulting Income", amount: 2000, account: "Business Checking", type: "income" },
  { id: "t9", date: "2026-02-20", description: "Phone & Internet Service", category: "Utilities", amount: -189, account: "Business Checking", type: "expense" },
  { id: "t10", date: "2026-02-18", description: "Notary Supplies — Stamps & Journal", category: "Office Supplies", amount: -67.30, account: "Business Credit Card", type: "expense" },
  { id: "t11", date: "2026-02-15", description: "Insurance Commission — Prudential", category: "Commission Income", amount: 5100, account: "Business Checking", type: "income" },
  { id: "t12", date: "2026-02-14", description: "Continuing Education Course", category: "Education", amount: -299, account: "Business Credit Card", type: "expense" },
  { id: "t13", date: "2026-02-12", description: "Gas — Client Visits", category: "Vehicle", amount: -62.40, account: "Business Credit Card", type: "expense" },
  { id: "t14", date: "2026-02-10", description: "Notary Commission — Power of Attorney", category: "Notary Income", amount: 75, account: "Business Checking", type: "income" },
  { id: "t15", date: "2026-02-08", description: "Business Cards & Flyers", category: "Marketing", amount: -185, account: "Business Credit Card", type: "expense" },
  { id: "t16", date: "2026-02-05", description: "Consulting Fee — Davis Family", category: "Consulting Income", amount: 3800, account: "Business Checking", type: "income" },
  { id: "t17", date: "2026-02-03", description: "CRM Software — Monthly", category: "Software & Subscriptions", amount: -79, account: "Business Credit Card", type: "expense" },
  { id: "t18", date: "2026-02-01", description: "Office Rent — Suite 204", category: "Rent", amount: -1800, account: "Business Checking", type: "expense" },
  { id: "t19", date: "2026-01-30", description: "Insurance Commission — New York Life", category: "Commission Income", amount: 4200, account: "Business Checking", type: "income" },
  { id: "t20", date: "2026-01-28", description: "Networking Event Registration", category: "Marketing", amount: -125, account: "Business Credit Card", type: "expense" },
  { id: "t21", date: "2026-01-25", description: "Notary Commission — Lease Signing", category: "Notary Income", amount: 100, account: "Business Checking", type: "income" },
  { id: "t22", date: "2026-01-22", description: "Office Cleaning Service", category: "Office Supplies", amount: -120, account: "Business Checking", type: "expense" },
  { id: "t23", date: "2026-01-20", description: "Consulting Fee — Martinez Trust", category: "Consulting Income", amount: 5500, account: "Business Checking", type: "income" },
  { id: "t24", date: "2026-01-15", description: "E&O Insurance Premium", category: "Insurance", amount: -380, account: "Business Checking", type: "expense" },
];

const DEMO_DOCUMENTS: Document[] = [
  { id: "d1", name: "Q4_2025_Profit_Loss.pdf", size: "245 KB", date: "2026-01-15", type: "PDF" },
  { id: "d2", name: "W-2_Form_2025.pdf", size: "120 KB", date: "2026-01-30", type: "PDF" },
  { id: "d3", name: "Business_License_FL.pdf", size: "380 KB", date: "2025-12-01", type: "PDF" },
  { id: "d4", name: "Insurance_Commission_Statements.xlsx", size: "156 KB", date: "2026-02-10", type: "Spreadsheet" },
  { id: "d5", name: "Bank_Statement_Feb2026.pdf", size: "890 KB", date: "2026-03-01", type: "PDF" },
];

const DEMO_NOTES: Note[] = [
  { id: "n1", sender: "Tunde O", role: "accountant", content: "I've reviewed your Q4 expenses. Your consulting income is trending up nicely — 15% over Q3. Let's discuss tax planning strategies in our next meeting.", timestamp: "2026-02-28T14:30:00" },
  { id: "n2", sender: "Demo Client", role: "client", content: "Thanks Tunde! I have a few new insurance commissions coming in March. Should I adjust my estimated tax payments?", timestamp: "2026-02-28T16:15:00" },
  { id: "n3", sender: "Tunde O", role: "accountant", content: "Good question. Based on your current trajectory, I'd recommend increasing your quarterly estimate by about $800. I'll upload the updated calculation sheet.", timestamp: "2026-03-01T09:00:00" },
];

// ─── Helpers ────────────────────────────────────────────
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Math.abs(amount));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ─── Main Component ─────────────────────────────────────
export default function FinClearApp() {
  const { data: session } = useSession();
  const userRole = (session?.user?.role as ViewRole) || "client";

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [viewRole, setViewRole] = useState<ViewRole>(userRole);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [documents, setDocuments] = useState<Document[]>(DEMO_DOCUMENTS);
  const [notes, setNotes] = useState<Note[]>(DEMO_NOTES);
  const [newNote, setNewNote] = useState("");
  const [reportType, setReportType] = useState("monthly-pl");
  const [reportContent, setReportContent] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

  // ─── Computed Values ──────────────────────────────────
  const totalIncome = DEMO_TRANSACTIONS.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = DEMO_TRANSACTIONS.filter((t) => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netProfit = totalIncome - totalExpenses;
  const categories = Array.from(new Set(DEMO_TRANSACTIONS.map((t) => t.category))).sort();

  const filteredTransactions = DEMO_TRANSACTIONS.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // ─── Handlers ─────────────────────────────────────────
  function handleUploadDocument() {
    const newDoc: Document = {
      id: `d${Date.now()}`,
      name: `Uploaded_Document_${new Date().toISOString().split("T")[0]}.pdf`,
      size: "0 KB",
      date: new Date().toISOString().split("T")[0],
      type: "PDF",
    };
    setDocuments((prev) => [newDoc, ...prev]);
  }

  function handleDeleteDocument(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }

  function handleSendNote(e: FormEvent) {
    e.preventDefault();
    if (!newNote.trim()) return;

    const note: Note = {
      id: `n${Date.now()}`,
      sender: session?.user?.name || "User",
      role: viewRole,
      content: newNote.trim(),
      timestamp: new Date().toISOString(),
    };
    setNotes((prev) => [...prev, note]);
    setNewNote("");
  }

  const generateReport = useCallback(async () => {
    setReportLoading(true);
    setReportContent("");

    const txData = DEMO_TRANSACTIONS.map(
      (t) => `${t.date} | ${t.description} | ${t.category} | $${t.amount.toFixed(2)} | ${t.account}`
    ).join("\n");

    try {
      const res = await fetch("/api/finclear/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportType,
          transactionData: `Date | Description | Category | Amount | Account\n${txData}`,
        }),
      });

      if (!res.ok) throw new Error("Report generation failed");

      const data = await res.json();
      setReportContent(data.report);
    } catch {
      setReportContent("Failed to generate report. Please ensure the API key is configured and try again.");
    } finally {
      setReportLoading(false);
    }
  }, [reportType]);

  // ─── Tab Navigation ───────────────────────────────────
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "&#9638;" },
    { id: "transactions", label: "Ledger", icon: "&#8644;" },
    { id: "documents", label: "Vault", icon: "&#128196;" },
    { id: "report", label: "AI Report", icon: "&#9878;" },
    { id: "notes", label: "Notes", icon: "&#128172;" },
  ];

  return (
    <div className="min-h-screen bg-navy pt-20">
      {/* FinClear Header Bar */}
      <div className="bg-navy-light border-b border-gold/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold/20 border border-gold/40 flex items-center justify-center">
              <span className="text-gold font-bold text-sm">FC</span>
            </div>
            <div>
              <span className="text-cream font-semibold text-sm">FinClear</span>
              <span className="text-slate text-xs ml-2">
                {session?.user?.name} &middot;{" "}
                <span className={viewRole === "accountant" ? "text-gold" : "text-emerald-400"}>
                  {viewRole === "accountant" ? "Accountant" : "Client"}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Toggle (only for accountant) */}
            {userRole === "accountant" && (
              <div className="flex items-center bg-navy rounded border border-gold/20 text-xs">
                <button
                  onClick={() => setViewRole("client")}
                  className={`px-3 py-1.5 rounded-l transition-colors ${
                    viewRole === "client" ? "bg-emerald-600 text-white" : "text-slate hover:text-cream"
                  }`}
                >
                  Client View
                </button>
                <button
                  onClick={() => setViewRole("accountant")}
                  className={`px-3 py-1.5 rounded-r transition-colors ${
                    viewRole === "accountant" ? "bg-gold text-navy" : "text-slate hover:text-cream"
                  }`}
                >
                  Accountant View
                </button>
              </div>
            )}

            <button
              onClick={() => signOut({ callbackUrl: "/finclear" })}
              className="text-xs text-slate hover:text-gold transition-colors border border-gold/20 rounded px-3 py-1.5"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-navy border-b border-gold/10 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-gold text-gold"
                  : "border-transparent text-slate hover:text-cream"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: tab.icon }} className="mr-1.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ═══ DASHBOARD TAB ═══ */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-cream">
              {viewRole === "accountant" ? "Accountant Dashboard" : "Financial Overview"}
            </h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-navy-light border border-gold/20 rounded-lg p-5">
                <p className="text-xs text-slate uppercase tracking-wide mb-1">Total Income</p>
                <p className="text-2xl font-bold text-emerald-400">{formatCurrency(totalIncome)}</p>
                <p className="text-xs text-slate mt-1">Last 90 days</p>
              </div>
              <div className="bg-navy-light border border-gold/20 rounded-lg p-5">
                <p className="text-xs text-slate uppercase tracking-wide mb-1">Total Expenses</p>
                <p className="text-2xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
                <p className="text-xs text-slate mt-1">Last 90 days</p>
              </div>
              <div className="bg-navy-light border border-gold/20 rounded-lg p-5">
                <p className="text-xs text-slate uppercase tracking-wide mb-1">Net Profit</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-gold" : "text-red-400"}`}>
                  {formatCurrency(netProfit)}
                </p>
                <p className="text-xs text-slate mt-1">Last 90 days</p>
              </div>
              <div className="bg-navy-light border border-gold/20 rounded-lg p-5">
                <p className="text-xs text-slate uppercase tracking-wide mb-1">Transactions</p>
                <p className="text-2xl font-bold text-cream">{DEMO_TRANSACTIONS.length}</p>
                <p className="text-xs text-slate mt-1">Total entries</p>
              </div>
            </div>

            {/* Income Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-navy-light border border-gold/20 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-cream mb-4">Income by Category</h3>
                {Object.entries(
                  DEMO_TRANSACTIONS.filter((t) => t.type === "income").reduce<Record<string, number>>(
                    (acc, t) => {
                      acc[t.category] = (acc[t.category] || 0) + t.amount;
                      return acc;
                    },
                    {}
                  )
                )
                  .sort(([, a], [, b]) => b - a)
                  .map(([cat, amount]) => (
                    <div key={cat} className="flex items-center justify-between py-2 border-b border-gold/5 last:border-0">
                      <span className="text-xs text-slate">{cat}</span>
                      <span className="text-sm font-medium text-emerald-400">{formatCurrency(amount)}</span>
                    </div>
                  ))}
              </div>

              <div className="bg-navy-light border border-gold/20 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-cream mb-4">Top Expenses</h3>
                {Object.entries(
                  DEMO_TRANSACTIONS.filter((t) => t.type === "expense").reduce<Record<string, number>>(
                    (acc, t) => {
                      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
                      return acc;
                    },
                    {}
                  )
                )
                  .sort(([, a], [, b]) => b - a)
                  .map(([cat, amount]) => (
                    <div key={cat} className="flex items-center justify-between py-2 border-b border-gold/5 last:border-0">
                      <span className="text-xs text-slate">{cat}</span>
                      <span className="text-sm font-medium text-red-400">{formatCurrency(amount)}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Transactions Preview */}
            <div className="bg-navy-light border border-gold/20 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-cream">Recent Transactions</h3>
                <button
                  onClick={() => setActiveTab("transactions")}
                  className="text-xs text-gold hover:text-gold-light transition-colors"
                >
                  View All &rarr;
                </button>
              </div>
              <div className="space-y-2">
                {DEMO_TRANSACTIONS.slice(0, 5).map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-gold/5 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cream truncate">{t.description}</p>
                      <p className="text-xs text-slate">{formatDate(t.date)} &middot; {t.category}</p>
                    </div>
                    <span className={`text-sm font-medium ml-4 ${t.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {t.amount > 0 ? "+" : "-"}{formatCurrency(t.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accountant-only section */}
            {viewRole === "accountant" && (
              <div className="bg-navy-light border border-gold/30 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-gold mb-3">Accountant Notes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-cream">1</p>
                    <p className="text-xs text-slate">Active Clients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-cream">{documents.length}</p>
                    <p className="text-xs text-slate">Documents on File</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-cream">{notes.length}</p>
                    <p className="text-xs text-slate">Notes Exchanged</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ TRANSACTIONS TAB ═══ */}
        {activeTab === "transactions" && (
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-cream">Transaction Ledger</h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-navy-light border border-gold/30 rounded px-4 py-2 text-sm text-cream placeholder-slate/50 focus:outline-none focus:border-gold"
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-navy-light border border-gold/30 rounded px-4 py-2 text-sm text-cream focus:outline-none focus:border-gold"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Transaction Table */}
            <div className="bg-navy-light border border-gold/20 rounded-lg overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate uppercase tracking-wide">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate uppercase tracking-wide">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate uppercase tracking-wide">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate uppercase tracking-wide">Account</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate uppercase tracking-wide">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="border-b border-gold/5 hover:bg-navy-lighter/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate whitespace-nowrap">{formatDate(t.date)}</td>
                      <td className="px-4 py-3 text-sm text-cream">{t.description}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-navy rounded-full px-2 py-1 text-slate border border-gold/10">
                          {t.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate">{t.account}</td>
                      <td className={`px-4 py-3 text-sm font-medium text-right whitespace-nowrap ${t.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {t.amount > 0 ? "+" : ""}{formatCurrency(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-slate text-sm">No transactions match your filters.</div>
              )}
            </div>

            <p className="text-xs text-slate text-right">
              Showing {filteredTransactions.length} of {DEMO_TRANSACTIONS.length} transactions
            </p>
          </div>
        )}

        {/* ═══ DOCUMENTS TAB ═══ */}
        {activeTab === "documents" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold text-cream">Document Vault</h2>
              <button
                onClick={handleUploadDocument}
                className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded hover:bg-gold-light transition-colors"
              >
                + Upload Document
              </button>
            </div>

            {/* Upload Area */}
            <div
              onClick={handleUploadDocument}
              className="border-2 border-dashed border-gold/30 rounded-lg p-8 text-center cursor-pointer hover:border-gold/50 transition-colors"
            >
              <div className="text-gold text-3xl mb-2">&#8682;</div>
              <p className="text-sm text-cream mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-slate">PDF, XLSX, CSV, JPG, PNG (max 10MB)</p>
            </div>

            {/* Document List */}
            <div className="bg-navy-light border border-gold/20 rounded-lg overflow-hidden">
              {documents.length === 0 ? (
                <div className="text-center py-8 text-slate text-sm">No documents uploaded yet.</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gold/20">
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate uppercase tracking-wide">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate uppercase tracking-wide hidden sm:table-cell">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate uppercase tracking-wide hidden sm:table-cell">Size</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate uppercase tracking-wide">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-gold/5 hover:bg-navy-lighter/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-gold text-sm">&#128196;</span>
                            <span className="text-sm text-cream truncate max-w-[200px]">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate hidden sm:table-cell">{doc.type}</td>
                        <td className="px-4 py-3 text-xs text-slate hidden sm:table-cell">{doc.size}</td>
                        <td className="px-4 py-3 text-xs text-slate">{formatDate(doc.date)}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {viewRole === "accountant" && (
              <div className="bg-navy-light border border-gold/30 rounded-lg p-4">
                <p className="text-xs text-gold mb-1">Accountant Note</p>
                <p className="text-xs text-slate">
                  All uploaded documents are shared between client and accountant.
                  Google Drive sync available in a future update.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ═══ AI REPORT TAB ═══ */}
        {activeTab === "report" && (
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-cream">AI Financial Report</h2>

            <div className="bg-navy-light border border-gold/20 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="flex-1 bg-navy border border-gold/30 rounded px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold"
                >
                  <option value="monthly-pl">Monthly Profit &amp; Loss</option>
                  <option value="tax-deductions">Tax Deductions Analysis</option>
                  <option value="cash-flow">Cash Flow Forecast</option>
                  <option value="health-score">Business Health Score</option>
                </select>
                <button
                  onClick={generateReport}
                  disabled={reportLoading}
                  className="bg-gold text-navy font-semibold px-6 py-2.5 rounded hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                >
                  {reportLoading ? "Generating..." : "Generate Report"}
                </button>
              </div>

              {reportLoading && (
                <div className="flex items-center gap-3 py-8 justify-center">
                  <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-slate">
                    Analyzing {DEMO_TRANSACTIONS.length} transactions with FinClear AI...
                  </span>
                </div>
              )}

              {reportContent && !reportLoading && (
                <div className="border-t border-gold/20 pt-6">
                  <div className="prose prose-sm max-w-none">
                    {reportContent.split("\n").map((line, i) => {
                      if (line.startsWith("## ")) {
                        return <h2 key={i} className="text-lg font-semibold text-gold mt-6 mb-3 first:mt-0">{line.replace("## ", "")}</h2>;
                      }
                      if (line.startsWith("### ")) {
                        return <h3 key={i} className="text-base font-semibold text-cream mt-4 mb-2">{line.replace("### ", "")}</h3>;
                      }
                      if (line.startsWith("# ")) {
                        return <h1 key={i} className="text-xl font-bold text-gold mt-6 mb-4 first:mt-0">{line.replace("# ", "")}</h1>;
                      }
                      if (line.startsWith("- ") || line.startsWith("* ")) {
                        return <li key={i} className="text-sm text-cream/90 ml-4 list-disc mb-1">{renderBold(line.slice(2))}</li>;
                      }
                      if (line.startsWith("|")) {
                        return <p key={i} className="text-xs text-slate font-mono">{line}</p>;
                      }
                      if (line.trim() === "") {
                        return <div key={i} className="h-2" />;
                      }
                      return <p key={i} className="text-sm text-cream/80 mb-2 leading-relaxed">{renderBold(line)}</p>;
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gold/10">
                    <p className="text-xs text-slate/60 italic">
                      This report was generated by FinClear AI and should be reviewed by a qualified accountant.
                      Not financial advice.
                    </p>
                  </div>
                </div>
              )}

              {!reportContent && !reportLoading && (
                <div className="text-center py-8">
                  <div className="text-gold text-3xl mb-3">&#9878;</div>
                  <p className="text-sm text-cream mb-1">Choose a report type and click Generate</p>
                  <p className="text-xs text-slate">
                    FinClear AI will analyze your {DEMO_TRANSACTIONS.length} transactions and produce a detailed report.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ NOTES TAB ═══ */}
        {activeTab === "notes" && (
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-cream">Collaboration Notes</h2>
            <p className="text-xs text-slate">Secure messaging between client and accountant</p>

            {/* Notes Thread */}
            <div className="bg-navy-light border border-gold/20 rounded-lg p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`flex ${note.role === viewRole ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    note.role === viewRole
                      ? "bg-gold/10 border border-gold/30"
                      : "bg-navy border border-gold/10"
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-cream">{note.sender}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        note.role === "accountant"
                          ? "bg-gold/20 text-gold"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}>
                        {note.role === "accountant" ? "Accountant" : "Client"}
                      </span>
                      <span className="text-[10px] text-slate">
                        {new Date(note.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-cream/90 leading-relaxed">{note.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Send Note */}
            <form onSubmit={handleSendNote} className="flex gap-3">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder={`Send as ${viewRole === "accountant" ? "Accountant" : "Client"}...`}
                className="flex-1 bg-navy-light border border-gold/30 rounded px-4 py-3 text-sm text-cream placeholder-slate/50 focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="bg-gold text-navy font-semibold px-6 py-3 rounded hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple bold text renderer for markdown **text**
function renderBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-cream">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
