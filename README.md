# 🛒 Ecommerce Sales Dashboard

[![Deploy to GitHub Pages](https://github.com/Pallab-Chakraborty/EcommerceDashboard-DataAnalytics-/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pallab-Chakraborty/EcommerceDashboard-DataAnalytics-/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> A fully interactive sales analytics dashboard — zero frameworks, zero backend, 100% in-browser.

**[🔴 Live Demo →](https://pallab-chakraborty.github.io/EcommerceDashboard-DataAnalytics-/)**

## 📌 About the Project

This dashboard visualizes **1,500 order lines** from an Indian e-commerce business across the full year of 2018, spanning **500 unique customers** across 3 product categories and 5 payment modes.

The raw CSV data (`Orders.csv` + `Details.csv`) was cleaned, merged on `Order ID`, and aggregated into a single JSON dataset (`data/orders.json`), which the dashboard fetches at runtime. Every chart and table updates live when filters are applied.

| Metric | Value |
| --- | --- |
| 💰 Total Revenue | ₹4,37,771 |
| 📈 Net Profit | ₹36,963 |
| 📦 Units Sold | 5,615 |
| 🛍️ Avg Order Value | ₹292 |
| 👥 Customers | 500 |
| 📋 Order Lines | 1,500 |
| 📊 Profit Margin | 8.4% |

## ✨ Features

- **Dynamic Filters** — filter by Category (Electronics / Furniture / Clothing) and Payment Mode (COD / UPI / Credit Card / EMI / Debit Card); all charts and tables re-render instantly
- **Monthly Trend Line** — revenue vs profit across all 12 months of 2018, revealing seasonal dips and peaks
- **Payment Mode Donut** — visual breakdown of how customers prefer to pay
- **Category Bar Chart** — grouped revenue & profit comparison across the 3 categories
- **Top States by Revenue** — animated bar list for geographic sales distribution (Maharashtra leads at ₹1,02,498)
- **Sub-Category Profit Table** — profit/loss drilldown to product-type level (e.g. Printers: +₹8,606 vs Electronic Games: -₹644)
- **Top 10 Customers** — ranked by total lifetime spend with 🥇🥈🥉 medals
- **Revenue vs Quantity Chart** — side-by-side comparison to spot high-volume, low-revenue categories

## 🛠️ Tech Stack

| Tool | Role |
| --- | --- |
| HTML5 + CSS3 | Layout, theming, animations |
| Vanilla JavaScript (ES6+) | Data joins, aggregations, filter logic |
| [Chart.js 4.4](https://www.chartjs.org/) | All interactive charts |
| Google Fonts — Outfit + JetBrains Mono | Typography |
| GitHub Pages | Free static hosting |

No npm required to run it, no bundler, no dependencies beyond a CDN link for Chart.js.

## 📁 Project structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml   CI: auto-deploys to GitHub Pages on every push to main
├── index.html          Page structure and markup
├── css/
│   └── styles.css      All styling (theming, layout, animations)
├── js/
│   ├── charts.js        Chart.js setup: monthly trend, payment donut, category bars
│   └── app.js            State, filters, KPI/table rendering, data loading, init
├── data/
│   └── orders.json       The 1,500-record merged dataset (Orders.csv + Details.csv)
├── package.json         Project metadata + local dev script (no build step)
├── LICENSE              MIT
└── README.md
```

## 📊 Data Sources

The original raw files this dataset was built from:

| File | Rows | Key Columns |
| --- | --- | --- |
| `Orders.csv` | 500 | Order ID, Order Date, CustomerName, State, City |
| `Details.csv` | 1,500 | Order ID, Amount, Profit, Quantity, Category, Sub-Category, PaymentMode |

The two tables were joined on `Order ID`, and the merged result is what ships as `data/orders.json` — the dashboard fetches this file at load time rather than embedding it inline in the HTML.

## 🚀 Running locally

Because the dashboard fetches `data/orders.json` over HTTP, opening `index.html` directly as a file (`file://...`) won't work in most browsers — you need a local server:

```bash
npm start
# serves the site at http://localhost:8000
```

or, without npm:

```bash
python3 -m http.server 8000
```

## 🌐 Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that deploys automatically.

1. Push these files to your repo (replacing the old single-file `index.html`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **"GitHub Actions"**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).
5. GitHub will publish to `https://<username>.github.io/<repo-name>/` within a minute or two — the badge at the top of this README tracks deploy status.

(The classic "Deploy from a branch" method also works fine here since everything is static — you can use that instead and ignore the workflow file if you prefer.)

## 🔗 Related Projects

| Project | Description | Live |
| --- | --- | --- |
| 🚲 Bike Sales Dashboard | Customer segmentation & purchase behavior — 1,000 records, interactive filters | [Live Demo](https://pallab-chakraborty.github.io/bike-sales-dashboard/) |
| 🌐 Personal Portfolio | My full developer portfolio | [Visit](https://pallab-chakraborty.github.io/pallab/) |

## 👤 Author

**Pallab Chakraborty** — B.Tech CSE · Jawaharlal Nehru University, New Delhi

[Portfolio](https://pallab-chakraborty.github.io/pallab/) · [LinkedIn](https://www.linkedin.com/in/pallabchakrabortyjnu/) · [GitHub](https://github.com/Pallab-Chakraborty) · [Email](mailto:pallab98_soe@jnu.ac.in)

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---

Built with ❤️ & ☕ by [Pallab Chakraborty](https://pallab-chakraborty.github.io/pallab/)
