import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository) {
    }

    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" is not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);
        console.log(result); // affected: 1 if present else 0
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} is not found`);
        }
    }

    async updateTask(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        
        return task;
    }
    
    //private tasks: Task[] = [];

    /*
    getAllTasks(): Task[] {
        return this.tasks;
    }
    
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
    

        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks(); // copy
        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                return false;
            });
        }

        return tasks;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTask(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
    */
}
