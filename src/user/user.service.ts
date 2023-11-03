import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
) {}

  async createUser(userDto : UserDto ): Promise<User> {
    const newUser = await this.userRepository.create(userDto)
    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toDto() );
  }

  async getUser(userid: number): Promise<UserDto> {
    const user =  await this.userRepository.findOne({where: {userid}});
    if (!user) {
      throw new NotFoundException(`User with ID ${userid} not found`);
    }

    return user.toDto();
  }

  async updateUser(userid: number, userUpdateDto: UpdateUserDto): Promise<UserDto> {
    let user = await this.userRepository.findOne({where: {userid}});
        if (!user) {
            throw new NotFoundException(' is not found');
        }
  //       (await updatedUser).firstname = user.firstname;
  //       (await updatedUser).lastname = user.lastname;
  //       (await updatedUser).username = user.username;
  //       (await updatedUser).email = user.email;
  //       (await updatedUser).password = user.password;
  //       (await updatedUser).phoneNumber = user.phoneNumber;
  //       await (await updatedUser).save();
  //       console.log('From service:',updatedUser);
  //       return updatedUser;
      user =  Object.assign(user, userUpdateDto);

      const updatedUser = await this.userRepository.save(user);

      return updatedUser.toDto();
   }

  async deleteUser(userid: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({where: {userid}});
    if (!user) {
      throw new NotFoundException(' is not found');
  }

    const removedUser = await this.userRepository.remove(user);
    return removedUser.toDto();

  }
}