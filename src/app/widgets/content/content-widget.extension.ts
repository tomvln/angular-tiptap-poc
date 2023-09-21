import { Injector } from '@angular/core';
import { Node } from '@tiptap/core';
import { WidgetAction } from '../core/widget-actions.enum';
import { WidgetExtensionFactory } from '../core/widget-extension-factory';
import { ContentWidgetComponent } from './content-widget.component';

const name = 'content';

const ContentWidgetExtension = (injector: Injector): Node =>
  WidgetExtensionFactory.create(injector, {
    name,
    withContent: false,
    component: ContentWidgetComponent,
  });

export default ContentWidgetExtension;
