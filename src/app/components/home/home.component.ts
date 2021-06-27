import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TodoService} from "../../services/todo.service";
import {faTrash} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  faTrash = faTrash;

  public todos2: Array<any> = [];
  public todos: Array<any> = [];
  counter: any = 0;

  selections = [
    {value: 'completed', viewValue: 'completed'},
    {value: 'uncompleted', viewValue: 'uncompleted'},
    {value: 'all', viewValue: 'all'}
  ];

  constructor(
    private todoService: TodoService
  ) {
  }

  ngOnInit(): void {
    this.getAllTodos();
    // this.setItems();
  }

  drop(event: CdkDragDrop<string[]>) {
    // @ts-ignore
    moveItemInArray(this.todos2, event.previousIndex, event.currentIndex);
  }

  // @ts-ignore
  addTodo(newTodo: any) {
    this.findIndex();
    this.todos2.push({id: this.counter, userId: 1, title: newTodo.value, completed: false});
    newTodo.value = '';
    this.todos = this.todos2;
    localStorage.setItem('todos', JSON.stringify(this.todos2));
  }

  // @ts-ignore
  setItems() {
    // @ts-ignore
    if (!localStorage.getItem('todos')) {
      localStorage.setItem('todos', JSON.stringify(this.todos2));
    } else {
      this.todos2 = JSON.parse(<string>localStorage.getItem('todos'));
    }
  }

  getAllTodos() {
    this.todoService.getAllTodos().toPromise().then(data => {
      if (!localStorage.getItem('todos')) {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            // @ts-ignore
            this.todos2.push(data[key])
          }
        }
        localStorage.setItem('todos', JSON.stringify(this.todos2));
      } else {
        this.todos2 = JSON.parse(<string>localStorage.getItem('todos'));
      }
      this.todos = this.todos2;
      this.findIndex();
    })
  }

  findIndex() {
    let index = -1;
    this.todos2.map((v, i) => {
      if (v.id >= index) {
        index = v.id
        this.counter = v.id + 1;
      }
    })
  }


  deleteTodo(id: number, todo: any) {
    // @ts-ignore
    this.todos2 = this.todos2.filter((v, i) => i !== id)
    this.todos = this.todos2;
    localStorage.setItem('todos', JSON.stringify(this.todos2));
    todo.value="";
  }

  searchTodo(todo: any) {  //Arama
    this.todos = this.todos2.map((v, i) => {
      if (v.title.includes(todo.value)) {
        return v;
      }
    })
    // todo.value = "";
  }

  sortTodo() { //sirala
    // @ts-ignore
    this.todos.sort((a, b) => (a.title > b.title) ? 1 : -1)
  }

  // @ts-ignore
  onChange(deviceValue: any, todo: any) {  //filtrele
    // this.todos = this.todos2;
    if (deviceValue.value == 'completed') {
      // @ts-ignore
      this.todos = this.todos2.filter((v, i) => {
        if (v.completed == true && v.title.includes(todo.value))
          return v;
      })
    }
    if (deviceValue.value == 'uncompleted') {
      // @ts-ignore
      this.todos = this.todos2.filter((v, i) => {
        if (v.completed == false && v.title.includes(todo.value))
          return v;
      })
    }
    if (deviceValue.value == 'all') {
      this.todos = this.todos2;
    }
  }


}
