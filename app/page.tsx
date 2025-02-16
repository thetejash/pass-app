import AddCard from "@/components/AddCard"
import AddPass from "@/components/AddPass"
import YourCards from "@/components/YourCards"
import YourPasswords from "@/components/YourPasswords"
import { Metadata } from "next"
import { clerkClient } from "@clerk/nextjs/server"
import { currentUser } from "@clerk/nextjs/server"
export const metadata: Metadata= {
  title: 'Pass-app - Home',
  description: 'Homepage',
}



export default  async function Home() {
  const user = await currentUser()
  console.log(user?.privateMetadata) 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h1 className="text-2xl font-bold mb-4 text-card-foreground">Add a Credit Card</h1>
          <AddCard />
          <h1 className="text-2xl font-bold mb-4 mt-8 text-card-foreground">Your Credit Cards</h1>
          <YourCards cards ={Array.isArray(user?.privateMetadata.cards)?user?.privateMetadata.cards:[]} />
        </section>
        <section className="space-y-4">
          <h1 className="text-2xl font-bold mb-4 text-card-foreground">Add a Password</h1>
          <AddPass />
          <h1 className="text-2xl font-bold mb-4 mt-8 text-card-foreground">Your Passwords</h1>
          <YourPasswords passwords = {Array.isArray(user?.privateMetadata.passwords)?user?.privateMetadata.passwords:[]}/>
        </section>
      </div>
    </div>
  )
}

