import { Component, OnInit } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { WidgetComponentInterface } from '../core/widget-component.interface';

@Component({
  selector: 'app-freeform-widget',
  templateUrl: 'freeform-widget.component.html',
  styleUrls: ['freeform-widget.component.css'],
})
export class FreeformWidgetComponent
  extends AngularNodeViewComponent
  implements WidgetComponentInterface, OnInit
{
  name = 'Freeform';
  content: string;

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('node FreeformWidgetComponent', this.node);
    console.log('node content FreeformWidgetComponent', this.node.content);
    console.log(
      'node content json FreeformWidgetComponent',
      this.node.content.toJSON()[0].text
    );
    if (this.node.content.size) {
      this.content = this.node.content.toJSON()[0].text;
    }
  }
}
