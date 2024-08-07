import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import usersDb from "../../../../usersDb.json";

type Users = {
  id: string;
  name: string;
  email: string;
  role: string;
};

// type Credentials = {
//   email: string;
//   password: string;
// };

const users: Users[] = usersDb as Users[];

const allUsersEmails = users?.map((user) => user.email);

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const userExists = allUsersEmails.includes(credentials.email);

        if (userExists && credentials.password === "123456") {
          const userData = users.find(
            (user) => user.email === credentials.email
          );
          if (userData) {
            return userData;
          }
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
