import { Component, OnInit } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';

@Component({ template: '' })
export class BaseWidgetComponent
  extends AngularNodeViewComponent
  implements OnInit
{
  align: 'left' | 'center' | 'right';

  ngOnInit() {
    this.align = this.node.attrs.align;
  }
}
