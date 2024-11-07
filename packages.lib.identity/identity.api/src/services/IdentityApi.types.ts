export interface IdentityApi {
  getUserId: () => Promise<string>;
}
