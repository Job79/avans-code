import {ICreateSolution} from "@avans-code/shared/domain";
import {IsString} from "class-validator";

export class CreateSolutionDto implements ICreateSolution {
    @IsString()
    code!: string;
}
