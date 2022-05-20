import cookie from "cookie";
// Admin Login Using Previously Defined Credentials in the .env file
const handler = (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (
      // Checking for Correct Credentials
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Cookie to keep Admin logged in, Cookie will expire after 60 minutes
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("Successfully Logged In");
    } else {
      res.status(400).json("Username or Password Incorrect");
    }
  }
};

export default handler;