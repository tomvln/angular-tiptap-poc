import { Component, OnInit } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { WidgetComponentInterface } from '../core/widget-component.interface';
import { unescapeHTML } from '../../utils/unescape-html.util';

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
    this.content = unescapeHTML(this.node.attrs.content);
  }
}
