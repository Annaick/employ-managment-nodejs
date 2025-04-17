import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@ui/separator"



type CardProps = React.ComponentProps<typeof Card>

export function ResumeModal({ className,max, min, total, ...props }: CardProps & { total: number, max: number, min: number }) {
  return (
    <Card className={cn("w-[400px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Statistiques des salaires</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
            <div
              className="grid grid-cols-[25px_1fr] items-start"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1 flex gap-2 items-center">
                <p className="text-sm font-medium leading-none">
                  Le total des salaires :
                </p>
                <span className="text-sm text-muted-foreground">
                  {total}
                </span>
              </div>
            </div>
            <Separator className="my-4"/>
            <div
              className=" grid grid-cols-[25px_1fr] items-start "
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-600" />
              <div className="space-y-1 flex gap-2 items-center">
                <p className="text-sm font-medium leading-none">
                  Le salaire maximal
                </p>
                <p className="text-sm text-muted-foreground">
                  {max}
                </p>
              </div>
            </div>
            <Separator className="my-4"/>
            <div
              className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-amber-600" />
              <div className="space-y-1 flex gap-2 items-center">
                <p className="text-sm font-medium leading-none">
                  Le salaire minimal
                </p>
                <p className="text-sm text-muted-foreground">
                  {min}
                </p>
              </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
