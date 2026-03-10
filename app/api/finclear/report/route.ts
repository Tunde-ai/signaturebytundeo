import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const FINCLEAR_SYSTEM_PROMPT = `You are FinClear AI, a professional financial analyst assistant built into the FinClear client-accountant portal by Signature By Tunde O.

Your role:
1. Analyze financial transaction data provided to you
2. Generate clear, professional financial reports
3. Identify trends, concerns, and opportunities
4. Provide actionable recommendations

Report formatting:
- Use clear section headers with ## markdown
- Include summary tables where helpful
- Bold key numbers and findings
- Keep language professional but accessible
- End with 2-3 actionable recommendations

Important:
- This is a financial analysis tool, NOT a wealth advisor
- Base analysis strictly on the data provided
- Flag any concerning patterns (unusual expenses, declining income, etc.)
- Always note that this is AI-generated analysis and should be reviewed by an accountant`;

export async function POST(request: NextRequest) {
  try {
    const { reportType, transactionData } = await request.json();

    if (!reportType || !transactionData) {
      return NextResponse.json(
        { error: "Report type and transaction data required" },
        { status: 400 }
      );
    }

    const reportPrompts: Record<string, string> = {
      "monthly-pl": `Analyze the following transaction data and produce a Monthly Profit & Loss report.

Include:
1. **Revenue Summary** — Total income grouped by category
2. **Expense Breakdown** — Expenses grouped by category with totals
3. **Net Income** — Revenue minus expenses
4. **Key Observations** — Notable trends, unusual expenses, or areas of concern
5. **Recommendations** — 2-3 actionable suggestions`,

      "tax-deductions": `Analyze the following transaction data and identify potential tax deductions.

Include:
1. **Deduction Summary** — Each potentially deductible item with: Description, Amount, Category, Confidence (HIGH/MEDIUM/LOW)
2. **Deduction Categories** — Group by tax category (Business Expenses, Home Office, Vehicle, etc.)
3. **Total Estimated Deductions** — Sum by confidence level
4. **Documentation Needed** — What receipts or records to gather
5. **Estimated Tax Savings** — At a 25% effective rate`,

      "cash-flow": `Analyze the following transaction data and produce a Cash Flow Forecast.

Include:
1. **Recurring Income** — Identified regular income sources and amounts
2. **Recurring Expenses** — Identified regular expenses and amounts
3. **30-Day Projection** — Expected cash position
4. **60-Day Projection** — Expected cash position
5. **90-Day Projection** — Expected cash position
6. **Risk Factors** — Potential threats to cash flow
7. **Opportunities** — Areas to improve cash flow`,

      "health-score": `Analyze the following transaction data and produce a Business Health Score.

Score each dimension from 0-100:
1. **Income Stability** — Consistency of income streams
2. **Expense Management** — How well expenses are controlled
3. **Savings Rate** — Percentage of income retained
4. **Cash Flow Health** — Balance of inflows vs outflows

Then provide:
- **Overall Score** (0-100) and **Letter Grade** (A+ through F)
- **Strengths** — Top 2-3 financial strengths
- **Areas for Improvement** — Top 2-3 areas needing attention
- **Action Plan** — Steps to improve weakest areas`,
    };

    const userPrompt = `${reportPrompts[reportType] || reportPrompts["monthly-pl"]}

## Transaction Data
${transactionData}`;

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: FINCLEAR_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textContent = response.content.find((block) => block.type === "text");
    const report = textContent
      ? textContent.text
      : "Unable to generate report. Please try again.";

    return NextResponse.json({ report });
  } catch (error) {
    console.error("FinClear report API error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
