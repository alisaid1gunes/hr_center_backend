import { MigrationInterface, QueryRunner } from "typeorm";

export class null1658219693694 implements MigrationInterface {
    name = 'null1658219693694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "jobTitle" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "salaryExpectation" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "salaryExpectation" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "jobTitle" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
    }

}
