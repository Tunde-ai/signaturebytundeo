import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, service, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const serviceLabels: Record<string, string> = {
      "wealth-waterfall": "Family Wealth Waterfall",
      notary: "Notary Services",
      both: "Both Services",
      other: "Other",
    };

    const contactEmail = process.env.CONTACT_EMAIL || "signhere@signaturebytundeo.com";

    await resend.emails.send({
      from: "Signature By Tunde O <noreply@signaturebytundeo.com>",
      to: contactEmail,
      replyTo: email,
      subject: `New Inquiry: ${serviceLabels[service] || service} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B1221; color: #F5F0E8; padding: 32px; border-radius: 8px;">
          <div style="border-bottom: 2px solid #C9A84C; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #C9A84C; font-size: 24px; margin: 0;">New Contact Inquiry</h1>
            <p style="color: #94A3B8; font-size: 14px; margin: 8px 0 0;">signaturebytundeo.com</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #C9A84C; font-weight: bold; width: 120px; vertical-align: top;">Name:</td>
              <td style="padding: 8px 0; color: #F5F0E8;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #C9A84C; font-weight: bold; vertical-align: top;">Email:</td>
              <td style="padding: 8px 0; color: #F5F0E8;"><a href="mailto:${email}" style="color: #E0C872;">${email}</a></td>
            </tr>
            ${
              phone
                ? `<tr>
              <td style="padding: 8px 0; color: #C9A84C; font-weight: bold; vertical-align: top;">Phone:</td>
              <td style="padding: 8px 0; color: #F5F0E8;">${phone}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 8px 0; color: #C9A84C; font-weight: bold; vertical-align: top;">Service:</td>
              <td style="padding: 8px 0; color: #F5F0E8;">${serviceLabels[service] || service}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #132036; border-radius: 8px; border: 1px solid #C9A84C33;">
            <p style="color: #C9A84C; font-weight: bold; margin: 0 0 8px;">Message:</p>
            <p style="color: #F5F0E8; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
