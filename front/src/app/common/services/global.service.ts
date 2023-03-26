import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { ApiRequest, ApiResponse } from "../models/api.model";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private apiService: ApiService) { }

  // USER FUNCTIONS

  getUsers(): Observable<ApiResponse<User>> {
    const url = 'api/users/list-users';
    return this.apiService.get(url);
  }

  addUser(user: User) {
    const url = 'api/users/add';
    return this.apiService.post(url, user);
  }

  editUser(user: User) {
    const url = 'api/users/update/' + user.id;
    return this.apiService.put(url, user);
  }

  deleteUser(id: string) {
    const url = 'api/users/delete/' + id;
    return this.apiService.delete(url, id);
  }

  comparePasswords(request: ApiRequest) {
    const url = 'api/user/compare-password';
    return this.apiService.post(url, request)
  }

}