export type AuthSession = {
    user: { email: string } | null;
    token: string | null;
};
