export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-purple-500">AI Space</h1>
      <p className="mt-4 text-gray-400 text-xl">Your content production machine</p>
      <div className="mt-10 grid grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-purple-800">
          <h2 className="text-xl font-semibold">✍️ Content Generator</h2>
          <p className="text-gray-400 mt-2">Create content with AI</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-purple-800">
          <h2 className="text-xl font-semibold">🎬 Video Generator</h2>
          <p className="text-gray-400 mt-2">Turn ideas into videos</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-purple-800">
          <h2 className="text-xl font-semibold">📅 Social Scheduler</h2>
          <p className="text-gray-400 mt-2">Schedule & publish posts</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-purple-800">
          <h2 className="text-xl font-semibold">📊 Analytics</h2>
          <p className="text-gray-400 mt-2">Track your performance</p>
        </div>
      </div>
    </main>
  )
}