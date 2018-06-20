import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable()
export class PusherProvider {
  constructor() {
    this.pusher = new Pusher('PUSHER_KEY', {
      cluster: 'eu',
      encrypted: true,
    });
  }
  channel;
  pusher;

  public init(channelName) {
    const channel = this.pusher.subscribe(channelName);
    return channel;
  }
}
