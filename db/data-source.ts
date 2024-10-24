import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import * as mysql from 'mysql2/promise';

const dataSourceConfig = (configService: ConfigService): DataSourceOptions => {
    return {
        type: 'mysql',
        host: configService.get<string>('dbHost'),
        port: configService.get<number>('dbPort'),
        username: configService.get<string>('dbUsername'),
        password: configService.get<string>('dbPassword'),
        database: configService.get<string>('dbName'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: {
            rejectUnauthorized: false,
        },
        migrations: ['dist/db/migrations/*.js'],
        extra: {
            authPlugins: {
                mysql_clear_password: () => () => mysql.authPlugins.mysql_native_password,
            }
        }
    };
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => {
        return dataSourceConfig(configService);
    },
};

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
    migrations: ['dist/db/migrations/*.js'],
    extra: {
        authPlugins: {
            mysql_clear_password: () => () => mysql.authPlugins.mysql_native_password,
        }
    }
});
export default dataSource;