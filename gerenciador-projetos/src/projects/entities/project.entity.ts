/* eslint-disable prettier/prettier */
import { Client } from 'src/clients/entities/client.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  orcamento: number;

  @Column({ nullable: false })
  dataInicio: Date;

  @Column({ nullable: true })
  dataFinal?: Date; // ? = opcional.

  // Relacionamentos

  @ManyToOne(() => Client, (client) => client.projects)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToMany(() => Employee, (employee) => employee.projects, {
    cascade: true,
  })
  @JoinTable({
    name: 'employeeproject_',
    // Colunas que vão fazer parte dessa tabela.
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },

    // Outro lado da relação.
    inverseJoinColumn: {
      name: 'employee_id',
      referencedColumnName: 'id',
    },
  })
  employee: Employee[];

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
