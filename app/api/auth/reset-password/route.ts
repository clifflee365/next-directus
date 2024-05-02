import { NextResponse } from 'next/server';
import directus from "@/lib/directus";
import { passwordRequest } from '@directus/sdk';

export async function POST(request: Request) {
  try {
    const params = await request.json()
    console.log('---params:', params);
    const { email, reset_url } = params
    const response = await directus.request(
      passwordRequest(email, reset_url)
    );
    return NextResponse.json({ message: "An email with a password reset link has been sent to your email!" }, { status: 201 });

  } catch (e: any) {
    console.log(e);
    if (e) {
      return NextResponse.json({ message: 'An error occurred, please try again!' }, { status: 500 });
    }
  }
}