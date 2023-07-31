import { Component, HostBinding, OnInit } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { WidgetInterface } from '../widget.interface';

@Component({
  selector: 'app-tweet-widget',
  templateUrl: 'tweet-widget.component.html',
  styleUrls: ['tweet-widget.component.css']
})
export class TweetWidgetComponent
  extends AngularNodeViewComponent
  implements WidgetInterface, OnInit
{
  @HostBinding('class') class: string;

  name = 'Tweet';
  tweetId: string;
  textAlign: 'left' | 'center' | 'right';

  ngOnInit() {
    console.log('init')
    this.tweetId = this.node.attrs.tweetId;
    this.textAlign = this.node.attrs.textAlign;
    this.class = `${this.class || '' } align-${this.textAlign}`
  }
}
