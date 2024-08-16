import { TableCell, TableRow } from "../../ui/table";

import { Loader2, MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import type { Card } from "~/types";
import { useFlashcard } from "../hooks/useFlashcard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

type FlashcardProps = {
  flashcard: Card;
  rowNumber: number;
};

export function Flashcard({ flashcard, rowNumber }: FlashcardProps) {
  const { onDelete, pendingDelete } = useFlashcard();
  return (
    <TableRow
      key={flashcard.id}
      className={`${pendingDelete ? "opacity-50" : ""}`}
    >
      <TableCell className="font-medium">{rowNumber}</TableCell>
      <TableCell>{flashcard.question}</TableCell>
      <TableCell>{flashcard.answer}</TableCell>
      <TableCell align="right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
              disabled={pendingDelete}
            >
              {pendingDelete ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onDelete(flashcard.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
