import { Dialog } from "@headlessui/react";

export default function GameEndDialog({
	stars,
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	stars: number;
	onClose: () => void;
}) {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className="fixed inset-0 bg-black/80" aria-hidden="true" />

			<div className="fixed inset-0 flex items-center justify-center">
				<Dialog.Panel className="w-full max-w-2xl rounded-md bg-ctp-mantle p-2 space-y-2">
					<Dialog.Title className="text-2xl font-bold">Stats</Dialog.Title>

					<p>{stars} stars!</p>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
}
