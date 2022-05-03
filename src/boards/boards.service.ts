import { Injectable, NotFoundException } from '@nestjs/common';
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
        const found : Board = this.boards.find((board) => board.id === id)

        if(!found) { // 찾는 idr가 존재하지 않는다면
            throw new NotFoundException(`Cannot Fount board with id: ${id}`); // NotFoundException 또한 Nest에서 가지고 있음
        }
        return found;
    }

    deleteBoard(id : number) : void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id : number, status: BoardStatus) : Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
