/* eslint-disable prettier/prettier */

import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  logradouro: string;

  @Column({ nullable: false })
  numero: string;

  @Column({ nullable: true })
  complemento?: string;

  @Column({ nullable: false })
  bairro: string;

  @Column({ nullable: false })
  cidade: string;

  @Column({ nullable: false })
  cep: string;

  @Column({ nullable: false })
  estado: string;

  @OneToOne(() => Employee, (employee) => employee.address, {
    // Quando o Employee for excluido, também vai ser permitido o endereco.
    onDelete: 'CASCADE',
  })

  // A coluna employee_id terá o id de employee.
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

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
