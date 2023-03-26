import { Observable } from 'rxjs';

export interface IModal<T> {
  acceptText: string;
  getComponent(): any;
  acceptClick(): Observable<T>;
  closeClick(): Observable<T>;
  close(): void;
  hide(): Observable<T>;
  createComponent(component: any, data: any): void;
}
