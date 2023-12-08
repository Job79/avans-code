import {IUpdateComment} from "@avans-code/shared/domain";
import {IsString} from "class-validator";

export class UpdateCommentDto implements IUpdateComment {
    @IsString()
    message!: string;
}
