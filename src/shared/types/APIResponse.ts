export interface APIResponse {
  status: boolean;
  data: { [keyof: string]: unknown };
}
