# E-Commerce Web Development Protocol

1. Architectural & Layout Rules (Next.js App Router)
* Global Layout Consistency: The Header and Footer components MUST be placed exclusively in app/layout.tsx. Do NOT duplicate them inside individual page components (e.g., page.tsx) to avoid double-rendering on the screen.
* Client-Side Routing: When building interactive components, always import useRouter from next/navigation (NOT next/router).
* Module Imports: Strictly use ES6 import/export syntax across the entire Next.js frontend. Never use require() as it will cause build failures during deployment.

2. E-Commerce Configurator & State Management
* Dynamic Pricing Calculation: When building product configurators with multiple add-ons (shapes, sizes, accessories), always use a useMemo hook to calculate the finalPrice. This ensures the UI instantly reflects price changes without redundant re-renders.
* Mobile UI/UX: For sticky elements (like a "Checkout" or "Add to Cart" bar pinned to the bottom of mobile screens), ensure the main <main> container has sufficient bottom padding (pb-24 or similar) so the sticky bar does not overlap the footer or obscure content.

3. Stripe Payments & Tax Integration
* Environment Variables:
    * The Publishable Key MUST be prefixed with NEXT_PUBLIC_ (e.g., NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) so the frontend can securely tokenize cards.
    * The Secret Key and Webhook Secret MUST remain entirely server-side.
* Automatic Taxes: If automatic_tax: { enabled: true } is used in the checkout session, the Stripe Dashboard must have a valid business origin address configured under "Tax Settings". If it is missing, the checkout API will crash with a 500 error.
* Webhooks: The database should only fulfill orders after receiving a successful checkout.session.completed event via the Stripe webhook (/api/webhook), not directly from the frontend checkout redirect.

4. Database & Authentication (Supabase)
* Security Roles:
    * Use the NEXT_PUBLIC_SUPABASE_ANON_KEY for all client-side data fetching.
    * Use the SUPABASE_SERVICE_ROLE_KEY only in secure server environments (like the Stripe webhook API route) to safely bypass Row Level Security (RLS) when writing order receipts.

5. Development Infrastructure (Docker & MCP)
* GitHub/MCP Connectivity: If the GitHub MCP server reports a "Cannot connect to Docker daemon" error, first confirm that the Docker Desktop application is fully launched and running on the host machine before attempting to rotate tokens or debug configuration files.
* Strict Project Isolation: NEVER store MCP API tokens (like SUPABASE_ACCESS_TOKEN or GITHUB_PERSONAL_ACCESS_TOKEN) in global macOS environments (e.g. ~/.zshrc or launchctl) to prevent cross-contamination between projects. Always store them in a hidden `.env` file at the root of the specific project workspace. This ensures the AI coding assistant seamlessly switches context when jumping between conversations.
