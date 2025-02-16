import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"


interface Passwords{
  website:string,
  username:string,
  password:string
}

export default function YourPasswords({passwords}:{passwords:Passwords[]}) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {passwords.length === 0 && <p className="text-muted-foreground">No passwords added yet</p>}
      {passwords.map((pass) => (
        <Card key={pass.website}>
          <CardHeader>
            <Link href={pass.website} target="_blank">
            <CardTitle>{pass.website}</CardTitle>
            
            </Link>
            <CardDescription>{pass.username}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Password: {pass.password}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

