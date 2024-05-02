import directus from "@/lib/directus"
import { passwordReset } from "@directus/sdk"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const params = await request.json()
    const { reset_token, newPassword } = params
    const response = await directus.request(passwordReset(reset_token, newPassword))

    return NextResponse.json({
      message: 'Reset password successful!',
    }, {
      status: 201
    })
  } catch (error) {
    console.log(error)
    if (error) {
      return NextResponse.json({ message: 'Reset password failed, please try again!' }, { status: 500 });
    }
  }
}