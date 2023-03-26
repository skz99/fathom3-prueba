import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { IModalRef } from '../modal-windows/interfaces/i-modal-ref';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() title: string = '';
  @Input() id: string = '';

  constructor(private globalService: GlobalService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
  }

  OnDeleteUser(modal: IModalRef<any>): Observable<any> {
    return new Observable(observer => {
        this.globalService.deleteUser(this.id).subscribe({
          next: (rtn) => {
            observer.next(rtn);
            modal.close();
          }, error: (error) => {
            console.error(error);
            this.toastr.error(error.error.message, 'Error');
          },
          complete: () => {
            this.toastr.success('Usuario eliminado correctamente')
          }
        })
      })
  }
}
