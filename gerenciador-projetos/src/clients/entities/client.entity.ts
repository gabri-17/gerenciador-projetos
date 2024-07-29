/* eslint-disable prettier/prettier */

import { Project } from 'src/projects/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('increment') //chave primária.
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  endereco: string;

  @Column({ nullable: true })
  observacao?: string;

  @OneToMany(() => Project, (project) => project.client, { cascade: true })
  projects: Project[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
