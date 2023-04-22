export default function ClipRules() {
  return (
    <>
      <h1 className="text-xl font-semibold">Submit Your Clip</h1>

      <p>Clips are manually reviewed and randomly selected every day.</p>
      <p>
        Clips may be re-uploaded to our youtube channel to maintain the
        integrity of this site.
      </p>

      <p className="font-bold">Clips must:</p>

      <ul className="list-disc list-inside">
        <li>Be Yours</li>
        <li>Be in ranked</li>
        <li>Be on tracker.gg</li>
        <li>Be within the past 30 days</li>
        <li>Not contain overlays showing your rank</li>
        <li>Not contain episode rank buddies</li>
      </ul>
    </>
  );
}
