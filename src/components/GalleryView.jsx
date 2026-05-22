import ToolCard from "./ToolCard.jsx";

export default function GalleryView({ tools, decryptedMap = {} }) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool, i) => (
        <ToolCard
          key={i}
          emoji={tool.emoji}
          name={tool.name}
          description={tool.description}
          link={tool.link}
          credentials={decryptedMap[tool.name]}
        />
      ))}
      <button className="w-full min-h-[120px] rounded-lg border border-gray-200 border-dashed flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
        <span className="text-sm">New tools coming soon</span>
      </button>
    </div>
  );
}
