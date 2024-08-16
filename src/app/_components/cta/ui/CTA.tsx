import Link from "next/link";
import { Button } from "../../ui/button";

export function CTA() {
  return (
    <section className="my-12 text-center">
      <h2 className="mb-4 text-4xl font-bold">Ready to start learning?</h2>
      <Link href="/api/auth/signin">
        <Button variant={"outline"} className="px-6 py-3 text-lg">
          Join Now
        </Button>
      </Link>
    </section>
  );
}
