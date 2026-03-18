import { db , saveDB } from "../DB/data";


type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

 type loginInput = {
  email: string
  password:string

}

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
  db.users.push(newUser);
  saveDB();
  console.log("Users after signup:", db.users);
  return newUser;
};


