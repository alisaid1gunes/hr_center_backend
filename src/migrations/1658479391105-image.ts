import { MigrationInterface, QueryRunner } from "typeorm";

export class image1658479391105 implements MigrationInterface {
    name = 'image1658479391105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
    }

}
