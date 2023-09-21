import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxTiptapModule } from 'ngx-tiptap';
import { FormsModule } from '@angular/forms';
import { NgxTabsModule } from '@ngx-lite/tabs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ContentWidgetComponent } from './widgets/content/content-widget.component';
import { TweetWidgetComponent } from './widgets/tweet/tweet-widget.component';
import { NgxTwitterWidgetsModule } from 'ngx-twitter-widgets';
import { WidgetOverlayComponent } from './widgets/core/overlay/widget-overlay.component';
import { FreeformWidgetComponent } from './widgets/freeform/freeform-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetOverlayComponent,
    ContentWidgetComponent,
    TweetWidgetComponent,
    FreeformWidgetComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgxTiptapModule,
    NgxTabsModule,
    NgxTwitterWidgetsModule,
  ],
  bootstrap: [AppComponent],
  schemas: [],
})
export class AppModule {}
