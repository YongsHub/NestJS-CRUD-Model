import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './board.Model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidation } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardService:BoardsService) {}//접근 제한자를 지정하면 인수가 클래스의 property로 지정된다.
    
    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id', ParseUUIDPipe) id : string): Board {
        return this.boardService.getBoardById(id);
    }

    @Post('/')
    @UsePipes(ValidationPipe) // 유효성 검사 Pipe (@Post, @Get, @Patch와 같은 Handler - level Pipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseUUIDPipe) id : string) : void {
        this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id', ParseUUIDPipe) id: string, @Body('status', BoardStatusValidation) status: BoardStatus) : Board {
        return this.boardService.updateBoardStatus(id, status)
    }
}
