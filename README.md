# VelocityX - Premium Used Car Platform

VelocityX is a premium, feature-rich Used Car Buying and Selling web application built using Nuxt 3, TypeScript, and Tailwind CSS. The platform enables users to search, filter, and explore a comprehensive inventory of certified used cars, view details, and book test drives.

---
Open [https://velocity-x-s67j-topaz.vercel.app/](https://velocity-x-s67j-topaz.vercel.app/) in your browser to view the application.


## 🛠️ Tech Stack

VelocityX is built on a modern, high-performance web stack:

*   **Framework:** [Nuxt 3](https://nuxt.com/) (v4.4.8 Nuxt structure compatibility) - Hybrid Vue 3 framework for routing, SSR/SSG, and composables.
*   **UI Component Library:** [Nuxt UI](https://ui.nuxt.com/) (v4.8.2) - Premium, ready-made Vue components with built-in Tailwind integration, icons, and transitions.
*   **Styling & Design System:** [Tailwind CSS](https://tailwindcss.com/) (v4.3.0) via `@nuxtjs/tailwindcss` and `@tailwindcss/vite` for rapid utility-first styling.
*   **Asset Management:** [Nuxt Image](https://image.nuxt.com/) (v2.0.0) - High-performance image loading, responsive formats, and optimization.
*   **Data Validation:** [Zod](https://github.com/colinhacks/zod) (v4.4.3) - Schema validation library for data safety.

---

## 📁 Project Structure
Below is the directory tree of the project with details on each component's role:

```
velocityx/
├── app/                             # Core application files (Nuxt 3 layout structure)
│   ├── assets/                      # Application assets
│   │   └── css/
│   │       └── main.css             # Global stylesheet (imports Tailwind directives)
│   ├── components/                  # Reusable Vue 3 / Nuxt 3 UI components
│   │   ├── home/                    # Page-specific components for the home landing screen
│   │   │   ├── bodytype.vue         # Body type filters navigation
│   │   │   ├── carousel.vue         # Promotional image carousel
│   │   │   ├── explorepopularbrand.vue # Quick brand filter options
│   │   │   ├── hero.vue             # Header landing hero section
│   │   │   ├── manageyourvehicle.vue# Booking/Selling helper sections
│   │   │   └── trendingcar.vue      # List of trending/recommended cars
│   │   ├── App-Foooter.vue          # Application bottom footer component
│   │   ├── App-Header.vue           # Sticky header with integrated unified search & dropdown suggestions
│   │   └── CarCard.vue              # Inventory card showcasing price, specs, key tags, and CTA
│   ├── data/                        # Static and mock dataset layers
│   │   └── cars.ts                  # Mock database of certified cars and the Car TS interface
│   ├── layouts/                     # Application structural layouts
│   │   └── default.vue              # Default wrapper including App-Header and App-Foooter
│   ├── pages/                       # File-based routing (pages system)
│   │   ├── index.vue                # Home landing page displaying hero, brands, body types, and carousel
│   │   ├── buyusedcar.vue           # WIP Directus CMS brand display integration page
│   │   ├── brands/                  # Brand and collection catalog routes
│   │   │   ├── index.vue            # Explore Cars search, multi-facet filtering, and infinite scroll
│   │   │   └── [...brand].vue       # Catch-all routing for filtered car searches (e.g. /brands/hyundai)
│   │   └── cars/
│   │       └── [id].vue             # Interactive car spec layout, price calculators, and Test Drive booking form
│   └── app.vue                      # Application root entry point
├── public/                          # Public directory containing static assets, logos, and illustration images
├── nuxt.config.ts                   # Nuxt configuration (CSS, color modes, and module registrations)
├── package.json                     # NPM packages, dependencies, and script definitions
└── tsconfig.json                    # TypeScript compiler options configuration
```

---

## 🔑 Key Features

### 1. Unified Autocomplete Search
The [App-Header.vue](file:///c:/Users/Asus/velocityx/app/components/App-Header.vue) component includes a search system that filters the [cars.ts](file:///c:/Users/Asus/velocityx/app/data/cars.ts) database in real-time. It suggests matches by brand or specific model name, redirecting the user to the exploration catalog.

### 2. Multi-Facet Catalog Filtering
The [index.vue](file:///c:/Users/Asus/velocityx/app/pages/brands/index.vue) explore screen features a powerful filtering panel:
*   **Body Type Filter:** Limit to categories (SUV, Sedan, Hatchback, EV).
*   **Brand Filters:** Select leading manufacturers.
*   **Fuel & Features:** Filter by tags (Petrol, Diesel, Automatic, Manual, Sunroof, ADAS, Hybrid, Electric).
*   **Limit Toasts:** Real-time feedback alerts if the user selects more than 2 parameters of a category.
*   **URL Query Synced state:** Refreshing or sharing the page retains all selected filters through URL params sync (`q`, `sort`, `category`, `brand`, `tag`).

### 3. Detail Showcases & EMI Calculator
On the dynamic [[id].vue](file:///c:/Users/Asus/velocityx/app/pages/cars/[id].vue) page:
*   A details view highlights year of registration, kilometers driven, fuel type, transmission, ownership, and body style.
*   An Indian Rupee localized pricing calculator breakdown displays the original price, discounted price, and calculated monthly EMI starting costs.

### 4. Interactive Test Drive Booking
A booking form inside [[id].vue](file:///c:/Users/Asus/velocityx/app/pages/cars/[id].vue) lets users select a preferred date/time and input their contact info to schedule a test drive. It simulates API request states with a loading spinner and provides a success notification via the Nuxt UI Toast manager ([app.vue](file:///c:/Users/Asus/velocityx/app/app.vue)).

### 5. Infinite Scroll Listings
The catalog implements infinite scroll via the Intersection Observer API in [[...brand].vue](file:///c:/Users/Asus/velocityx/app/pages/brands/[...brand].vue) and [index.vue](file:///c:/Users/Asus/velocityx/app/pages/brands/index.vue) to seamlessly fetch more cards from the database as the user scrolls.

### 6. Search Engine Optimization (SEO)
Each page utilizes SEO headers via Nuxt's `useSeoMeta` composable to optimize page titles, open graph meta tags, and Twitter cards for sharing listings.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or later recommended).

### 1. Installation

Clone or locate the workspace directory and install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 2. Development Server

Start the local development server:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```


### 3. Production Build

Build the production-ready bundle and preview it locally:

```bash
# Build the application
npm run build

# Preview the built application locally
npm run preview
```

---

## 📄 Key Configs and Components Reference

*   **Nuxt Configurations:** Managed inside [nuxt.config.ts](file:///c:/Users/Asus/velocityx/nuxt.config.ts).
*   **Car Database:** All details for inventory are defined in [cars.ts](file:///c:/Users/Asus/velocityx/app/data/cars.ts).
*   **App Layout:** Handled within [default.vue](file:///c:/Users/Asus/velocityx/app/layouts/default.vue) layout.
*   **Search bar details:** Described in [App-Header.vue](file:///c:/Users/Asus/velocityx/app/components/App-Header.vue).
*   **Explore & Search pages:** Available in [index.vue](file:///c:/Users/Asus/velocityx/app/pages/brands/index.vue) and [[...brand].vue](file:///c:/Users/Asus/velocityx/app/pages/brands/[...brand].vue).
