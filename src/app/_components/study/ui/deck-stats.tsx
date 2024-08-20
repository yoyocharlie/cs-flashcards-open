"use client";

import React from "react";
import { Progress } from "../../ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Brain } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Badge } from "../../ui/badge";
import { useStudySessionContext } from "~/app/_context/providers/study-session-provider";

export function DeckStats() {
  const { deckStats, progress, currentIndex } = useStudySessionContext();
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="text-xl font-bold">{deckStats?.name}</CardTitle>
          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Brain size={18} fill="#ffb3b3" color="black" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {deckStats?.learnedCards && deckStats?.learnedCards > 0
                      ? `You've mastered ${deckStats?.learnedCards} of these questions`
                      : "You haven't mastered any of these questions yet"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Badge variant="outline">
              {deckStats?.learnedCards}/{deckStats?._count.cards}
            </Badge>
          </div>
        </div>
        <div className="mb-[auto_!important] mt-[0px_!important] font-medium">
          {currentIndex + 1}/{deckStats?._count.cards}
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
