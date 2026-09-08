const token = localStorage.getItem("jwtToken");
if (!token) {
  // Adjust "login.html" to your actual login file path
  window.location.href = "login.html";
} 

const routes = {
  dashboard: {
    title: "Dashboard",
    description: "Welcome to your core metrics, revenue overviews, and system highlights.",
    file: "screens/dashboard.html"
  },
  customers: {
    title: "Customers",
    description: "Manage client directories, contact details, and account lifecycles.",
    file: "screens/customers.html"
  },
  suppliers: {
    title: "Suppliers",
    description: "View vendor lists, supplier contracts, and purchase order histories.",
    file: "screens/suppliers.html"
  },
  products: {
    title: "Products",
    description: "Configure product catalogs, SKUs, inventory thresholds, and pricing.",
    file: "screens/products.html"
  },
  inventory: {
    title: "Inventory",
    description: "Track warehouse stock levels, stock movement logs, and dispatch states.",
    file: "screens/inventory.html"
  },
  sales: {
    title: "Sales",
    description: "Monitor real-time sales transactions, sales orders, and revenue channels.",
    file: "screens/sales.html"
  },
  invoices: {
    title: "Invoices",
    description: "Generate, review, and track client billing receipts and invoice states.",
    file: "screens/invoices.html"
  },
  payments: {
    title: "Payments",
    description: "Review incoming wire transfers, transaction methods, and settle dues.",
    file: "screens/payments.html"
  },
  expenses: {
    title: "Expenses",
    description: "Track company expenditures, recurring operational fees, and claim tickets.",
    file: "screens/expenses.html"
  },
  employees: {
    title: "Employees",
    description: "Manage team rosters, department structures, and permissions.",
    file: "screens/employees.html"
  },
  reports: {
    title: "Reports",
    description: "Generate quarterly tax, sales, operations, and balance sheet reports.",
    file: "screens/reports.html"
  },
  analytics: {
    title: "Analytics",
    description: "Deep dive into business conversion funnels and trend indicators.",
    file: "screens/analytics.html"
  },
  settings: {
    title: "Settings",
    description: "Configure system preferences, API webhooks, and billing limits.",
    file: "screens/settings.html"
  },
  auditlogs: {
    title: "Audit Logs",
    description: "View access logs, privilege changes, and system error events.",
    file: "screens/auditlogs.html"
  }
};

async function renderScreen(pageKey) {
  const container = document.getElementById("content-area");
  const breadcrumb = document.getElementById("active-crumb");
  const route = routes[pageKey] || routes.dashboard;

  // 1. Update Breadcrumb
  if (breadcrumb) {
    breadcrumb.textContent = route.title;
  }

  // 2. Update Sidebar Active State
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.page === pageKey) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 3. Render content
  if (container) {
    try {
      const response = await fetch(route.file);
      if (!response.ok) throw new Error("Screen file not found");
      container.innerHTML = await response.text();
    } catch (err) {
      // Automatic fallback to demo UI if external HTML file is not created yet
      container.innerHTML = `
        <div class="demo-card">
          <div class="demo-icon">
            <i data-lucide="layout-grid"></i>
          </div>
          <h2 class="demo-title">${route.title} Screen</h2>
          <p class="demo-desc">${route.description}</p>
          <span class="demo-tag">Status: Demo View Active</span>
        </div>
      `;
    } finally {
      // Re-run lucide icons every time a view changes
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  }
}

// Router Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // CRITICAL: Render static sidebar/header icons on initial page boot
  if (window.lucide) {
    lucide.createIcons();
  }

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageKey = link.getAttribute("data-page");
      if (pageKey) {
        window.location.hash = pageKey;
      }
    });
  });

  window.addEventListener("hashchange", () => {
    const routeName = window.location.hash.replace("#", "") || "dashboard";
    renderScreen(routeName);
  });

  const initialRoute = window.location.hash.replace("#", "") || "dashboard";
  renderScreen(initialRoute);
});