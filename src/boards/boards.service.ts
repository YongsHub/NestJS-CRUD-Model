import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.Model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto : CreateBoardDto): Board {
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuid(), // unique한 게시판 id값
            title,
            description, 
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board;
    }

    getBoardById(id : number) : Board {
        return this.boards.find((board) => board.id === id)
    }

    deleteBoard(id : number) : void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id : number, status: BoardStatus) : Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
