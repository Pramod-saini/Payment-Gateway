
import { NextResponse } from 'next/server';

export async function POST() {
  const random = Math.random();

  if (random < 0.15) {
    await new Promise((r) => setTimeout(r, 8000));

    return NextResponse.json({
      status: 'timeout',
    });
  }

  if (random < 0.40) {
    return NextResponse.json({
      status: 'failed',
      reason: 'Insufficient funds',
    });
  }

  return NextResponse.json({
    status: 'success',
  });
}
