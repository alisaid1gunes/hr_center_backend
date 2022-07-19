import { MigrationInterface, QueryRunner } from "typeorm";

export class email1658219229168 implements MigrationInterface {
    name = 'email1658219229168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "jobTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "salaryExpectation" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salaryExpectation"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "jobTitle"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
