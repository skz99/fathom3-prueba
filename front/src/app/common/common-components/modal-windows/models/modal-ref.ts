import {Observable} from 'rxjs';
import {IModalRef} from '../interfaces/i-modal-ref';
import {IModal} from '../interfaces/i-modal';


export class ModalRef<T> implements IModalRef<T> {

  modal;

  constructor(modal: IModal<T>) {
    this.modal = modal;
  }

  getComponent(): T {
    return this.modal.getComponent();
  }

  close(): void {
    this.modal.close();
  }

  afterClose(): Observable<T> {
    return this.modal.closeClick();
  }

  afterAccept(): Observable<T> {
    return this.modal.acceptClick();
  }
}
