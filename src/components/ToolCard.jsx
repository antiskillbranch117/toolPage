import { CopyOutlined } from "@ant-design/icons";
import { Card, Tag, message } from "antd";

function copyToClipboard(text, label, e) {
  e.stopPropagation();
  navigator.clipboard.writeText(text);
  message.success(`${label} copied!`);
}

export default function ToolCard({ name, description, link, emoji = "🛠️", credentials }) {
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <span className="text-lg select-none">{emoji}</span>
          <span className="font-semibold">{name}</span>
        </span>
      }
      hoverable
      style={{ width: "100%", cursor: "pointer" }}
      onClick={() => window.open(link, "_blank")}
    >
      <p className="text-sm text-gray-600 leading-5 m-0">{description}</p>

      {credentials && (
        <div
          className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {credentials.username && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag color="blue">Username</Tag>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono">
                  {credentials.username}
                </code>
              </div>
              <CopyOutlined
                className="text-gray-400 hover:text-gray-700 cursor-pointer"
                onClick={(e) => copyToClipboard(credentials.username, "Username", e)}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag color="orange">Password</Tag>
              <code className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono">
                {credentials.password}
              </code>
            </div>
            <CopyOutlined
              className="text-gray-400 hover:text-gray-700 cursor-pointer"
              onClick={(e) => copyToClipboard(credentials.password, "Password", e)}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
