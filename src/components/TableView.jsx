import { Table, Tag } from "antd";
import { LinkOutlined } from "@ant-design/icons";

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

export default function TableView({ tools }) {
  const dataSource = tools.map((tool, i) => ({ ...tool, key: i }));
  return (
    <div className="mt-6">
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
}
