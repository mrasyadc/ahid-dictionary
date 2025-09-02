# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Common Commands
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Development Setup
- Uses Next.js 13 with App Router
- Chakra UI for component library with dark mode support
- TypeScript for type safety
- SWR for data fetching and caching

## Project Architecture

### Core Application Structure
This is a medical dictionary application for infectious diseases with two main features:

1. **Main Dictionary** (`/`) - Search and browse diseases with detailed information
2. **Similarity Graph** (`/similaritygraph`) - Visualize disease relationships using D3.js network graphs

### Data Architecture
- **JSON-based data storage**: Large medical datasets stored in `/json/` directory
- **API routes**: Dynamic language-specific endpoints (`/api/diseases/[lang]/route.ts`)
- **Multi-language support**: English (`data.json`) and Indonesian (`data_id.json`) disease data
- **Similarity data**: Separate JSON file (`similardata.json`) for disease relationship mapping

### Component Architecture
- **Reusable components**: All components in `/src/components/` directory
- **UI components**: Custom Chakra UI components with dark mode support
- **Data visualization**: D3.js-based network graph component for disease similarity
- **Search functionality**: Real-time search with keyboard shortcuts (Alt+K)

### Key Technical Patterns
- **Client-side data fetching**: Uses SWR hooks for API calls and caching
- **Dynamic routing**: Next.js App Router with dynamic disease detail pages
- **State management**: React hooks for local state, SWR for server state
- **Responsive design**: Chakra UI's responsive grid system
- **Accessibility**: Semantic HTML and ARIA attributes throughout

### File Organization
```
├── app/                    # Next.js App Router pages
│   ├── api/diseases/[lang]/ # Language-specific disease data API
│   ├── disease/            # Dynamic disease detail pages
│   ├── similaritygraph/    # Disease similarity visualization
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage with search functionality
├── src/
│   ├── components/         # Reusable React components
│   └── hooks/             # Custom React hooks (useKeyPress)
├── json/                  # Medical data files
├── theme.js               # Chakra UI theme configuration
└── memory-bank/           # Project documentation and context
```

### Data Flow
1. **Homepage**: Fetches disease list from `/api/diseases/en` → displays searchable grid
2. **Disease Details**: Dynamic routes fetch individual disease data
3. **Similarity Graph**: Imports similarity data directly from JSON → renders D3.js visualization
4. **Search**: Client-side filtering of disease data with real-time updates

### Development Notes
- **Dependencies need upgrade**: Project brief indicates Next.js and Chakra UI should be upgraded to LTS versions
- **MCP Servers**: Always use context7 and chakra-ui MCP servers when working with this project
- **Dark mode default**: Application starts in dark mode (configured in theme.js)
- **Keyboard shortcuts**: Alt+K focuses search input across the application