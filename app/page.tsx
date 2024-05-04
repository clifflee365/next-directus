import Image from "next/image"
import { getCurrentUser } from "./api/auth/[...nextauth]/options"
import SignOut from "@/components/SignOut"
import Link from "next/link"

export default async function Home() {
  const session = await getCurrentUser()
  console.log("---home/session:", session)
  // const session:any = null

  if (!session) {
    return (
      <div>
        <h1>Please login in</h1>
        <Link href="/login">Login</Link>
      </div>
    )
  }

  return (
    <main>
      <div className="p-4">
        <SignOut />
      </div>
      <h1>Hello Next.js</h1>
      {session && <pre>{JSON.stringify(session.user, null, 2)}</pre>}
    </main>
  )
}
