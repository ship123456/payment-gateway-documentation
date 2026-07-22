const STORAGE_KEY = "payments";

const defaultPayments = [
  {
    id: "PAY-1001",
    customer: "John Doe",
    email: "admin@payflow.com",
    phone: "9876543210",
    amount: 2500,
    currency: "INR",
    paymentMethod: "UPI",
    status: "Success",
    orderId: "ORD-1001",
    date: "2026-07-20",
    description: "Laptop Purchase",
  },
  {
    id: "PAY-1002",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "9876543211",
    amount: 1800,
    currency: "INR",
    paymentMethod: "Card",
    status: "Pending",
    orderId: "ORD-1002",
    date: "2026-06-18",
    description: "Phone Accessories",
  },
  {
    id: "PAY-1003",
    customer: "Michael Brown",
    email: "michael@example.com",
    phone: "9876543212",
    amount: 5200,
    currency: "INR",
    paymentMethod: "Net Banking",
    status: "Failed",
    orderId: "ORD-1003",
    date: "2026-05-10",
    description: "Office Chair",
  },
];

const initializePayments = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPayments));
  }
};

initializePayments();

const getPayments = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const getPaymentById = (id) => {
  return getPayments().find((payment) => payment.id === id);
};
const createPayment = (payment) => {
  const payments = getPayments();

  const newPayment = {
    ...payment,
    id: `PAY-${Date.now()}`,
    status: "Success",
    date: new Date().toISOString().split("T")[0],
  };

  payments.unshift(newPayment);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));

  return newPayment;
};

const deletePayment = (id) => {
  const payments = getPayments();

  const updatedPayments = payments.filter((payment) => payment.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPayments));

  return updatedPayments;
};
const searchPayments = (query) => {
  const payments = getPayments();

  const search = query.toLowerCase();

  return payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(search) ||
      payment.customer.toLowerCase().includes(search) ||
      payment.orderId.toLowerCase().includes(search),
  );
};
const filterPayments = (status) => {
  const payments = getPayments();

  if (!status || status === "All Status") {
    return payments;
  }

  return payments.filter((payment) => payment.status === status);
};

const exportPayments = () => {
  const payments = getPayments();

  const headers = [
    "Payment ID",
    "Customer",
    "Email",
    "Phone",
    "Amount",
    "Currency",
    "Payment Method",
    "Status",
    "Order ID",
    "Date",
    "Description",
  ];

  const rows = payments.map((payment) => [
    payment.id,
    payment.customer,
    payment.email,
    payment.phone,
    payment.amount,
    payment.currency,
    payment.paymentMethod,
    payment.status,
    payment.orderId,
    payment.date,
    payment.description,
  ]);

  const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
    "\n",
  );

  const blob = new Blob([csv], { type: "text/csv" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "payments.csv";

  link.click();

  URL.revokeObjectURL(url);
};
export {
  getPayments,
  getPaymentById,
  createPayment,
  deletePayment,
  searchPayments,
  filterPayments,
  exportPayments,
};
