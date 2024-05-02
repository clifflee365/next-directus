import Image from "next/image";
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();

  if(session){
    console.log('---session:', session);
  }
  return (
    <main>
      <h1>Hello Next.js</h1>
    </main>
  );
}
