import { Rank } from "@/lib/types"
import { cx } from "cva"
import { useMemo } from "react"

export default function NextButton({ selectedRank, loading, showPost, onClick }: {
	selectedRank: Rank | null,
	onClick: () => void,
	loading: boolean,
	showPost: boolean
}) {
	const capRank = useMemo(() => selectedRank === null ? null : Rank[selectedRank].toString().charAt(0).toUpperCase() + Rank[selectedRank]?.toString().slice(1), [selectedRank])
	return <button
		className={cx([
			'rounded-md py-2 px-4 w-full transition-colors',
			selectedRank === null || loading ? 'bg-ctp-crust' : 'bg-ctp-red text-ctp-base',
			loading ? "animate-pulse" : null
		])}
		disabled={selectedRank === null || showPost}
		onClick={onClick}
	>
		Guess {capRank}
	</button>
}
