const API_URL = "https://productivityapp-f1i3.onrender.com";

export const signup = async (username, email, password) => {
  const res = await fetch(`${API_URL}/auth/signup`, {  // <-- /auth added
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const text = await res.text(); // fallback for HTML error pages
    throw new Error(`Signup failed: ${text}`);
  }

  return res.json();
};
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {  // <-- /auth added
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Login failed: ${text}`);
  }

  return res.json();
};