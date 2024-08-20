"use client";

import { Brain, CircleCheck, RotateCcw } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { useStudySessionContext } from "~/app/_context/providers/study-session-provider";
import { Skeleton } from "../../ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { useTheme } from "~/app/_context/providers/theme-provider";

export function Flashcards() {
  const { theme } = useTheme();
  const {
    currentIndex,
    currentContent,
    showAnswer,
    isLearned,
    setShowAnswer,
    onMarkAsLearned,
  } = useStudySessionContext();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>
            {showAnswer ? "Answer" : `Question ${currentIndex + 1}`}
          </CardTitle>
          <div className="flex items-center gap-3">
            <span>
              {isLearned ? (
                <CircleCheck
                  stroke={theme === "light" ? "white" : "#101411"}
                  fill="#16a34a"
                />
              ) : null}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onMarkAsLearned}
                    variant={theme === "light" ? "outline" : "secondary"}
                  >
                    <Brain size={18} fill="#ffb3b3" color="black" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  If you know this topic well, mark this card as
                  &quot;learned&quot;
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-56 overflow-y-auto">
        {currentContent ? (
          currentContent
        ) : (
          <Skeleton className="h-4 w-[250px]" />
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setShowAnswer(!showAnswer)}
          variant="ghost"
          className="ml-auto"
        >
          <RotateCcw />
        </Button>
      </CardFooter>
    </Card>
  );
}
