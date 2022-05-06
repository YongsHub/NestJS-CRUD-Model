import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board.Model";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() // 기본키
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;
}