import { useMotionValue, useTransform } from "framer-motion";
import { useState, useCallback } from "react";

export function useCardMotion() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 500], [-30, 30]);

  const [showCheck, setShowCheck] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardContent, setCardContent] = useState({
    question: {
      title: "Question 2",
      text: "What is the purpose of a hash function in a hash table?",
    },
    answer: {
      title: "Answer",
      text: "To map keys to specific indices in a hash table.",
    },
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cardX = e.clientX - rect.left - rect.width / 2;
      const cardY = e.clientY - rect.top - rect.height / 2;

      x.set(cardX / 10);
      y.set(cardY / 10);
    },
    [x, y],
  );

  return {
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
  };
}
