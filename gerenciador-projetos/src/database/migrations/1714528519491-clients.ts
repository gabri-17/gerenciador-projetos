/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Clients1714528519491 implements MigrationInterface {
  name = 'Clients1714528519491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`logradouro\` varchar(255) NOT NULL, \`numero\` varchar(255) NOT NULL, \`complemento\` varchar(255) NULL, \`bairro\` varchar(255) NOT NULL, \`cidade\` varchar(255) NOT NULL, \`cep\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_id\` int NULL, UNIQUE INDEX \`REL_7e77f562043393b08de949b804\` (\`employee_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`data_contratacao\` datetime NOT NULL, \`data_demissao\` datetime NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`orcamento\` int NOT NULL, \`data_inicio\` datetime NOT NULL, \`data_final\` datetime NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`client_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`employeeproject_\` (\`project_id\` int NOT NULL, \`employee_id\` int NOT NULL, INDEX \`IDX_034911ee0ae86a0f0a5f73b684\` (\`project_id\`), INDEX \`IDX_4187030be9b85fb428c71a85e4\` (\`employee_id\`), PRIMARY KEY (\`project_id\`, \`employee_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`client\` CHANGE \`observacao\` \`observacao\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` ADD CONSTRAINT \`FK_7e77f562043393b08de949b804b\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_c72d76e480d7334858782543610\` FOREIGN KEY (\`client_id\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employeeproject_\` ADD CONSTRAINT \`FK_034911ee0ae86a0f0a5f73b6842\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employeeproject_\` ADD CONSTRAINT \`FK_4187030be9b85fb428c71a85e48\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employeeproject_\` DROP FOREIGN KEY \`FK_4187030be9b85fb428c71a85e48\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employeeproject_\` DROP FOREIGN KEY \`FK_034911ee0ae86a0f0a5f73b6842\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_c72d76e480d7334858782543610\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_7e77f562043393b08de949b804b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`client\` CHANGE \`observacao\` \`observacao\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4187030be9b85fb428c71a85e4\` ON \`employeeproject_\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_034911ee0ae86a0f0a5f73b684\` ON \`employeeproject_\``,
    );
    await queryRunner.query(`DROP TABLE \`employeeproject_\``);
    await queryRunner.query(`DROP TABLE \`project\``);
    await queryRunner.query(`DROP TABLE \`employee\``);
    await queryRunner.query(
      `DROP INDEX \`REL_7e77f562043393b08de949b804\` ON \`address\``,
    );
    await queryRunner.query(`DROP TABLE \`address\``);
  }
}
