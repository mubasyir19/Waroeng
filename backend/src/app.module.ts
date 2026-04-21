import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { UnitModule } from './unit/unit.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { StoreModule } from './store/store.module';
import { DashboardModule } from './dashboard/dashboard.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    OrderModule,
    UnitModule,
    UserModule,
    PaymentModule,
    StoreModule,
    DashboardModule,
    // ConfigModule.forRoot({
    //   isGlobal: true, // Make ConfigService available everywhere
    //   envFilePath: '.env',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
