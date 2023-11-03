import { Module } from '@nestjs/common';
import { NotesServices } from 'src/notes/notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/notes/entities/Note.entity';
import { NotesController } from 'src/notes/note.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NotesServices],
  controllers: [NotesController],
})
export class NotesModule {}