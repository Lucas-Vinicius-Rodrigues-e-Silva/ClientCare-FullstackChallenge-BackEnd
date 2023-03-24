import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1679578485699 implements MigrationInterface {
    name = 'initialMigration1679578485699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "userWhoAddId" uuid`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "clientWhoBelongsId" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_e104119f2538f08455853ded22a" FOREIGN KEY ("userWhoAddId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_4f128d0be0f72363a9ff9fef586" FOREIGN KEY ("clientWhoBelongsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_4f128d0be0f72363a9ff9fef586"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_e104119f2538f08455853ded22a"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "clientWhoBelongsId"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "userWhoAddId"`);
    }

}
