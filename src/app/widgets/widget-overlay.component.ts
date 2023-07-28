import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { AbstractWidgetComponent } from './abstract-widget.component';

@Component({
  selector: 'app-widget-overlay',
  templateUrl: 'widget-overlay.component.html',
  styleUrls: ['widget-overlay.component.css'],
})
export class WidgetOverlayComponent implements AfterContentInit {
  @ContentChild(AbstractWidgetComponent, { static: false })
  widget: AbstractWidgetComponent;

  loaded = false;

  ngAfterContentInit() {
    this.loaded = true
  }
}
