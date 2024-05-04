import { createUser } from '@directus/sdk';
import directus from "@/lib/directus"
import { NextResponse } from 'next/server';

export async function POST(request: Request){
  try {
    const params = {}
    const result = await directus.request(
      createUser({
        ...params,
        role: process.env.USER_ROLE
      })
    );
    return NextResponse.json({ message: "User Created!"}, {
      status: 201
    })
  } catch (e: any) {
    console.log(e)
    const code = e.errors[0].extensions.code
    if (code === 'RECORD_NOT_UNIQUE') {
      return NextResponse.json({ message: "This user already exist" }, { status: 409 });
    }

    return NextResponse.json({ message: "An unexpected error occurred, please try again" }, { status: 500 });
  }
}