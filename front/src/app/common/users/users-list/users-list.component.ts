import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { BUTTONS } from 'src/app/common/translates/button.translate';
import { INVITATIONS, USER, USER_MESSAGES } from 'src/app/common/translates/user.translate';
import { DeleteComponent } from '../../common-components/delete/delete.component';
import { ModalConfig } from '../../common-components/modal-windows/models/modal-config';
import { ModalType } from '../../common-components/modal-windows/models/modal-type.enum';
import { ModalService } from '../../common-components/modal-windows/services/modal.service';
import { ApiRequest } from '../../models/api.model';
import { User } from '../../models/user.model';
import { GlobalService } from '../../services/global.service';
import { UsersAddComponent } from '../users-add/users-add.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  // Classes
  users: User[] = [];

  // Enums
  BUTTONS = BUTTONS;
  USER = USER;
  USER_MESSAGES = USER_MESSAGES;
  INVITATIONS = INVITATIONS;

  // Numbers
  statusPetition: number = 0;

  // Search engine
  search = new Subject<string>();
  searchSubscription = new Subscription();
  searchTerm: string = '';
  searchTermCount: number = 0;

  // Pagination
  currentPage: number = 1;
  totalItems: number = 0;
  totalFilters: number = 0;
  totalChecked: number = 0;

  // Booleans
  isLoadingTable: boolean = false;
  isSearchedByText: boolean = false;
  selectAll: boolean = false;

  sort: string = '';

  // Table
  columns = [
    { title: 'USER.USERNAME', field: 'username', sortable: true, width: 200 },
    { title: 'USER.TYPE', field: 'type', sortable: true, width: 200 },
    { title: 'USER.CREATED_DATE', field: 'dateRegister', sortable: true },
  ]

  selectedColumns = this.columns;

  constructor(
    private globalService: GlobalService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private modalService: ModalService
  ) {
    this.searchSubscription = this.search.pipe(debounceTime(200)).subscribe(term => {
      this.searchTerm = term;
      this.refreshUsers();
    })
  }

  ngOnInit(): void {
    this.refreshUsers();
  }

  refreshUsers() {
    this.isLoadingTable = true;
    this.globalService.getUsers().subscribe({
      next: (rtn) => {
        this.users = rtn.data;
        this.totalFilters = rtn.total_filter;
        this.totalItems = rtn.total_count;
        this.statusPetition = rtn.status;
      },
      error: (error) => {
        console.error(error)
        this.statusPetition = error.status;
        this.isLoadingTable = false;
      },
      complete: () => {
        this.isLoadingTable = false;
      }
    })
  }

  addOrEditUser(user?: User) {
    const config = new ModalConfig();
    config.component = UsersAddComponent;
    config.modalType = ModalType.NORMAL;
    config.title = 'USER.ADD';
    config.data = {};
    if (user) {
      config.title = 'USER.EDIT';
      config.data = { user: user };
    }
    const modalRef = this.modalService.open<UsersAddComponent>(config);
    modalRef.afterAccept().subscribe({
      next: (component: UsersAddComponent) => {
        component.addorEditUser(modalRef).subscribe({
          next: (user) => {
            this.refreshUsers();
            if (user) {
              this.toastr.success("Usuario editado correctamente");
            } else {
              this.toastr.success("Usuario creado correctamente");
            }
          }
        })
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {

      }
    })
  }

  deleteUser(user: User) {
    const config = new ModalConfig();
    config.component = DeleteComponent;
    config.modalType = ModalType.NORMAL;
    config.title = 'USER.DELETE';
    config.data = { id: user.id, title: '¿Estas seguro de eliminar el usuario seleccionado?'};
    const modalRef = this.modalService.open<DeleteComponent>(config)
    modalRef.afterAccept().subscribe({
      next: (deleteComponent: DeleteComponent) => {
        deleteComponent.OnDeleteUser(modalRef).subscribe();
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        this.refreshUsers();
      }
    })
  }
}
