import { Component, OnInit } from '@angular/core';
import {
  AbstractWidgetComponent,
  WidgetInterface,
} from '../abstract-widget.component';

@Component({
  selector: 'app-tweet-widget',
  templateUrl: 'tweet-widget.component.html',
  providers: [
    { provide: AbstractWidgetComponent, useExisting: TweetWidgetComponent },
  ],
})
export class TweetWidgetComponent
  extends AbstractWidgetComponent
  implements WidgetInterface, OnInit
{
  name = 'Tweet';
  tweetId: string;

  ngOnInit() {
    this.tweetId = this.node.attrs.tweetId;
  }
}
