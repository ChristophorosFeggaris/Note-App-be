import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { NoteDto } from '../dto/note.dto';

@Entity({name: 'note'})
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  noteid: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  title: string;

  @Column()
  @MinLength(1)
  @IsString()
  description: string;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({name: 'userid'})
  user: User;

  toDto(): NoteDto {
    const noteDto = new NoteDto();
    noteDto.title = this.title;
    noteDto.description = this.description;

    return noteDto;
  }
}