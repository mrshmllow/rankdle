import { Dialog } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";

export default function WelcomeDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-2xl rounded-md bg-ctp-mantle p-2 space-y-2">
          <Dialog.Title className="text-2xl font-bold">
            How To Play
          </Dialog.Title>

          <p>
            Guess the rank! Get atleast <strong>3</strong> out of{" "}
            <strong>6</strong> stars to keep your daily streak.
          </p>

          <ul className="list-disc list-inside">
            <li className="relative">
              One Rank Off:
              <StarIcon className="w-5 h-5 text-ctp-yellow inline-block ml-1 absolute top-1/2 -translate-y-1/2" />
            </li>
            <li className="relative">
              Correct Guess:
              <div className="inline-flex gap-1 absolute top-1/2 -translate-y-1/2 ml-1">
                {[...Array(2)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-5 h-5 text-ctp-yellow inline-block"
                  />
                ))}
              </div>
            </li>
          </ul>

          <button
            className="rounded-md py-2 px-4 w-full bg-ctp-red text-ctp-base"
            onClick={() => onClose()}
          >
            Play
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
