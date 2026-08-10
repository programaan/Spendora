import { Card, CardContent } from "@/components/ui/card";

function StatsCard({
  title,
  amount,
  icon: Icon,
  color,
  isCurrency = true,
}) {
  return (

    <Card
      className="
        rounded-3xl
        border
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <CardContent className="flex items-center justify-between gap-4 p-5">

        <div className="min-w-0 space-y-1.5">

          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap md:text-[28px]">

            {isCurrency
              ? `₹${Number(amount || 0).toLocaleString()}`
              : Number(amount || 0).toLocaleString()}

          </h2>

        </div>

        <div
          className={`
            ${color}
            flex
            h-12
            w-12
            md:h-14
            md:w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
          `}
        >
          <Icon
            size={22}
            strokeWidth={2}
          />
        </div>

      </CardContent>

    </Card>
    
  );

}

export default StatsCard;