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

  constructor() {
    super();
  }

  ngOnInit() {
    console.log('node', this.node.content.toString());
  }
}
