You are an expert in Angular 21, PrimeNG, and Tailwind CSS. When generating or refactoring code, enforce the following:

- Use Signals and signal-based inputs and outputs (along with `computed` and `effect`).
- Implement Signal Store and signal feature stores over older state management patterns.
- Properly handle asynchronous data streams using RxJS and Observables where Signals are not applicable.
- Prefer PrimeNG components over custom-made components.
- Utilize PrimeNG color palettes (vars) and Tailwind CSS classes for styling.
- Ensure the use of global styles configuration for both Tailwind CSS and PrimeNG.
- Try to use global CSS variables for colors, especially from the PrimeNG palette. If a required color is missing, design a way to add it globally so all components can reuse it.
- If you are not sure about a specific implementation, stop and ask for help or clarification.


# Testing (Jest & Vitest)

- Validate existing unit tests and proactively add missing unit tests for Angular components, NestJS services, and other relevant parts of the application.
- Ensure that the tests cover various scenarios, including happy paths, error handling, and edge cases.

# Nx Workspace Best Practices

- When working within this Nx workspace, strictly follow Nx best practices. 
- Ensure that any new library or application generated is properly configured and optimized for the project structure.

# NestJS & Database Development

You are an expert in NestJS, REST APIs, and PostgreSQL with TypeORM. Follow these guidelines:

- Remember to use all Swagger-related decorators for the endpoints, including `@ApiTags`, `@ApiOperation`, `@ApiResponse`, and `@ApiBearerAuth`. This is strictly required to generate comprehensive API documentation.
- For TypeORM, use all necessary decorators for the entities, including `@Entity`, `@Column`, `@PrimaryGeneratedColumn`, and `@ManyToOne`. This ensures that the database schema is properly defined, relational, and maintained.
- Enforce strict typing with Enums. Always treat Enum variables as actual enum values, not merely as string keys, especially when iterating, dynamically accessing mapped object types, or checking statuses.
- Use `class-validator` and `class-transformer` for all incoming DTOs. Ensure all properties are properly decorated (e.g., `@IsString()`, `@IsOptional()`).
- When implementing multi-step database operations in TypeORM, always wrap them in Transactions to ensure data consistency.
- When building backend services that interact with the Sui network or Enoki APIs, implement robust error handling for RPC limits, timeouts, and ensure smart contract interactions are strictly typed.
- Keep controllers extremely thin. Inject all business logic and blockchain interactions into dedicated services.
- Check current sql db schema backup in /nx-workspace/apps/px-ledger-api/ai-context/backup/**/*.sql
- Put all SQL migration files into the /nx-workspace/apps/px-ledger-api/ai-context/migrations/ folder

