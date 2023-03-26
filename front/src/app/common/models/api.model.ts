export const PAGE_SIZE = 25;

export class ApiResponse<T> {
    data: T[] = [];
    success: boolean = false;
    message?: string = undefined;
    total_count: number = 0;
    status: number = 0;
    total_filter: number = 0;
    extra: any;
}

export class ApiRequest {
    sort: string = '';
    filters: any;
    page: number = 1;
    page_size: number = PAGE_SIZE;
    data: any;
}