import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotification } from '@application/use-cases/count-notification';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CreateNotificationBody } from './dtos/create-notification-body';

@Controller('notifications')
export class NotificationController {
constructor(private sendNotification: SendNotification,
  private cancelNotification: CancelNotification,
  private readNotification: ReadNotification,
  private unreadNotification: UnreadNotification,
  private countRecipientNotification: CountRecipientNotification,
  private getFromRecipientNot: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string){
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countRecipient(
    @Param('recipientId') recipientId: string,
  ){
    const {count} = await this.countRecipientNotification.execute({
      recipientId: recipientId,
    });
    return {
      count: count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecient(
    @Param('recipientId') recipientId: string,
  ){
    const {notifications} = await this.getFromRecipientNot.execute({
      recipientId: recipientId,
    });
    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }
  @Patch(':id/read')
  async read(@Param('id') id: string){
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string){
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody){
    const { recepientId, content, category } = body;

    const {notification} = await this.sendNotification.execute({
      recipientId: recepientId,
      content: content,
      category: category,
    });
    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}