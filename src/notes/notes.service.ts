import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "src/notes/entities/Note.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { NoteDto } from "./dto/note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesServices {
    constructor(
        @InjectRepository(Note) private notesRepository: Repository<Note>,
    ) {}

    async getNotes(): Promise<NoteDto[]> {
        const notes = await this.notesRepository.find();
        return notes.map((note) => note.toDto());
    }

    async getNote(noteid: number): Promise<NoteDto> {
        const note = await this.notesRepository.findOne({where: {noteid}});
        if(!note) {
            throw new NotFoundException(`Note with ID ${noteid} not found`);
        }

        return note.toDto();
    }

    async createNote(noteDto: NoteDto): Promise<NoteDto> {
        const newNote = await this.notesRepository.create(noteDto);

        return await this.notesRepository.save(newNote);
    }

    async deleteNote(noteid: number): Promise<NoteDto> {
        const note = await this.notesRepository.findOne({where: {noteid}});
        if(!note) {
            throw new NotFoundException(`Note with ID ${noteid} not found`);
        } 
        const removedNote = await this.notesRepository.remove(note);
        return removedNote.toDto();
    }

    async editNote(noteid: number, updateNoteDto: UpdateNoteDto): Promise<NoteDto>{
        let note = await this.notesRepository.findOne({where: {noteid}});
        if (!note) {
            throw new NotFoundException('Note is not found');
        }
        // (await editedNote).description = note.description;
        // (await editedNote).title = note.title;
        // await (await editedNote).save();
        // console.log('From service:',editedNote);
        note = Object.assign(note, updateNoteDto);
        const updatedNote = await this.notesRepository.save(note);

        return updatedNote.toDto();
    } 

}