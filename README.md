# Multi-chain-wallet-integration

A crypto wallet integration project.

## Live Preview

Check it out here: [Live Preview](https://incandescent-longma-2b6623.netlify.app/)

## About This Project

Multi-chain-wallet-integration is a streamlined wallet integration solution that supports multiple blockchain networks.

## Tech Stack

- TypeScript
- React (Vite)
- React Router
- TailwindCSS
- Viem
- Zustand
- Wagmi
- Solana Web3
- Bitcoin Web3
- QueryClientProvider
- ConnectionProvider
- WalletProvider
- Vitest (for testing)

## Getting Started

### Clone the repository

```sh
git clone https://github.com/christopher-becker/multi-chain-wallet-integration.git
cd multi-chain-wallet-integration
npm install
npm run dev
```

## Start Testing

```sh
cd multi-chain-wallet-integration
npm run test
```

## Project Structure Guide

This document outlines the naming conventions used in this project to maintain consistency, readability, and scalability. All developers contributing to this project should follow these conventions.

---

### General Rules

- Use **PascalCase** for component and TypeScript file names (e.g., `HomePage.tsx`, `WalletBalance.tsx`).
- Use **camelCase** for hooks, utility functions, and non-component files (e.g., `useTokenBalances.ts`, `useWalletConnections.ts`).
- Use **kebab-case** for folder names (e.g., `get-started-page`, `pulse-connected-wallet`).
- Constants, Utils, Types and Context files are suffixed with their appropriate name `.const.ts` (e.g., `tokens.const.ts`, `formatter.util.ts`).
- Hooks are prefixed with `use` (e.g., `useTokenBalances.ts`, `useWalletConnections.ts`).

---

### Folder Naming Conventions

#### `src/`

The root of the project, containing all source code.

#### `components/`

Houses reusable UI components.

- Each component or related group of components is placed in its respective subfolder (e.g., `wallet/`, `footer/`, `modal/`).
- Component files use **PascalCase** (e.g., `WalletBalance.tsx`, `WagmiWallet.tsx`).
- If a component has multiple variations, they should be prefixed with a clear descriptor (e.g., `UtxoWallet.tsx`, `SolanaWallet.tsx`).

#### `core/`

Contains essential application logic, utilities, and configurations.

- **`constants/`**: Stores configuration files with `.const.ts` suffix.
- **`context/`**: Manages React context providers with `.context.tsx` suffix.
- **`hooks/`**: Custom React hooks prefixed with `use`.
- **`stores/`**: State management-related logic with `.store.ts` suffix.
- **`types/`**: Contains TypeScript type definitions with `.type.ts` suffix.
- **`utils/`**: Utility functions with `.util.ts` suffix.

#### `pages/`

Houses the application’s page components.

- Each page is placed inside its respective folder (e.g., `home-page/`, `suspense-page/`).
- Page components are named in **PascalCase** (e.g., `HomePage.tsx`, `BasePage.tsx`, `NotFoundPage.tsx`).

---

## File Naming Conventions

| File Type            | Naming Convention                    | Example                                          |
| -------------------- | ------------------------------------ | ------------------------------------------------ |
| **React Components** | PascalCase                           | `HomePage.tsx`, `WalletBalance.tsx`              |
| **Hooks**            | camelCase with `use` prefix          | `useTokenBalances.ts`, `useWalletConnections.ts` |
| **Constants**        | camelCase with `.const.ts` suffix    | `routes.const.ts`, `tokens.const.ts`             |
| **Context Files**    | camelCase with `.context.tsx` suffix | `walletContext.ts`                               |
| **Utility Files**    | camelCase with `.util.ts` suffix     | `formatBalance.util.ts`, `fetchData.util.ts`     |
| **Type Files**       | camelCase with `.type.ts` suffix     | `blog.type.ts`, `coin.types.ts`                  |

By following these conventions, we ensure consistency across the codebase, making it easier for new developers to understand and contribute effectively.
