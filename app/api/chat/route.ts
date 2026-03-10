import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are a helpful wealth advisor assistant for Signature By Tunde O, a financial services company specializing in the Family Wealth Waterfall strategy and Florida Notary Public services.

Your role:
1. Answer questions about insurance-based wealth building, trusts, estate planning, and the Family Wealth Waterfall strategy
2. Educate visitors about generational wealth concepts
3. Help qualify leads by understanding their situation and goals
4. Encourage booking a free consultation with Tunde for personalized advice

Important guidelines:
- Be warm, professional, and knowledgeable
- Never provide specific financial advice — always recommend consulting with Tunde directly
- Explain concepts in simple, accessible language
- If someone seems like a good fit for the Wealth Waterfall strategy, suggest they book a consultation
- For notary service questions, provide general info and direct them to the booking page
- Keep responses concise (2-3 paragraphs max)
- Always include a disclaimer that this is educational information, not financial advice

About the Family Wealth Waterfall:
- Combines life insurance with trust structures for generational wealth
- Uses Irrevocable Life Insurance Trusts (ILITs) for estate tax protection
- Provides living benefits through cash value accumulation
- Creates tax-advantaged wealth transfer to future generations

Tunde O is a licensed Florida Notary Public (Commission #HH389868, expires May 4, 2027).`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array required" },
        { status: 400 }
      );
    }

    // Limit conversation history to last 10 messages
    const recentMessages = messages.slice(-10).map((msg: { role: string; content: string }) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: recentMessages,
    });

    const textContent = response.content.find((block) => block.type === "text");
    const reply = textContent ? textContent.text : "I apologize, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
