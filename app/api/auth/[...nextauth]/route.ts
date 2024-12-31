import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const baseUrl = "http://localhost:3000"; // Ubah sesuai dengan URL base API Anda

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "your@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Kirimkan kredensial ke endpoint API Anda
                    const response = await axios.post(`${baseUrl}/api/public/auth/login/credential`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    const user = response.data;

                    // Jika API berhasil mengembalikan user
                    if (user && user.access_token) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            accessToken: user.access_token,
                        };
                    }
                    return null; // Return null jika login gagal
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt", // Gunakan JWT untuk sesi
    },
    jwt: {
        secret: process.env.JWT_SECRET, // Pastikan Anda sudah memiliki SECRET di .env
    },
    callbacks: {
        async jwt({ token, user }) {
            // Tambahkan accessToken ke JWT jika user ada
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Tambahkan accessToken ke session
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id,
                    accessToken: token.accessToken,
                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login", // Halaman login custom (opsional)
    },
});

export { handler as GET, handler as POST };
