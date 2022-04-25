import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.Model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string): Board {
        const board: Board = {
            id: uuid(), // unique한 게시판 id값
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board;
    }
}
