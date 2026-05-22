import { LinkOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Card } from "antd";

export default function ToolCard({ name, description, link, emoji = "🛠️", credentials }) {
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <span className="text-lg select-none">{emoji}</span>
          <span className="font-semibold">{name}</span>
        </span>
      }
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
      <p className="text-sm text-gray-600 leading-5 m-0">{description}</p>

      {credentials && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1">
          {credentials.username && (
            <span className="flex items-center gap-2 text-sm">
              <UserOutlined className="text-gray-400" />
              <code className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono">{credentials.username}</code>
            </span>
          )}
          <span className="flex items-center gap-2 text-sm">
            <LockOutlined className="text-gray-400" />
            <code className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono">{credentials.password}</code>
          </span>
        </div>
      )}
    </Card>
  );
}
