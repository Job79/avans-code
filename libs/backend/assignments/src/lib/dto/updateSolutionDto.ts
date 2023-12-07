import {IUpdateSolution} from "@avans-code/shared/domain";
import {IsString} from "class-validator";

export class UpdateSolutionDto implements IUpdateSolution {
    @IsString()
    code!: string;
}
