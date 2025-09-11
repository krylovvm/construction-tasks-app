# Construction Tasks App

Demo: https://construction-tasks-app.vercel.app/

An offline-first web application for managing construction tasks.

## 📱 Functionality

- **Construction Plan Management**
  - Upload plan images
  - Interactive map based on plans using Leaflet.js
  - Zooming and navigation through plans

- **Tasks on Construction Sites**
  - Create tasks linked to specific points on the plan
  - Edit and delete tasks
  - Visualize tasks through interactive markers on the plan

- **Checklist System**
  - Create checklists for each task
  - Track progress through statuses: "Not started", "In progress", "Blocked", "Done", "Final Check awaiting"
  - Visual indicators for different statuses

- **Offline Work**
  - Full application functionality in offline mode
  - Local data storage using RxDB

## 🕒 Time Spent on Each Feature/Task

| Feature/Task                 | Time Spent | Description                                                         |
| ---------------------------- | ---------- | ------------------------------------------------------------------- |
| **Project Setup**            | ~1 hour    | Setting up Vite, TypeScript, ESLint, Tailwind CSS, FSD architecture |
| **RxDB Integration**         | ~3 hours   | Data storage setup, schema definition, API for database operations  |
| **Plan Management**          | ~4 hours   | Loading and displaying plans, integration with Leaflet.js           |
| **Task System**              | ~2 hours   | Creating, editing, deleting tasks, linking to points on the plan    |
| **Checklist System**         | ~3 hours   | Model development, UI, statuses, item editing                       |
| **Markers on Plan**          | ~1 hour    | Display of interactive markers on the plan, event configuration     |
| **Testing and Debugging**    | ~1 hour    | Finding and fixing bugs, testing in various conditions              |
| **Performance Optimization** | ~1 hour    | Profiling, component render optimization                            |

## 🏃‍♂️ Running the Project

### Prerequisites

- Node.js 16+
- npm

### Installing Dependencies

npm install

### Running in Development Mode

npm run dev

### Building for Production

npm run build

### Previewing the Build

npm run preview

## 🔄 Refactoring and Improvements (with additional time)

- Refactor PlanContainer and CheckListItem
- Refactor UI components (Input, Button, etc.) and improve accessibility
- Plans, Tasks and Checks lists virtualization
- State update optimization in Zustand store using more granular selectors
- Icons optimization
- Adding animations to improve interface responsiveness
- Snackbar notifications
- Search, filters and sort for Plans and Tasks

## 📂 Project Structure

- **app/** — Application entry point, global providers and configuration
- **shared/** — Reusable UI components, utilities, types, config, assets
- **entities/** — Business entities (user, task, checklist)
- **features/** — User scenarios and business logic
- **widgets/** — Composite components combining entities and features
- **pages/** — Application pages/routes
