import { Component, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string = '';
  day: string = '';
  reminder: boolean = false;
  error: string = '';
  showAddTask: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  onSubmit() {
    if (!this.text) {
      this.error = 'Please enter a task name';
    } else if (!this.day) {
      this.error = 'Please enter a day and time';
    } else {
      const newTask = {
        text: this.text,
        day: this.day,
        reminder: this.reminder,
      };

      this.onAddTask.emit(newTask);

      this.error = '';
      this.text = '';
      this.day = '';
      this.reminder = false;

      this.uiService.toggleAddTask();
    }
  }
}
