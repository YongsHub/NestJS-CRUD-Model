import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository) // board.repository에 존재하는 BoardRepository를 사용할수 있도록 Inject
        private boardRepository : BoardRepository
    ) {}
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto : CreateBoardDto): Board {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(), // unique한 게시판 id값
    //         title,
    //         description, 
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board)
    //     return board;
    // }
    async createBoard(createBoardDto : CreateBoardDto, user: User): Promise <Board> {
        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.boardRepository.save(board);
        return board;
    }

    async getAllBoards(user: User): Promise <Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', {userId: user.id});
        const boards = await query.getMany();
        return boards;
    }

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
    // getBoardById(id : string) : Board {
    //     const found : Board = this.boards.find((board) => board.id === id)

    //     if(!found) { // 찾는 idr가 존재하지 않는다면
    //         throw new NotFoundException(`Cannot Fount board with id: ${id}`); // NotFoundException 또한 Nest에서 가지고 있음
    //     }
    //     return found;
    // }

    // deleteBoard(id : string) : void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id : string, status: BoardStatus) : Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}


