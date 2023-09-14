import { Component, Input, OnInit } from '@angular/core';
import { NodeViewProps } from '@tiptap/core';
import { WidgetAction } from '../widget-actions.enum';
import { WidgetComponentInterface } from '../widget-component.interface';

@Component({
  selector: 'app-widget-overlay',
  templateUrl: 'widget-overlay.component.html',
  styleUrls: ['widget-overlay.component.css'],
})
export class WidgetOverlayComponent implements OnInit {
  @Input('component') component: NodeViewProps & WidgetComponentInterface;

  public actionAttributes;

  public get classes(): string[] {
    return Object.entries(this.actionAttributes).map(
      ([key, value]) => `${key}-${value}`
    );
  }

  public ngOnInit() {
    return Object.values(WidgetAction).map((action) => {
      this.actionAttributes[action] = this.component.node.attrs[action];
    });
  }
}
