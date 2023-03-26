import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { IModal } from '../interfaces/i-modal';
import { ModalHostDirective } from '../models/modal-host.directive';
import { ModalActions } from '../models/modal-actions.enum';
import { BUTTONS } from 'src/app/common/translates/button.translate';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent<T> implements OnInit, OnDestroy, IModal<T> {
  @ViewChild(ModalHostDirective, { static: true }) host?: ModalHostDirective;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() isWithfooter: boolean = true;
  @Input() onlyCancel: boolean = false;


  acceptSubject = new Subject<T>();
  closeSubject = new Subject<T>();
  hideSubject = new Subject<T>();

  component: any;
  acceptText = '';

  //Enums
  BUTTONS = BUTTONS

  constructor(
    private bsModalRef: BsModalRef) {
    }
    
    ngOnInit(): void {
      window.addEventListener("beforeunload", this.detectReload);
      this.bsModalRef.onHidden?.subscribe(() => {
      this.close();
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener("beforeunload", this.detectReload);
  }

  detectReload(e: any) {
    var confirmationMessage = "\o/"
    e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    return confirmationMessage;  
  }

  getComponent(): any {
    return this.component;
  }

  doActions(action: any): void {
    if (action.action === ModalActions.SET_ACCEPT_TEXT) {
      this.acceptText = action.value;
    }
  }

  closeClickInternal(): void {
    this.closeSubject.next(this.component);
    this.close();
  }

  acceptClickInternal(): void {
    this.acceptSubject.next(this.component);
  }

  close(): void {
    this.bsModalRef.hide();
    this.complete();
  }

  complete(): void {
    this.closeSubject.complete();
    this.acceptSubject.complete();
  }

  acceptClick(): Observable<T> {
    return this.acceptSubject.asObservable();
  }

  closeClick(): Observable<T> {
    return this.closeSubject.asObservable();
  }

  hide(): Observable<T> {
    return this.hideSubject.asObservable();
  }

  createComponent(component: any, data: any): void {
    if (component && this.host) {
      this.component = this.host.createComponent(component, data);
    }
  }
}
