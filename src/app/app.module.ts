import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxTiptapModule } from 'ngx-tiptap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TweetWidgetComponent } from './widgets/tweet/tweet-widget.component';
import { NgxTwitterWidgetsModule } from 'ngx-twitter-widgets';
import { WidgetOverlayComponent } from './widgets/core/overlay/widget-overlay.component';
import { FreeformWidgetComponent } from './widgets/freeform/freeform-widget.component';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    WidgetOverlayComponent,
    TweetWidgetComponent,
    FreeformWidgetComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxTiptapModule,
    NgxTwitterWidgetsModule,
    TabViewModule,
    DialogModule,
    ButtonModule,
  ],
  bootstrap: [AppComponent],
  schemas: [],
})
export class AppModule {}
