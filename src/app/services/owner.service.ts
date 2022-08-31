import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const url4=environment.basePath+"owner";
  
@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http:HttpClient) { }
  getOwners(){
    return this.http.get<any[]>(`${url4}`);
  }
  newOwner(data:any){
    return this.http.post(`${url4}`,data);
  }
  updateOwner(id:any,data:any){
    return this.http.put(`${url4}/${id}`,data);
  }
  deleteOwner(id:any){
    return this.http.delete(`${url4}/${id}`);
  }
}
