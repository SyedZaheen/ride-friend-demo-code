import auth0 from "../../utils/auth0";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        return { ...session };
      },
      redirectTo: "/",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}