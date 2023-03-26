import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { IModal } from '../interfaces/i-modal';
import {ModalActions} from '../models/modal-actions.enum';
import {ModalHostDirective} from '../models/modal-host.directive';
import {ModalConfig} from '../models/modal-config';

@Component({
  selector: 'app-menu-right',
  templateUrl: './menu-right.component.html',
  styleUrls: ['./menu-right.component.scss']
})
export class MenuRightComponent<T> implements OnInit, IModal<T> {
  @ViewChild(ModalHostDirective, {static: true}) host?: ModalHostDirective;
  @Input() title = '';
  @Input() subtitle = '';

  opened = false;

  acceptSubject = new Subject<T>();
  closeSubject = new Subject<T>();
  hideSubject = new Subject<T>();

  component: any = null;
  config?: ModalConfig;
  acceptText = '';

  constructor(public componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.opened = true;
    }, 0);
  }

  open(): void {

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
    this.opened = false;
    setTimeout(() => {
      this.hideSubject.next(this.component);
    }, 333);
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
