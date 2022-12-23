import { Module } from "@nestjs/common";
import { NotificationRepository } from "src/application/repositories/notification-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrimaNotificationRepository } from "./prisma/repositories/prisma-notifications-repositories";

@Module({
    providers: [PrismaService,{
        provide: NotificationRepository,
        useClass: PrimaNotificationRepository
    }],
    exports: [
        NotificationRepository
    ],
})

export class DatabaseModule{}