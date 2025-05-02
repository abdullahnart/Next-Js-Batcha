# BatchaTV

## Overview

BatchaTV is a modern web application built with Next.js 15, React 19, and TailwindCSS 4. The project features a responsive design with animations powered by GSAP and Framer Motion.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment Options](#deployment-options)
  - [Vercel Deployment](#vercel-deployment)
  - [Netlify Deployment](#netlify-deployment)
  - [Self-hosting](#self-hosting)
- [Project Structure](#project-structure)
- [Key Dependencies](#key-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v8 or higher) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/batchatv.git
   cd batchatv
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Development

To start the development server with Turbopack:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

To start the production server locally:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Deployment Options

### Vercel Deployment

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/), the platform built by the creators of Next.js.

1. Create an account on Vercel if you don't already have one.
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Run the deployment command from the project root:
   ```bash
   vercel
   ```

4. For subsequent deployments to production:
   ```bash
   vercel --prod
   ```

Alternatively, you can connect your GitHub repository to Vercel for automatic deployments.

### Netlify Deployment

You can also deploy your Next.js app to [Netlify](https://www.netlify.com/):

1. Create a `netlify.toml` file in your project root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. Install the Netlify plugin:
   ```bash
   npm install -D @netlify/plugin-nextjs
   ```

3. Deploy using the Netlify CLI or connect your GitHub repository to Netlify for automatic deployments.

### Self-hosting

To deploy on your own server:

1. Build the application:
   ```bash
   npm run build
   ```

2. Transfer the following to your server:
   - `.next` folder
   - `node_modules` folder (or install dependencies on the server)
   - `package.json`
   - `public` folder

3. On your server, run:
   ```bash
   npm run start
   ```

4. For production environments, consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "batchatv" -- start
   ```

## Project Structure

```
batchatv/
├── app/                  # Next.js App Router pages and layouts
├── components/           # React components
├── lib/                  # Utility functions and shared logic
├── public/               # Static assets
├── styles/               # Global styles
├── .eslintrc.json        # ESLint configuration
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── tailwind.config.js    # TailwindCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Dependencies

- **Framework**: Next.js 15.3.0 with React 19
- **Styling**: TailwindCSS 4 with tailwind-merge
- **Animation**: GSAP 3.12.7, Framer Motion 12.7.3
- **UI Components**: Radix UI (Accordion, Dialog, Tabs)
- **Icons**: Lucide React, React Icons
- **Carousel**: React Slick with Slick Carousel

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.