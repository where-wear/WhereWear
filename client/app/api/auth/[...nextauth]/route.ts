// import NextAuth, { NextAuthOptions } from 'next-auth';
// //import GoogleProvider from 'next-auth/providers/google';
// import KakaoProvider from 'next-auth/providers/kakao';

// const handler = NextAuth({
//   pages: {
//     signIn: '/',
//   },

//   providers: [
//     KakaoProvider({
//       clientId: process.env.KAKAO_CLIENT_ID!,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },

//     async session({ session, token }) {
//       session.user = token as any;
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };
