const STORAGE_KEY = "supportTickets";

const defaultTickets = [
  {
    id: "TKT-1001",
    subject: "Payment failed",
    category: "Payment Issue",
    priority: "High",
    status: "Open",
    assignedTo: "Support Team",
    created: "2026-07-20",
    description: "Payment failed during checkout.",
  },
  {
    id: "TKT-1002",
    subject: "Refund request",
    category: "Refund",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Support Team",
    created: "2026-07-18",
    description: "Customer requested a refund.",
  },
];

const initializeTickets = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTickets));
  }
};

initializeTickets();

const getTickets = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const createTicket = (ticket) => {
  const tickets = getTickets();

  const newTicket = {
    ...ticket,
    id: `TKT-${Date.now()}`,
    status: "Open",
    assignedTo: "Support Team",
    created: new Date().toISOString().split("T")[0],
  };

  tickets.unshift(newTicket);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));

  return newTicket;
};

const deleteTicket = (id) => {
  const tickets = getTickets();

  const updated = tickets.filter((ticket) => ticket.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
};
const searchTickets = (query) => {
  const search = query.toLowerCase();

  return getTickets().filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(search) ||
      ticket.id.toLowerCase().includes(search),
  );
};
const filterTickets = (status) => {
  if (!status || status === "All Status") {
    return getTickets();
  }

  return getTickets().filter((ticket) => ticket.status === status);
};
export { getTickets, createTicket, deleteTicket, searchTickets, filterTickets };
