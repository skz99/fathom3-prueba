import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IModal } from '../interfaces/i-modal';
import { IModalRef } from '../interfaces/i-modal-ref';
import { MenuRightComponent } from '../menu-right/menu-right.component';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig } from '../models/modal-config';
import { ModalRef } from '../models/modal-ref';
import { of } from 'rxjs';
import { mergeAll, take } from 'rxjs/operators';
import { ModalType } from '../models/modal-type.enum';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef) {

  }

  open<T>(modalConfig: ModalConfig): IModalRef<T> {
    if ([ModalType.NORMAL, ModalType.WIDE].includes(modalConfig.modalType)) {
      const modalBsConfig = new ModalOptions();
      modalBsConfig.initialState = {};
      if (modalConfig.modalType === ModalType.NORMAL) {
        modalBsConfig.class = 'modal-dialog-centered';
      } else {
        modalBsConfig.class = 'modal-lg modal-dialog-centered';
      }

      const obj = modalBsConfig.initialState as any;
      obj.title = modalConfig.title;
      obj.subtitle = modalConfig.subtitle;
      obj.isWithfooter = modalConfig.isWithfooter;
      obj.onlyCancel = modalConfig.onlyCancel;

      modalBsConfig.ignoreBackdropClick = true;

      const ref = this.modalService.show(ModalComponent, modalBsConfig);
      const modal = ref.content as IModal<T>;
      const modalRef = new ModalRef<T>(modal);
      modal.createComponent(modalConfig.component, modalConfig.data || {});
      return modalRef;
    } else {
      const ref = this.showAsComponent(modalConfig);
      const modalRef = new ModalRef<T>(ref.instance);
      ref.instance.createComponent(modalConfig.component, modalConfig.data || {});
      return modalRef;
    }
  }

  // Previous dynamic-loading method required you to set up infrastructure
  // before adding the popup to the DOM.
  private showAsComponent(modalOptions: ModalConfig): any {
    // Create element
    const menuElement = document.createElement('cvc-menu-right');

    // Create the component and wire it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(MenuRightComponent);
    const popupComponentRef = factory.create(this.injector, [], menuElement);

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(popupComponentRef.hostView);

    // Listen to the close event
    of(popupComponentRef.instance.hide())
      .pipe(mergeAll(), take(1))
      .subscribe(() => {
        document.body.removeChild(menuElement);
        this.applicationRef.detachView(popupComponentRef.hostView);
      });

    popupComponentRef.instance.title = modalOptions.title;
    document.body.appendChild(menuElement);
    return popupComponentRef;
  }
}
