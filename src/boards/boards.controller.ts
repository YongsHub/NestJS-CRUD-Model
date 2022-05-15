import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { identity } from 'rxjs';
import { GetUser } from 'src/auth/get-user.decorators';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidation } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardService:BoardsService) {}//접근 제한자를 지정하면 인수가 클래스의 property로 지정된다.
    
    @Get()
    getAllBoards(
        @GetUser() user: User
    ): Promise<Board[]>{
        return this.boardService.getAllBoards(user);
    }
    
    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto : CreateBoardDto,
    @GetUser() user: User) : Promise<Board> {
        return this.boardService.createBoard(createBoardDto, user);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id : number) : Promise<void> {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id : number,
        @Body('status', BoardStatusValidation) status: BoardStatus
    ){
        return this.boardService.updateBoardStatus(id, status);
    }
    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards();
    // }

    // @Get('/:id')
    // getBoardById(@Param('id', ParseUUIDPipe) id : string): Board {
    //     return this.boardService.getBoardById(id);
    // }

    // @Post('/')
    // @UsePipes(ValidationPipe) // 유효성 검사 Pipe (@Post, @Get, @Patch와 같은 Handler - level Pipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardService.createBoard(createBoardDto);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id', ParseUUIDPipe) id : string) : void {
    //     this.boardService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(@Param('id', ParseUUIDPipe) id: string, @Body('status', BoardStatusValidation) status: BoardStatus) : Board {
    //     return this.boardService.updateBoardStatus(id, status)
    // }
}
