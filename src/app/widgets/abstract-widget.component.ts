import { Component, ContentChild } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';

export interface WidgetInterface {
  name: string;
}

@Component({ template: '' })
export class AbstractWidgetComponent extends AngularNodeViewComponent {}
