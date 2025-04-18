export interface PaginateResult<T> {
  data: T[];
  total: number;
  page?: number;
  pageSize?: number;
}
