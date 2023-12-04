import {ICreateTag} from "@avans-code/shared/domain";
import {IsBoolean, IsString, MaxLength, MinLength} from "class-validator";

export class CreateTagDto implements ICreateTag {
  @IsString()
  @MaxLength(32)
  @MinLength(2)
  name!: string;

  @IsString()
  @MaxLength(32)
  @MinLength(2)
  category!: string;

  @IsBoolean()
  isActive!: boolean;
}
