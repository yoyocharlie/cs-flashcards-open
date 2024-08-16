import Link from "next/link";
import { Button } from "../../ui/button";

export function Hero() {
  return (
    <section className="my-12 text-center">
      <h1 className="mb-4 text-5xl font-bold">
        Welcome to{" "}
        <span className="absolute left-0 right-0 mx-auto box-content flex w-fit select-none border bg-gradient-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text py-4 text-center font-extrabold text-transparent blur-lg">
          cs-flashcards
        </span>
        <span className="relative top-0 flex h-auto w-full select-auto items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text py-4 text-center font-extrabold text-transparent">
          cs-flashcards
        </span>
      </h1>
      <p className="mb-8 text-lg text-gray-700">
        Make learning easier and more efficient with customizable flashcards.
      </p>
      <Link href="/api/auth/signin">
        <Button className="px-6 py-3 text-lg">Get Started</Button>
      </Link>
    </section>
  );
}
