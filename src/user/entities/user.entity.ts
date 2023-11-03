import { IsEmail, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { Note } from "src/notes/entities/Note.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserDto } from "../dto/user.dto";

@Entity({name:'user'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userid: number;

    @Column()
    @IsString()
    firstname: string;

    @Column()
    @IsString()
    lastname: string;

    @Column({unique: true})
    @IsString()
    username: string;

    @Column({unique:true})
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @Column()
    @IsPhoneNumber()
    phoneNumber: string;

    @OneToMany(() => Note, (note) => note.user)
    notes: Note[];


    toDto(): UserDto {
        const userDto = new UserDto();
        userDto.firstname = this.firstname;
        userDto.lastname = this.lastname;
        userDto.username = this.username;
        userDto.email = this.email;
        userDto.password = this.password;
        userDto.phoneNumber = this.phoneNumber;

        return userDto;
    }
}
