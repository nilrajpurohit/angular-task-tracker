import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'; 
import  {Task} from '../../Task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks:Task[] = [];

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((res)=>{
      this.tasks = res;
    },
    (err)=>{
      console.log(err);
      // alert(JSON.stringify(err));
    });
  }

  deleteTask(task:Task){
    this.taskService.deleteTask(task).subscribe((res)=>{
      this.tasks = this.tasks.filter(t=>t.id != task.id)
    });
  }

  toggleReminder(task:Task){
    task.reminder = !task.reminder;
    this.taskService.updateToggleReminder(task).subscribe((res)=>{
      console.log(task.reminder)
    })
  }

  addTask(task:Task){
    this.taskService.addTask(task).subscribe((task)=>{
      console.log("Added new task!");
      this.tasks.push(task);
    })
  }
}
