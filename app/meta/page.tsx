import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function Meta() {
  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2 pb-4">
      <h1 className="text-xl font-semibold">About</h1>

      <p>
        Created by{" "}
        <strong>
          <a href="https://github.com/mrshmllow">marshmallow</a>
        </strong>
      </p>

      <div className="grid grid-flow-col gap-2">
        <a
          className="rounded-md bg-ctp-red text-ctp-base py-2 px-4 inline-flex items-center gap-2 justify-center font-bold"
          href="https://github.com/sponsors/mrshmllow"
        >
          Donate
          <HeartIcon className="h-5 w-5" />
        </a>

        <a
          className="rounded-md bg-ctp-surface0 py-2 px-4 inline-flex items-center gap-2 justify-center"
          href="https://github.com/mrshmllow/rankdle"
        >
          View Source
          <CodeBracketIcon className="h-5 w-5" />
        </a>
      </div>
    </main>
  );
}
