"use client"
import { useSession } from "next-auth/react"
import React from "react"

const Profile = () => {
  const { data: session } = useSession()
  console.log("---client session:", session)
  return (
    <div>{session && <pre>{JSON.stringify(session.user, null, 2)}</pre>}</div>
  )
}

export default Profile
