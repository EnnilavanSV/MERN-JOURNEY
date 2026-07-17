export const stats = [
  {
    id: 1,
    label: "Total Revenue",
    value: "$48,295",
    change: "+12%",
    positive: true,
    icon: "💰",
  },
  {
    id: 2,
    label: "Total Users",
    value: "3,842",
    change: "+8%",
    positive: true,
    icon: "👥",
  },
  {
    id: 3,
    label: "Total Orders",
    value: "1,429",
    change: "+23%",
    positive: true,
    icon: "📦",
  },
  {
    id: 4,
    label: "Refund Rate",
    value: "2.4%",
    change: "+0.8%",
    positive: false,
    icon: "↩️",
  },
];

export const revenueData = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 5800 },
  { day: "Wed", revenue: 3900 },
  { day: "Thu", revenue: 7200 },
  { day: "Fri", revenue: 6100 },
  { day: "Sat", revenue: 8900 },
  { day: "Sun", revenue: 5400 },
];

export const ordersData = [
  { category: "Frontend", orders: 42 },
  { category: "Backend", orders: 31 },
  { category: "Fullstack", orders: 28 },
  { category: "DevOps", orders: 19 },
  { category: "Design", orders: 15 },
];

export const recentOrders = [
  {
    id: 1,
    product: "React Dashboard",
    buyer: "Arjun K",
    amount: 49,
    status: "completed",
  },
  {
    id: 2,
    product: "Node API Kit",
    buyer: "Priya M",
    amount: 29,
    status: "completed",
  },
  {
    id: 3,
    product: "Tailwind UI Kit",
    buyer: "Ravi S",
    amount: 19,
    status: "pending",
  },
  {
    id: 4,
    product: "TypeScript Guide",
    buyer: "Meera R",
    amount: 35,
    status: "completed",
  },
  {
    id: 5,
    product: "Docker for Devs",
    buyer: "Kiran T",
    amount: 45,
    status: "refunded",
  },
];

export const summaryText = `
DevMarket Analytics Summary:
- Total Revenue: $48,295 (up 12% from last month)
- Active Users: 3,842 (up 8%)
- Total Orders: 1,429 (up 23%)
- Refund Rate: 2.4% (slightly up — monitor this)
- Best day this week: Saturday with $8,900 revenue
- Top category: Frontend products with 42 orders
- Recent trend: Strong growth in backend tools`;
