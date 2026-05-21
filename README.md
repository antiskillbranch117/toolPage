# Tool Hub Page

A Notion-style tool directory for browsing and discovering available tools. Built with React, Ant Design, and Tailwind CSS.

**Live site:** [https://antiskillbranch117.github.io/toolPage/](https://antiskillbranch117.github.io/toolPage/)

---

## Features

- **Three views** — switch between Gallery, Table, and By Category
- **Search** — quickly find a tool by name and jump to it directly
- **Gallery View** — card grid with emoji, name, and description
- **Table View** — table with name, description, category label, and link
- **By Category** — collapsible sections grouping tools by category

## Tech Stack

- [React 18](https://react.dev/)
- [Ant Design 5](https://ant.design/) — UI components (Card, Table, Collapse, Tag, Select)
- [Tailwind CSS 3](https://tailwindcss.com/) — utility styling
- [Vite](https://vitejs.dev/) — build tool

## Project Structure

```
src/
└── components/
    ├── MainPage.jsx        # Root layout, view state, tools data, search select
    ├── GalleryView.jsx     # Responsive card grid
    ├── TableView.jsx       # Ant Design table with category tags and links
    ├── CategoryPage.jsx    # Groups tools by category, renders CategorySections
    ├── CategorySection.jsx # Single collapsible category (Ant Design Collapse)
    └── ToolCard.jsx        # Individual tool card (Ant Design Card)
```

## Adding a Tool

Open `src/components/MainPage.jsx` and add an entry to the `tools` array:

```js
{
  emoji: "🛠️",
  name: "My Tool",
  description: "What this tool does.",
  link: "https://example.com",
  category: "My Category",
}
```

The new tool will automatically appear in all three views.

## Local Development

```bash
npm install
npm run dev
```

## Deployment

The site is deployed automatically to GitHub Pages via GitHub Actions on every push to `main`.
