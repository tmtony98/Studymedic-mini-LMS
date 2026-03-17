import { db , saveDB } from "../DB/data";
import { generateToken } from "@/lib/auth";


type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export const register = async (data: RegisterInput) => {
  await new Promise((res) => setTimeout(res, 500));
  const email = data.email.toLowerCase().trim();

  // 🔍 check if user exists
  const existingUser = db.users.find((u) => u.email === email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: Date.now(),
    name: data.name.trim(),
    email,
    password: data.password, // (plain for test)
  };

  // ✅ update db
  db.users.push(newUser);

  // ✅ persist to localStorage
  saveDB();

  // 🧠 debug (optional)
  console.log("Users after signup:", db.users);

  return newUser;
};

export const login = async (data: any) => {
  await new Promise((res) => setTimeout(res, 500));

  const user = db.users.find(
    (u) => u.email === data.email && u.password === data.password,
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};
