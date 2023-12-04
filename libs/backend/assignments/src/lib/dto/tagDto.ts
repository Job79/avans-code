import {ITag} from "@avans-code/shared/domain";
import {IsString} from "class-validator";

export class TagDto implements ITag {
    @IsString()
    name!: string;
}
