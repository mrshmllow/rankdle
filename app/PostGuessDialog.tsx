import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { getImageData } from "@/lib/icons";
import { Rank } from "@/lib/types";
import { calculateStars } from "@/lib/stars";
import pluralize from "pluralize";
import { Fragment, Suspense, useMemo } from "react";
import GuessDistribution from "./GuessDistribution";

export default function PostGuessDialog({
  guess,
  clip_id,
  tracker_id,
  isOpen,
  onClose,
  answer,
}: {
  guess: Rank;
  isOpen: boolean;
  clip_id: number;
  onClose: () => void;
  answer: Rank;
  tracker_id: string;
}) {
  const gainedStars = useMemo(
    () => calculateStars(guess, answer),
    [guess, answer]
  );

  return (
    <Transition show={isOpen} appear as={Fragment}>
      <Dialog open={isOpen} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-2xl rounded-md bg-ctp-mantle p-2 space-y-2">
              <Dialog.Title className="text-2xl font-bold">Result</Dialog.Title>

              <div className="grid grid-flow-col gap-2">
                <div>
                  <p className="text-center font-semibold">Your Guess</p>
                  <Image
                    src={getImageData(guess)}
                    alt={Rank[guess].toString()}
                    placeholder="blur"
                    width={70}
                    height={70}
                    className="mx-auto"
                  />
                </div>

                <div>
                  <p className="text-center font-semibold">Answer</p>
                  <Image
                    src={getImageData(answer)}
                    alt={Rank[answer].toString()}
                    placeholder="blur"
                    width={70}
                    height={70}
                    className="mx-auto"
                  />
                </div>
              </div>

              <p className="text-center">
                {gainedStars === 0 ? (
                  <>You got no stars</>
                ) : (
                  <>
                    You gained{" "}
                    <strong>
                      {gainedStars} {pluralize("star", gainedStars)}
                    </strong>
                  </>
                )}
              </p>

              <Suspense
                fallback={
                  <div className="h-60 w-full bg-ctp-crust animate-pulse" />
                }
              >
                <GuessDistribution clip_id={clip_id} />
              </Suspense>

              <a
                href={`https://tracker.gg/valorant/match/${tracker_id}`}
                target="_blank"
                className="rounded-md py-2 px-4 w-full transition-colors bg-ctp-surface0 text-ctp-text block text-center"
              >
                View Match on Tracker.gg
              </a>

              <button
                className={
                  "rounded-md py-2 px-4 w-full transition-colors bg-ctp-red text-ctp-base"
                }
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                Next
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
