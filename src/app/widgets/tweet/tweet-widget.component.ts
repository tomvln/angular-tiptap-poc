import { Component, HostBinding, OnInit } from '@angular/core';
import { BaseWidgetComponent } from '../base/base-widget.component';
import { WidgetInterface } from '../widget.interface';

@Component({
  selector: 'app-tweet-widget',
  templateUrl: 'tweet-widget.component.html',
  styleUrls: ['tweet-widget.component.css'],
})
export class TweetWidgetComponent
  extends BaseWidgetComponent
  implements WidgetInterface, OnInit
{
  name = 'Tweet';
  id: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.id = this.node.attrs.id.toString();
  }
}
