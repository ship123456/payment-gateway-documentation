const STORAGE_KEY = "profile";

const defaultProfile = {
  fullName: "Shipra",
  email: "admin@payflow.com",
  phone: "+91 9876543210",
  company: "PayFlow Pvt. Ltd.",
  billingEmail: "billing@payflow.com",
  address: "New Delhi, India",
  gst: "07ABCDE1234F1Z5",
  currency: "INR",
};

const initializeProfile = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile));
  }
};

initializeProfile();

const getProfile = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

const updateProfile = (data) => {
  const updated = {
    ...getProfile(),
    ...data,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
};
export { getProfile, updateProfile };
