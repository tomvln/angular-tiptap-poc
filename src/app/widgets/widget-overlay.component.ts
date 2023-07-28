import { Component, ContentChild } from '@angular/core';

@Component({
  selector: 'app-widget-overlay',
  templateUrl: 'widget-overlay.component.html',
  styleUrls: ['widget-overlay.component.css'],
})
export class WidgetOverlayComponent {
  @ContentChild('*') widget
}
