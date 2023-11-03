import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class NoteDto {
    
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(150)
    @IsString()
    title: string;

  
    @IsNotEmpty()
    @MinLength(1)
    @IsString()
    description: string;

  
}