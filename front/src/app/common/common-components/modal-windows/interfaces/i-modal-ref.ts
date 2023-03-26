import {Observable} from 'rxjs';

export interface IModalRef<T> {
  afterClose(): Observable<T>;
  afterAccept(): Observable<T>;
  close(): void;
  getComponent(): T;
}
