"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { useSearchParams } from "next/navigation";
import { useFlashcardForm } from "../hooks/useFlashcardForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Edit } from "lucide-react";
import { useDeckName } from "../hooks/useDeckName";

export function FlashcardForm() {
  const queryParams = useSearchParams();
  const deckId = queryParams.get("deckId");
  const {
    deck,
    deckName,
    isEditingName,
    handleNameChange,
    handleNameSubmit,
    setIsEditingName,
  } = useDeckName({ deckId: Number(deckId) });

  const { form, onSubmit, onDone } = useFlashcardForm(Number(deckId));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              {isEditingName ? (
                <>
                  <Input
                    value={deckName}
                    onChange={handleNameChange}
                    onBlur={handleNameSubmit}
                    autoFocus
                    className="text-xl"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleNameSubmit}
                    disabled={deckName.trim() === ""}
                    type="button"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span>{deck?.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                  >
                    <Edit size={16} />
                  </Button>
                </>
              )}
            </CardTitle>
            <CardDescription>
              Add your questions & answers and answers here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder='"Why?" - Socrates'
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-[200px]"
                      placeholder='"Because I said so." - A senior dev somewhere'
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    <span className="font-medium">Tip</span>: Write your answer
                    in a way that makes sense to you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-between">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Save Flashcard
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={form.formState.isSubmitting}
              onClick={onDone}
            >
              Done
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
