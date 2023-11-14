export interface PaginatedResponse<T> {
  data: T[];
  totalRecords: number;
  totalPage: number;
}
