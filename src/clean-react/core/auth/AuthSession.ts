export type AuthSession = {
    user: { email?: string; name?: string } | null;
    token: string | null;
};
