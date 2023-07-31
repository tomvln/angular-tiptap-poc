import { Component, Input } from '@angular/core';
import { NodeViewProps } from '@tiptap/core';
import { WidgetInterface } from './widget.interface';

@Component({
  selector: 'app-widget-overlay',
  templateUrl: 'widget-overlay.component.html',
  styleUrls: ['widget-overlay.component.css'],
})
export class WidgetOverlayComponent {
  @Input('component') component: NodeViewProps & WidgetInterface;
}
