import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiurl="http://localhost:5000/tasks";
  constructor(private  http:HttpClient ) { }

  findall(){
   return this.http.get(this.apiurl);
  }
  delete(id:any ){
    return this.http.delete(`${this.apiurl}/${id}`);
  }

  add(task:Task){
    return this.http.post(this.apiurl,task);
  }
  completed(id:any,completed:boolean){
    return this.http.patch(`${this.apiurl}/${id}`,{completed:!completed});
  }

  update(task:any){
    return this.http.put(`${this.apiurl}/${task.id}`,task)
  }
}
