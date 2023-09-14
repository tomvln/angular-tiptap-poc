import { Component, OnInit } from '@angular/core';
import { BaseWidgetComponent } from '../core/base-widget.component';
import { WidgetComponentInterface } from '../core/widget-component.interface';

@Component({
  selector: 'app-tweet-widget',
  templateUrl: 'tweet-widget.component.html',
  styleUrls: ['tweet-widget.component.css'],
})
export class TweetWidgetComponent
  extends BaseWidgetComponent
  implements WidgetComponentInterface, OnInit
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
