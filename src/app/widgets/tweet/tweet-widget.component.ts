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
  name = 'Tweet';
  id: string;
  align: 'left' | 'center' | 'right';

  ngOnInit() {
    this.id = this.node.attrs.id.toString();
    this.align = this.node.attrs.align;
  }
}
