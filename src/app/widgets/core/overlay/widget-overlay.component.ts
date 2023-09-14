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

  public classes: string[] = [];

  public ngOnInit(): void {
    console.log(this.component.node.attrs);
    //this.component.node.attrs.filter(attr => Object.values(WidgetAction).includes(attr)).map()
  }
}
