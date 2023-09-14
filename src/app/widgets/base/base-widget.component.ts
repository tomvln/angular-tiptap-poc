import { Component, OnInit } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { WidgetAlign } from './widget-actions.enum';

@Component({ template: '' })
export class BaseWidgetComponent
  extends AngularNodeViewComponent
  implements OnInit
{
  public align: WidgetAlign;

  public ngOnInit(): void {
    this.align = this.node.attrs.align;
  }
}
