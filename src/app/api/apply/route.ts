import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, consent, sessionId, track, q1, q2, q3, epti } = body;

    const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
    const secret = process.env.SHEET_SHARED_SECRET;

    if (!webhookUrl) {
      console.error('Missing NEXT_PUBLIC_GOOGLE_SHEET_URL');
      return NextResponse.json(
        { ok: false, error: '서버 설정 오류: Webhook URL이 없습니다.' },
        { status: 500 }
      );
    }

    // Forward the payload to the Google Apps Script Webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secret || '',
        name: name || '',
        phone: phone || '',
        email: email || '',
        consent: consent || '',
        referrer: 'ssudam-report (Next.js)',
        sessionId: sessionId || '',
        q0: track || '',
        q1: q1 || '',
        q2: q2 || '',
        q3: q3 || '',
        epti: epti || ''
      }),
    });

    const result = await response.json();

    if (result.ok) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json(
        { ok: false, error: result.error || '구글 시트 전송에 실패했습니다.' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('API /apply error:', error);
    return NextResponse.json(
      { ok: false, error: '내부 서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
