export interface Paginate <T>{
    data: T;
    pagination: {
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean,
        hasPreviousPage: boolean,
      }
}