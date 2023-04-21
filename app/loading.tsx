export default function Loading() {
  return (
    <main className="grid gap-2 max-w-2xl mx-auto px-2">
      <h1 className="text-xl font-semibold">Clip</h1>

      <div className="w-full h-7 bg-ctp-crust rounded-md animate-pulse"></div>

      <div className="border-0 mx-auto w-full h-full aspect-video rounded-md bg-ctp-crust animate-pulse"></div>

      <div className="w-full h-[calc((60px+(0.25rem)*2)*2)] sm:h-[calc(60px+(.25rem*2))] bg-ctp-crust rounded-md animate-pulse"></div>

      <div className="w-full h-[40px] bg-ctp-crust rounded-md animate-pulse"></div>
    </main>
  );
}
