import Link from "next/link";

export default function CompletedSubmit() {
  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2">
      <p>
        Done! Your clip will be reviewed and if it meets the rules, accepted.
      </p>

      <div className="grid grid-flow-col gap-2">
        <Link
          href="/"
          className="rounded-md bg-ctp-blue py-2 px-4 text-ctp-base text-center"
        >
          Play Rankdle
        </Link>

        <Link
          href="/submit"
          className="rounded-md bg-ctp-surface0 py-2 px-4 text-center"
        >
          Submit Another Clip
        </Link>
      </div>
    </main>
  );
}
