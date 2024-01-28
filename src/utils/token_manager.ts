import jwt from "jsonwebtoken";

const create_token = (id: string, email: string, expiry) => {
  try {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });
    return token;
  } catch (err) {
    console.log(err);
    return;
  }
};

export { create_token };
