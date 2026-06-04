import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, name, email, phone, budget, interest, message } = body;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: false, error: 'Email service not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: 'BridgeSpark Enquiry <noreply@bridgespark.in>',
      to: ['monica@bridgespark.in'],
      replyTo: email,
      subject: `New Ad Enquiry: ${company} — ${interest}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #c0392b; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">BridgeSpark — New Advertising Enquiry</h1>
          </div>

          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 35%;">Company / Brand</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Contact Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #c0392b;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Monthly Budget</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${budget}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Interest</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${interest}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #222;">${message || 'No message provided'}</td>
              </tr>
            </table>
          </div>

          <div style="background: #1a1a2e; padding: 16px; text-align: center;">
            <p style="color: #aaa; font-size: 12px; margin: 0;">
              This enquiry was submitted via <strong style="color: white;">bridgespark.in</strong> · Reply directly to this email to respond to the enquirer.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
