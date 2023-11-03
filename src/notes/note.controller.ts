import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Note } from 'src/notes/entities/Note.entity';
import { NotesServices } from 'src/notes/notes.service';
import { NoteDto } from './dto/note.dto';
  
  
@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesServices) {}
  
    @Get()
    async findAll() {
      return await this.notesService.getNotes();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) noteid: number) {
      return await this.notesService.getNote(noteid);
    }
  
    @Post() 
    async create(@Body() noteDto: NoteDto) {
      return await this.notesService.createNote(noteDto);
    }
  
    @Patch(':id')
    async editNote(@Body() noteDto: NoteDto, @Param('id') noteid: number) {
      const noteEdited = await this.notesService.editNote(noteid, noteDto);
      return noteEdited;
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) noteid: number) {
      await this.notesService.deleteNote(noteid);
    }
  }