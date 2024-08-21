"use client";

import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Brain, CircleCheck, RotateCcw } from "lucide-react";
import { useTheme } from "~/app/_context/providers/theme-provider";
import { useCardMotion } from "../hooks/useCardMotion";
import { useEffect, useState } from "react";

export function Cards() {
  const { theme } = useTheme();
  const [test, setTest] = useState("light");

  useEffect(() => setTest(theme), [theme]);
  const {
    x,
    y,
    rotateX,
    rotateY,
    showCheck,
    setShowCheck,
    showAnswer,
    setShowAnswer,
    cardContent,
    handleMouseMove,
  } = useCardMotion();

  return (
    <div
      className="w-full items-center justify-center"
      style={{ perspective: 2000 }}
    >
      <motion.div
        style={{ x, y, rotateX, rotateY, z: 100 }}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <div className="relative m-auto h-[185px] w-[285px] rounded-xl border bg-card p-4 shadow-lg lg:w-[285px] xl:w-[385px]">
          <div className="absolute inset-0">
            <motion.div
              className="absolute left-10 top-14 z-[99] h-[185px] w-[285px] space-y-2 rounded-xl border bg-card p-4 shadow-lg xl:w-[385px]"
              style={{ x, y, rotateX, rotateY, z: 100000, scale: 1.05 }}
            >
              <div className="flex justify-between">
                <h4 className="z-[10] m-0 font-semibold">
                  {showAnswer
                    ? cardContent.answer.title
                    : cardContent.question.title}
                </h4>
                <div className="flex items-center gap-2">
                  {showCheck && (
                    <CircleCheck
                      stroke={test === "light" ? "white" : "#101411"}
                      fill="#16a34a"
                    />
                  )}

                  <Button
                    onClick={() => setShowCheck(!showCheck)}
                    size="sm"
                    variant={test === "light" ? "outline" : "secondary"}
                  >
                    <Brain size={18} fill="#ffb3b3" color="black" />
                  </Button>
                </div>
              </div>
              <div className="flex h-28 flex-col">
                <p className="grow text-sm">
                  {showAnswer
                    ? cardContent.answer.text
                    : cardContent.question.text}
                </p>
                <Button
                  onClick={() => setShowAnswer(!showAnswer)}
                  size="sm"
                  variant="ghost"
                  className="ml-auto"
                >
                  <RotateCcw size="20" />
                </Button>
              </div>
            </motion.div>
          </div>
          <h4 className="z-[10] m-0 font-semibold">Question 1</h4>
          <p className="text-sm">
            What is the worst-case time complexity of quicksort?
          </p>
        </div>
      </motion.div>
    </div>
  );
}
