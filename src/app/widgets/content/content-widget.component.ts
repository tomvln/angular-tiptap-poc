import { Component } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { WidgetComponentInterface } from '../core/widget-component.interface';

@Component({
  selector: 'app-content-widget',
  templateUrl: 'content-widget.component.html',
})
export class ContentWidgetComponent
  extends AngularNodeViewComponent
  implements WidgetComponentInterface
{
  name = 'Content';

  constructor() {
    super();
  }
}
