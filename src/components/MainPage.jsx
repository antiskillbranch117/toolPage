import { useState } from "react";
import { Select } from "antd";
import GalleryView from "./GalleryView.jsx";
import CategoryPage from "./CategoryPage.jsx";
import TableView from "./TableView.jsx";

/**
 * MainPage
 * Recreates the Notion-style "Team Directory" gallery layout, but as a
 * directory of tools. Renders a grid of ToolCard components plus a
 * trailing "+ New page" placeholder card.
 */
export default function MainPage() {
  const [activeView, setActiveView] = useState("gallery");

  // Sample data — replace with your real tools list.
 const tools = [
  {
    emoji: "🧪",
    name: "GLKB Dev",
    description:
      "Development version of the GLKB site for testing new features before production release.",
    link: "https://dev.glkb.org",
    category: "Development",
  },
  {
    emoji: "🚀",
    name: "GLKB Production",
    description:
      "Production version of the GLKB site that is currently in use or ready for delivery.",
    link: "https://glkb.org",
    category: "Production",
  },
  {
    emoji: "📅",
    name: "Lab Schedule Manager",
    description:
      "Internal lab scheduling tool for managing lab schedules and related resources.",
    link: "https://scheduler.404nfound.com",
    backupLink: "http://ec2-13-221-95-92.compute-1.amazonaws.com",
    category: "Internal Tool",
  },
  {
    emoji: "🗄️",
    name: "Database Monitor",
    description:
      "Internal database monitoring tool for checking database status and related information.",
    link: "http://ec2-54-82-104-165.compute-1.amazonaws.com:8101/",
    category: "Internal Tool",
  },
];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-12 py-12">
        {/* Header */}
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <span>Tool Directory</span>
        </h1>

        <p className="mt-4 text-gray-700 leading-7 max-w-3xl">
          Help your team keep track of which tools are available. Each card
          shows a tool name and a short description of what it does.
        </p>

        <p className="mt-4 text-gray-700 leading-7">
          ↓ Click{" "}
          <code className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 text-sm font-mono">
            Gallery View
          </code>{" "}
          below to discover all tools.
        </p>

        {/* View tabs + toolbar */}
        <div className="mt-8 flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => setActiveView("gallery")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium ${activeView === "gallery" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <GridIcon />
              <span>Gallery View</span>
            </button>
            <button
              onClick={() => setActiveView("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium ${activeView === "table" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <TableIcon />
              <span>Table View</span>
            </button>
            <button
              onClick={() => setActiveView("category")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium ${activeView === "category" ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <BoardIcon />
              <span>By Category</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            {/* <ToolbarIcon><FilterIcon /></ToolbarIcon> */}
            {/* <ToolbarIcon><SortIcon active /></ToolbarIcon> */}
            {/* <ToolbarIcon><BoltIcon /></ToolbarIcon> */}
            {/* <ToolbarIcon><SparkleIcon /></ToolbarIcon> */}
            <Select
              showSearch
              placeholder="Search tools…"
              style={{ width: 200 }}
              options={tools.map((tool) => ({
                value: tool.link,
                label: `${tool.emoji} ${tool.name}`,
              }))}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onSelect={(link) => window.open(link, "_blank")}
            />
            {/* <ToolbarIcon><SlidersIcon /></ToolbarIcon> */}
            {/* <button className="ml-2 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-md">
              <span>New</span>
              <ChevronDownIcon />
            </button> */}
          </div>
        </div>

        {activeView === "gallery" && <GalleryView tools={tools} />}
        {activeView === "table" && <TableView tools={tools} />}
        {activeView === "category" && <CategoryPage tools={tools} />}
      </div>
    </div>
  );
}

/* ---------- Small icon helpers (inline SVG, no external deps) ---------- */

function ToolbarIcon({ children }) {
  return (
    <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
      {children}
    </button>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function TableIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 4v16" />
    </svg>
  );
}
function BoardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="5" height="16" rx="1" />
      <rect x="10" y="4" width="5" height="16" rx="1" />
      <rect x="17" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 5h18l-7 9v5l-4 2v-7L3 5z" />
    </svg>
  );
}
function SortIcon({ active }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#2563eb" : "currentColor"} strokeWidth="2">
      <path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}
function SlidersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
