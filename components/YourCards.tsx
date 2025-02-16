import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


interface CardProps{
  cardNo: string, 
  expiry: string, 
  cvv:number
}

export default function YourCards({cards}:{cards:CardProps[]}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.length === 0 && <p className="text-muted-foreground">No cards added yet</p>}
      {cards.map((card:CardProps) => (
        <Card key={card.cardNo}>
          <CardHeader>
            <CardTitle> {card.cardNo}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Expires: {card.expiry}</p>
            <p className="text-sm text-muted-foreground">Cvv: {card.cvv}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

