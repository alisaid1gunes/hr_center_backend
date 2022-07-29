import { MigrationInterface, QueryRunner } from "typeorm";

export class genderUpdateCaseSensitive1659083047085 implements MigrationInterface {
    name = 'genderUpdateCaseSensitive1659083047085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "Gender" TO "gender"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "gender" TO "Gender"`);
    }

}
