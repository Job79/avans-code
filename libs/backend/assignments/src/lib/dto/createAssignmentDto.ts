import {ICreateAssignment, INiveau, ITag, Niveaus} from "@avans-code/shared/domain";
import {IsArray, IsBoolean, IsIn, IsString, ValidateNested} from "class-validator";

export class CreateAssignmentDto implements ICreateAssignment {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsBoolean()
  isPublic!: boolean;

  @IsString()
  programmingLanguage!: string;

  @IsString()
  templateCode!: string;

  @IsString()
  testCode!: string;

  @IsIn(Niveaus)
  niveau!: INiveau;

  @IsArray()
  @ValidateNested({each: true})
  tags!: ITag[];
}
