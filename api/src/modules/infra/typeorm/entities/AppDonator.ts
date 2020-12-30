import { Entity, Column } from 'typeorm';

import { AppUser } from './AppUser';
import { AppCpf } from './AppCpf';
@Entity('tb_donator')
export class AppDonator extends AppUser{

  @Column('varchar')
  name: string;
  
  @Column('date')
  birthday: Date;

  @Column('varchar')
  cpf: string;

};