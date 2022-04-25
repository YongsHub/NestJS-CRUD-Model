import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './board.Model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private boardService:BoardsService) {}//접근 제한자를 지정하면 인수가 클래스의 property로 지정된다.
    
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post('/')
    createBoard(
        @Body('title') title: string,
        @Body('description') description: string
    ): Board {
        return this.boardService.createBoard(title, description);
    }
}
