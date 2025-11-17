export default function SupportHome() {
  return (
    <div style={{backgroundColor:"#397dd0", borderRadius:"15px"}} className="p-12 text-white">
      <h1 className="text-3xl font-bold mb-6 text-black">Support Portal</h1>

      <input
        type="text"
        placeholder="eg: How do I open my account..."
        className="w-full border p-3 rounded-lg mb-6"
      />

      <p className="text-gray-600">
        Select a category from the sidebar to get started.
      </p>
    </div>
  );
}
