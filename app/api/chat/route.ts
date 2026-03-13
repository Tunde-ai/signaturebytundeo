import { NextRequest, NextResponse } from "next/server";

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

Notary pricing:
- Standard notarization: $10 per signature (in-office, Fort Lauderdale)
- Mobile notary: $25 travel fee + $10 per signature (Broward & Miami-Dade)
- Loan signing: $150 per package (includes mobile)
- Remote Online Notarization (RON): $10 per signature (fully digital via video call)

Tunde O is a licensed Florida Life & Variable Contracts Insurance Agent (License #G307436) and commissioned Florida Notary Public (Commission #HH389868, expires May 4, 2027).

Contact info:
- Phone: (786) 591-1354
- Email: signhere@signaturebytundeo.com
- Location: Fort Lauderdale, Florida
- Website: signaturebytundeo.com

Notary services are available in-person, mobile, or via Remote Online Notarization (RON).`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array required" },
        { status: 400 }
      );
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN!;
    const model = "@cf/meta/llama-3.1-8b-instruct";

    // Build message array with system prompt + recent history
    const recentMessages = messages.slice(-10).map((msg: ChatMessage) => ({
      role: msg.role,
      content: msg.content,
    }));

    const cfMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...recentMessages,
    ];

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: cfMessages,
          max_tokens: 400,
          temperature: 0.7,
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      console.error("Cloudflare AI error:", data.errors);
      throw new Error(
        data.errors?.[0]?.message || "Cloudflare AI request failed"
      );
    }

    const reply =
      data.result?.response ||
      "I'm sorry, I couldn't process that. Please try again or call us at (786) 591-1354.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "I'm having trouble right now. Please call us at (786) 591-1354 or email signhere@signaturebytundeo.com for immediate help!",
      },
      { status: 200 }
    );
  }
}
