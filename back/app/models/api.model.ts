export const UNLIMITED_PAGE_LIMIT = 999999;

export class IWebserviceParams {
    xUser?: string;
    xUserId?: string;
    xAccountId?: string;
    xLang?: string;
    xModules?: string[];
}

export class ApiRequest {
    sort: string = ''; 
    filters: any;
    page: number = 1;
    page_size: number = 25;
    data: any;
}

export class ApiResponse<T> {
    data: T[] = [];
    success: boolean = false;
    message?: string = undefined;
    status: number = 200;
    total_count: number = 0;
    total_filter: number = 0;
    extra: any;
}