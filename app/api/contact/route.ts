import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Portfolio Contact Form',
          email: 'sangammehta44@gmail.com', // Your verified sender email in Brevo
        },
        to: [
          {
            email: 'sangammehta44@gmail.com',
            name: 'Sangam Mehta',
          },
        ],
        subject: `Portfolio Contact: ${subject}`,
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        replyTo: {
          email: email,
          name: name,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
