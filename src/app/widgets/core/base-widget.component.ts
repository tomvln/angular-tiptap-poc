import { OnInit } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { WidgetActionAlign } from './widget-actions.enum';

export abstract class BaseWidgetComponent
  extends AngularNodeViewComponent
  implements OnInit
{
  public align: WidgetActionAlign;

  public ngOnInit(): void {
    this.align = this.node.attrs.align;
  }
}
