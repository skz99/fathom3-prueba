import { ModalOptions } from 'ngx-bootstrap/modal';
import { ModalType } from './modal-type.enum';

export class ModalConfig {
  modalType: ModalType = ModalType.NORMAL;
  component: any;
  data: any;
  title = '';
  subtitle = '';
  isWithfooter: boolean = true;
  onlyCancel?: boolean;
  opciones: ModalOptions = {
    ignoreBackdropClick : true,
    backdrop: 'static'
  };
}
