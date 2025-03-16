# NextScape - Next.js Boilerplate Kit

A modern, feature-rich Next.js boilerplate with built-in authentication, dashboard, and more. This project is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and enhanced with additional features.

## Features

- 🔐 Authentication (Sign In/Sign Up)
- 📊 Dashboard with charts
- 🎨 Theme switching (Light/Dark mode)
- 🎯 Profile management
- 🔧 Settings panel
- 📱 Responsive design
- 🎉 UI Components (shadcn/ui)
- 💾 Database integration with Prisma
- 🔒 Protected routes
- 🎨 Modern UI with custom components

## Getting Started

### Prerequisites

- Node.js 18+ 
- PNPM (recommended) or NPM
- A database (PostgreSQL recommended)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Set up your environment variables:
   Create a `.env` file in the root directory with your database and auth configuration

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js 13+ app directory
- `/components` - Reusable UI components
- `/lib` - Utility functions and configurations
- `/prisma` - Database schema and migrations
- `/public` - Static assets
- `/types` - TypeScript type definitions

## Tech Stack

- [Next.js 13+](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Prisma](https://www.prisma.io/) - Database ORM
- [Better-auth](https://www.better-auth.com/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)

## Contributing

Contributions, issues, and feature requests are welcome!

## License

This project is open source and available under the MIT license.
