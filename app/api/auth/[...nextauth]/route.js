import { User } from "@models/user.model";
import { connectToDb } from "@utils/connectdb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log(process.env.GOOGLE_CLIENT_ID);
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},

  async signin({ profile }) {
    try {
      await connectToDb();
      //if user exits
      const userExits = await User.findOne({ email: profile.email });

      // if user not exists
      if (!userExits) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});
export { handler as GET, handler as POST };
