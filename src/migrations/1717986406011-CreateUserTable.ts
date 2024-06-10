import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1717986406011 implements MigrationInterface {
    name = 'CreateUserTable1717986406011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`userName\` varchar(255) NOT NULL, \`encryptPassword\` varchar(255) NOT NULL, \`isWork\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
