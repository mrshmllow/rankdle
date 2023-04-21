export default function GameEndDialog({ stars }: { stars: number }) {
  return (
    <>
      <h1 className="text-2xl font-bold">Stats</h1>

      <p>Come back tomorrow!</p>

      <p>{stars} stars!</p>
    </>
  );
}
