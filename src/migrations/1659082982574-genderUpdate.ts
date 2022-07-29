import { MigrationInterface, QueryRunner } from "typeorm";

export class genderUpdate1659082982574 implements MigrationInterface {
    name = 'genderUpdate1659082982574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "Gender"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "Gender" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "Gender"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "Gender" TIMESTAMP DEFAULT now()`);
    }

}
