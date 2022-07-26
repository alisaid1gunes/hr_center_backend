import { MigrationInterface, QueryRunner } from "typeorm";

export class cv1658479635871 implements MigrationInterface {
    name = 'cv1658479635871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "image" TO "cv"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "cv" TO "image"`);
    }

}
