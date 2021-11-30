import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [{ field: "email", message: "not email" }];
  }

  if (options.username.includes("@")) {
    return [{ field: "username", message: "cannot includ @" }];
  }

  if (options.username.length <= 2) {
    return [{ field: "username", message: "user should be longer" }];
  }
  if (options.password.length <= 3) {
    return [{ field: "password", message: "small password" }];
  }

  return null;
};
