import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status-enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById( @Param('id') id:string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Promise<Task> {
        return this.tasksService.updateTask(id, status);
    }

    /* 
    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilter(filterDto);
        }
        else {
            return this.tasksService.getAllTasks();
        }
    }

    @Post()
    // createTask(@Body() body) {
    //     console.log('body', body);
    // }
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    //http://localhost:3000/tasks/ {id}
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById( @Param('id') id:string): void {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTask(id, status);
    }
    */
}
