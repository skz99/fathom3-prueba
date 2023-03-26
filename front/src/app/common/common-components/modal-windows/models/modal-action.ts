import {ModalActions} from './modal-actions.enum';

export class ModalAction {
  action: ModalActions;
  value: any;

  constructor(action: ModalActions, value: any) {
    this.action = action;
    this.value = value;
  }
}
