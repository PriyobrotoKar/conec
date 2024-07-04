[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Next.js Starter Template

This repository is a Next.js starter template designed to help you quickly set up a project with the following tools and technologies:

- **Next.js**: The React Framework for production
- **ESLint**: A tool for identifying and fixing problems in your JavaScript code
- **Prettier**: An opinionated code formatter
- **Husky**: Git hooks made easy
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **shadcn/ui**: UI components for your project
- **React Query**: Hooks for fetching, caching, and updating asynchronous data in React

## Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/nextjs-starter-template.git
   cd nextjs-starter-template
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of your project or you can copy the `.sample.env` file and add your environment variables. For example:

   ```plaintext
   DATABASE_URL="your-database-url"
   ```

4. **Set up repository secrets:**

- `GH_PAT` (GitHub Personal Access Token)
- `VERCEL_ORG_ID` (Vercel Organization ID)
- `VERCEL_PROJECT_ID` (Vercel Project ID)
- `VERCEL_TOKEN` (Vercel Token)

5. **Setting Up Environments**

This repository uses GitHub Actions to manage deployment to different environments.

- `Production`
  - **Secrets** : DATABASE_URL
  - **Variables** : DEPLOYMENT_URL
- `Staging`
  - **Secrets** : DATABASE_URL
  - **Variables** : STAGING_URL

### Development

To start the development server, run:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To start the database server, run:

```bash
docker compose up -d
```

### Prisma

To generate Prisma client, run:

```bash
pnpm dlx prisma generate
```

To run Prisma migrations, run:

```bash
pnpm dlx prisma migrate dev
```

### Build

To build the project for production, run:

```bash
pnpm run build
```

### Lint

To run ESLint and check for linting errors, run:

```bash
pnpm run lint
```

### Format

To format your code with Prettier, run:

```bash
pnpm run format
```

### Husky

Husky is used to manage Git hooks. This project is set up with a pre-commit hook to run ESLint and Prettier. The hooks are configured in the `.husky` directory.

## Project Structure

- `src/`
  - `app/`: Next.js app directory
  - `components/`: React components
    - `ui/`: shadcn/ui components
  - `lib/`: Utility functions and libraries
  - `hooks/`: Custom React hooks
  - `providers/`: React context providers
- `prisma/`: Prisma schema and migration files
- `public/`: Static assets

## Contributing

If you have suggestions for improving this template, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

### Additional Information

#### ESLint

This project uses a custom ESLint configuration to ensure code quality and consistency. You can modify the ESLint rules in the `.eslintrc.json` file.

#### Prettier

Prettier is configured to automatically format your code. You can customize the Prettier configuration in the `.prettierrc` file.

#### Husky

Husky is configured to run ESLint and Prettier checks before each commit. You can modify the hooks in the `.husky` directory.

#### Prisma

Prisma is used to interact with the database. The Prisma schema is defined in the `prisma/schema.prisma` file. You can configure your database connection in the `.env` file.

#### shadcn/ui

shadcn/ui provides a set of reusable UI components. You can find these components in the `ui` directory and use them throughout your application.

#### React Query

React Query is used to manage server state in your React application. You can define your queries and mutations in the `hooks` directory and use them in your components.

#### Vitest

Vitest is used for unit testing in this project. You can write your tests in the `tests` directory and run them using the Vitest command. Configuration for Vitest can be found in the `vitest.config.js` file.

#### Zod

Zod is used for schema validation and type safety. You can define your Zod schemas in the `schemas` directory and use them to validate your data throughout the application.

#### GitHub Actions

GitHub Actions is used to automate workflows such as running tests and deploying your application. You can find the workflow definitions in the `.github/workflows` directory.

#### Docker

Docker is used to containerize the application, making it easier to manage dependencies and environments. You can find the Docker configuration in the `Dockerfile` and the `docker-compose.yml` file for multi-container setups.

---

For detailed documentation on each of these tools and technologies, please refer to their official documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [ESLint Documentation](https://eslint.org/docs)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Husky Documentation](https://typicode.github.io/husky)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [shadcn/ui Documentation](https://shadcn.dev/docs)
- [React Query Documentation](https://react-query.tanstack.com/overview)
- [Vitest Documentation](https://vitest.dev/)
- [Zod Documentation](https://zod.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)

Happy coding! 🎉
