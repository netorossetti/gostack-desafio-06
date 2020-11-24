import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1606174547492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "categories",
            columns:[
                {
                    name: 'id',
                    type: 'uniqueidentifier',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'newId()'
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'getdate()'
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    default: 'getdate()'
                }
            ]
        }))

           
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories')
    }

}
