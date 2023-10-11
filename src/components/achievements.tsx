import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "./ui/progress";
import { Trophy } from "lucide-react";
import { Mission } from "@prisma/client";

interface AchievementsProps {
  missions: Mission[];
}
export default function Achievements({ missions }: AchievementsProps) {
  return (
    <Card className="pt-6">
      {missions.map((mission) => {
        const isCompleted = mission.progress >= mission.limit;
        return (
          <CardContent className="flex gap-8 items-center" key={mission.id}>
            <div className="flex flex-col border p-4 rounded-xl items-center gap-2">
              <Trophy size={40} />
              <div className="whitespace-nowrap">Nível {mission.level}</div>
            </div>
            <div className="flex flex-col w-full gap-4">
              <div className="flex justify-between ">
                <div>{mission.name}</div>
                {!isCompleted && (
                  <div>
                    {mission.progress}/{mission.limit}
                  </div>
                )}
              </div>
              <div>{mission.description}</div>
              {!isCompleted && (
                <Progress value={mission.progress} max={mission.limit} />
              )}
            </div>
          </CardContent>
        );
      })}
    </Card>
  );
}
