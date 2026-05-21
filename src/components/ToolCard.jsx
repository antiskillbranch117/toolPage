import { LinkOutlined } from "@ant-design/icons";
import { Card } from "antd";

/**
 * ToolCard
 * Ant Design Card with three visually separated sections:
 *   1) Title       — the tool's name (rendered in Card `title` prop)
 *   2) Body        — the tool's description
 *   3) Actions     — link to the tool (rendered in Card `actions` prop)
 *
 * Props:
 *   - name        : string  — the tool's display name
 *   - description : string  — short description of what the tool does
 *   - link        : string  — URL the user can click to open the tool
 *   - emoji       : string  — optional leading emoji (defaults to 🛠️)
 */
export default function ToolCard({ name, description, link, emoji = "🛠️" }) {
  return (
    <Card
      // Section 1: name
      title={
        <span className="flex items-center gap-2">
          <span className="text-lg select-none">{emoji}</span>
          <span className="font-semibold">{name}</span>
        </span>
      }
      // Section 3: link (rendered as a footer with a top border)
      actions={[
        <a
          key="open"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5"
        >
          <LinkOutlined />
          <span>Open tool</span>
        </a>,
      ]}
      hoverable
      style={{ width: "100%" }}
    >
      {/* Section 2: description */}
      <p className="text-sm text-gray-600 leading-5 m-0">{description}</p>
    </Card>
  );
}
