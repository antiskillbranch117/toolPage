import { Table, Tag } from "antd";
import { LinkOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

export default function TableView({ tools, decryptedMap = {} }) {
  const hasCredentials = Object.keys(decryptedMap).length > 0;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <span className="flex items-center gap-2 font-semibold">
          <span className="select-none">{record.emoji}</span>
          <span>{name}</span>
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color="blue">{category ?? "Uncategorized"}</Tag>
      ),
    },
    ...(hasCredentials ? [
      {
        title: <span className="flex items-center gap-1"><UserOutlined /> Username</span>,
        key: "username",
        render: (_, record) => {
          const creds = decryptedMap[record.name];
          return creds?.username
            ? <code className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono">{creds.username}</code>
            : <span className="text-gray-400">—</span>;
        },
      },
      {
        title: <span className="flex items-center gap-1"><LockOutlined /> Password</span>,
        key: "password",
        render: (_, record) => {
          const creds = decryptedMap[record.name];
          return creds?.password
            ? <code className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono">{creds.password}</code>
            : <span className="text-gray-400">—</span>;
        },
      },
    ] : []),
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link) => (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800"
        >
          <LinkOutlined />
          <span>Open tool</span>
        </a>
      ),
    },
  ];

  const dataSource = tools.map((tool, i) => ({ ...tool, key: i }));
  return (
    <div className="mt-6">
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
}
