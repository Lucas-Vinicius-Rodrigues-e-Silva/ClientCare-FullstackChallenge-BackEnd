import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUsersAndClientsReturn1679850208793 implements MigrationInterface {
    name = 'alterUsersAndClientsReturn1679850208793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "phoneNumber" character varying(11) NOT NULL, "registryDate" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "clientWhoBelongsId" uuid, CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "phoneNumber" character varying(11) NOT NULL, "registryDate" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "userWhoAddId" uuid, CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(120) NOT NULL, "phoneNumber" character varying(11) NOT NULL, "registryDate" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isAdm" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_4f128d0be0f72363a9ff9fef586" FOREIGN KEY ("clientWhoBelongsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_e104119f2538f08455853ded22a" FOREIGN KEY ("userWhoAddId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_e104119f2538f08455853ded22a"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_4f128d0be0f72363a9ff9fef586"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
