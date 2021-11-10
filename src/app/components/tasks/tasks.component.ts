import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  tasks: Task[]=[];
  resulttasks :Task[]=[];
  mytask :any ={
    label:"",
    completed:false
  }
  editForm=false;
  showForm=false;
  searchtext='';

  constructor(private taskservice:TaskService) { }

  ngOnInit(): void {
    this.gettasks();
  }

  gettasks(){
    this.taskservice.findall()
    .subscribe((response : any) => { 
      this.tasks= this.resulttasks=response
    }
      );
  }
  deletetask(id:any){
    this.taskservice.delete(id).subscribe(()=>{
      this.tasks=this.tasks.filter(task => task.id!=id)
    });
  }

  addtask(){
    this.taskservice.add(this.mytask).subscribe((task:any)=>{
      this.tasks=[task,...this.tasks];
      this.resetmytask();
      this.showForm=false;
 
    })
  }
  resetmytask(){
    this.mytask={
      label:"",
      compleled:false
    }
  }
  completed(task:any){
    this.taskservice.completed(task.id,task.completed)
    .subscribe(()=>{
      task.completed=!task.completed;
    })
  }
  edittask(task:Task){
    this.mytask=task;
    this.editForm=true;
  }
  updatetask(){

    this.taskservice.update(this.mytask).subscribe(()=>{

      this.resetmytask();
      this.editForm=false; 
      this.showForm=false;
    })

  }
  searchtasks(){
    this.resulttasks=this.tasks.filter((task)=> task.label.toLowerCase().includes(this.searchtext.toLowerCase()));
  }
}
