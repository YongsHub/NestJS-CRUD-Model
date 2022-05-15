import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['username']) // 유저 이름의 중복을 막기 위해서
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Board, board => board.user, {eager: true}) // eager : true 는 보드까지 같이 가져올 수 있다. 또한 board의 type은 Board로서, Board에서 board.user로 이 엔티티가 불린다.
    boards: Board[]
}