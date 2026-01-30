# GitHub Resume App

Quick full-stack demo that generates a resume from a GitHub username.

## Setup

1. Install:
   ```bash
   npm install
   ```

2. (Optional) Add a GitHub token to increase rate limit:
   Create a `.env.local` file:
   ```
   GITHUB_TOKEN=ghp_...
   ```

3. Run:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Features
- Fetch public profile and repos
- Editable resume UI
- Export to PDF
