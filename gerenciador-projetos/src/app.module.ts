/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { AppController } from './app.controller';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmConfigService } from './database/data-source';
import { EmployeesModule } from './employees/employees.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ClientsModule,
    ProjectsModule,
    EmployeesModule,
    AddressModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
