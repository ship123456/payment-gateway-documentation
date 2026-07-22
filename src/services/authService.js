const STORAGE_KEY = "users";
const CURRENT_USER = "currentUser";

const defaultUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "admin@payflow.com",
    password: "password1234",
    phone: "9876543210",
    company: "PayFlow Technologies",
  },
];
const getUsers = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const login = (email, password) => {
  const user = getUsers().find(
    (user) => user.email === email.trim() && user.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const { password: _, ...safeUser } = user;

  localStorage.setItem(CURRENT_USER, JSON.stringify(safeUser));

  return safeUser;
};

const logout = () => {
  localStorage.removeItem(CURRENT_USER);
};

const signup = (userData) => {
  const users = getUsers();

  const exists = users.find(
    (user) => user.email.toLowerCase() === userData.email.trim().toLowerCase(),
  );

  if (exists) {
    throw new Error("Email already exists");
  }
  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    phone: "",
    company: "",
  };

  users.push(newUser);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return newUser;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(CURRENT_USER));
};

const forgotPassword = (email) => {
  const user = getUsers().find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (!user) {
    throw new Error("User not found");
  }

  return true;
};

const resetPassword = (email, currentPassword, newPassword) => {
  const users = getUsers();

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.trim().toLowerCase() &&
      user.password === currentPassword,
  );

  if (!user) {
    throw new Error("Current password is incorrect.");
  }

  const updatedUsers = users.map((user) =>
    user.email.toLowerCase() === email.trim().toLowerCase()
      ? {
          ...user,
          password: newPassword,
        }
      : user,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

  return true;
};

const updateProfile = (userData) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.id === userData.id
      ? {
          ...user,
          ...userData,
        }
      : user,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

  const updatedUser = updatedUsers.find((user) => user.id === userData.id);

  const { password, ...safeUser } = updatedUser;

  localStorage.setItem(CURRENT_USER, JSON.stringify(safeUser));

  return safeUser;
};
export {
  getUsers,
  login,
  logout,
  signup,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  updateProfile,
};
