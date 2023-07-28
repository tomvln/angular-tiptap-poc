import { Component, ContentChild, Directive } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';

export interface WidgetInterface {
  name: string;
}

export class AbstractWidgetComponent
  extends AngularNodeViewComponent
  implements WidgetInterface
{
  name;
}
