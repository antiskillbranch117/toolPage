import CategorySection from "./CategorySection.jsx";

export default function CategoryPage({ tools, decryptedMap = {} }) {
  const grouped = tools.reduce((acc, tool) => {
    const cat = tool.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tool);
    return acc;
  }, {});

  return (
    <div className="mt-6 flex flex-col gap-4">
      {Object.entries(grouped).map(([category, categoryTools]) => (
        <CategorySection key={category} category={category} tools={categoryTools} decryptedMap={decryptedMap} />
      ))}
    </div>
  );
}
