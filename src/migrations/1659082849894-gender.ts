import { MigrationInterface, QueryRunner } from "typeorm";

export class gender1659082849894 implements MigrationInterface {
    name = 'gender1659082849894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "Gender" TIMESTAMP DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "Gender"`);
    }

}
