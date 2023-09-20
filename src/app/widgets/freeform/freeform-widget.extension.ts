import { Injector } from '@angular/core';
import { Node } from '@tiptap/core';
import { WidgetAction } from '../core/widget-actions.enum';
import { WidgetExtensionFactory } from '../core/widget-extension-factory';
import { FreeformWidgetComponent } from './freeform-widget.component';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    freeform: {
      setFreeform: (attributes: { id: string }) => ReturnType;
    };
  }
}

const name = 'freeform';

const FreeformWidgetExtension = (injector: Injector): Node =>
  WidgetExtensionFactory.create(injector, {
    name,
    withHash: true,
    component: FreeformWidgetComponent,
    commands: {
      setFreeform:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(name, attributes);
        },
    },
    actions: [WidgetAction.ALIGN],
  });

export default FreeformWidgetExtension;
