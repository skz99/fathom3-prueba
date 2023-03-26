import { HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from "@angular/common/http";

interface IHttpEvent {
    type: HttpEventType;
    loaded: number;
    total: number;
}

export interface Upload {
    rawResponse?: any;
    progress: number;
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
    file?: File;
}

export class Asset {
    _id = undefined;
    name: string = '';
    type: string = '';
    size?: number;
    imgUrl: string = '';
    type_file: string = '';
    lastModifiedDate: string = '';
}

export class AssetUpload extends Asset implements Upload {
    progress: number = 0;
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE' = 'PENDING';
    file?: File;
}


function isHttpResponse<T>(event: HttpEvent<T> | IHttpEvent): event is HttpResponse<T> {
    return event.type === HttpEventType.Response;
}

function isHttpProgressEvent(
    event: HttpEvent<unknown> | IHttpEvent
): event is HttpProgressEvent {
    return (
        event.type === HttpEventType.DownloadProgress ||
        event.type === HttpEventType.UploadProgress
    );
}

export const calculateState = (upload: Upload, event: HttpEvent<unknown> | IHttpEvent): Upload => {
    if (isHttpProgressEvent(event)) {
        upload.progress = event.total ? Math.round((100 * event.loaded) / event.total) : upload.progress;
        upload.state = 'IN_PROGRESS';
        return upload;
    }
    if (isHttpResponse(event)) {
        upload.rawResponse = event.body;
        upload.progress = 100;
        upload.state = 'DONE';
        return upload;
    }
    return upload;
};