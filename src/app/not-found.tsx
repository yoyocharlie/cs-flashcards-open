import Link from "next/link";
import { Button } from "./_components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="mt-4 text-center text-xl">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/">
        <Button variant="link">Go back home</Button>
      </Link>
    </div>
  );
}
