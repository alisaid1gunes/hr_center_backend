import { MigrationInterface, QueryRunner } from "typeorm";

export class createdAt1658822485625 implements MigrationInterface {
    name = 'createdAt1658822485625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    }

}
