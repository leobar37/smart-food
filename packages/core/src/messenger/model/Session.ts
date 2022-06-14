import { OrderHandler } from './Order';
export class Task {
  completed: boolean;
  id: string;
  constructor(id: string) {
    this.completed = false;
    this.id = id;
  }
  complete() {
    this.completed = true;
  }
}

export class ClientSession {
  userId: string;
  store: Map<any, any>;
  tasks: Task[];
  constructor(userId: string) {
    this.userId = userId;
    this.store = new Map();
    this.tasks = [];
  }
  addTask(task: Task): void {
    this.tasks.push(task);
  }
  removeTask(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);
  }
  getNextTask(): Task {
    return this.tasks.filter((task) => !task.completed).reverse()[0];
  }
  getOrderHandler(): OrderHandler {
    return this.store.get('ORDER');
  }
  storeOrder(order: OrderHandler): void {
    this.store.set('ORDER', order);
  }
}
