import { FlashcardForm } from "./flashcard-form";
import { Flashcards } from "./flashcards";

export function FlashcardList() {
  return (
    <section className="space-y-3 px-3 py-5 md:container">
      <FlashcardForm />
      <Flashcards />
    </section>
  );
}
