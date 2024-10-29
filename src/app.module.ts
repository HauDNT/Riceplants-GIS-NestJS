import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from '../db/data-source';
import configuration from './config/configuration';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { StaffsModule } from './modules/staffs/staffs.module';
import { RiceplantsModule } from './modules/riceplants/riceplants.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ReceivingSlipsModule } from './modules/receiving_slips/receiving_slips.module';
import { DispatchSlipsModule } from './modules/dispatch_slips/dispatch_slips.module';
import { ReceivingRicesModule } from './modules/receiving_rices/receiving_rices.module';
import { DispatchRicesModule } from './modules/dispatch_rices/dispatch_rices.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { SeedModule } from './seed/seed.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../', 'public'),
        }),
        ConfigModule.forRoot({
            envFilePath: [
                '.env.development',
                '.env.production',
            ],
            isGlobal: true,
            load: [configuration],
        }),
        // TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        WarehousesModule,
        StaffsModule,
        RiceplantsModule,
        CustomersModule,
        ReceivingSlipsModule,
        DispatchSlipsModule,
        ReceivingRicesModule,
        DispatchRicesModule,
        AuthModule,
        FilesModule,
        SeedModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
