import { Component, Input, OnInit } from '@angular/core';
import { NodeViewProps } from '@tiptap/core';
import { WidgetComponentInterface } from '../widget-component.interface';

@Component({
  selector: 'app-widget-overlay',
  templateUrl: 'widget-overlay.component.html',
  styleUrls: ['widget-overlay.component.css'],
})
export class WidgetOverlayComponent implements OnInit {
  @Input('component') component: NodeViewProps & WidgetComponentInterface;

  public componentAttributes;

  public ngOnInit() {
      this.componentAttributes = this.component.node.attrs;
  }
}
