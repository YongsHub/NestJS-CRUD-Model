import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Board, BoardStatus } from './board.Model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardService:BoardsService) {}//접근 제한자를 지정하면 인수가 클래스의 property로 지정된다.
    
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id', ParseIntPipe) id : number): Board {
        return this.boardService.getBoardById(id);
    }

    @Post('/')
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id : number) : void {
        this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id', ParseIntPipe) id: number, @Param('status') status: BoardStatus) : Board {
        return this.boardService.updateBoardStatus(id, status)
    }
}
