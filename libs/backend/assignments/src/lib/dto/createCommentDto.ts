import {ICreateComment} from "@avans-code/shared/domain";
import {IsString} from "class-validator";

export class CreateCommentDto implements ICreateComment {
  @IsString()
  message!: string;
}
