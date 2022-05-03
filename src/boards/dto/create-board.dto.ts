import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    // 유효성 검사 Board라는 Dto를 생성할 때 IsNotEmpty() 파이프를 이용.
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description : string;
}