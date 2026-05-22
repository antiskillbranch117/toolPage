import { Collapse } from "antd";
import ToolCard from "./ToolCard.jsx";

export default function CategorySection({ category, tools, decryptedMap = {} }) {
  const items = [
    {
      key: category,
      label: <span className="font-semibold text-base">{category}</span>,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      ),
    },
  ];

  return (
    <Collapse
      items={items}
      defaultActiveKey={[category]}
    />
  );
}
