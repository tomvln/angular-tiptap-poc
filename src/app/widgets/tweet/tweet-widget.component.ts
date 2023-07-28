import { Component, OnInit } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { WidgetInterface } from '../widget.interface';

@Component({
  selector: 'app-tweet-widget',
  templateUrl: 'tweet-widget.component.html',
})
export class TweetWidgetComponent
  extends AngularNodeViewComponent
  implements WidgetInterface, OnInit
{
  name = 'Tweet';
  tweetId: string;

  ngOnInit() {
    this.tweetId = this.node.attrs.tweetId;
  }
}
