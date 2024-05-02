import Image from "next/image";
import { getServerSession } from 'next-auth';
import { getCurrentUser } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getCurrentUser()
  console.log("---home/session:", session)
  
  return (
    <main>
      <head className="p-4">
        <ul>
          {/* <li>{session.}</li> */}
        </ul>
      </head>
      <h1>Hello Next.js</h1>
      <div>
        <pre>
          {JSON.stringify(session.user, null, 2)}
        </pre>
      </div>
    </main>
  );
}
