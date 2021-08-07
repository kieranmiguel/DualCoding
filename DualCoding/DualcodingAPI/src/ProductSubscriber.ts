import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import {user} from './entities/user';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<user> {

  listenTo(): any {
    return user;
  }

  afterUpdate(event: UpdateEvent<user>): Promise<any> | void {
    console.log(event.entity.id);
}
}