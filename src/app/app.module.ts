import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxTiptapModule } from 'ngx-tiptap';
import { FormsModule } from '@angular/forms';
import { NgxTabsModule } from '@ngx-lite/tabs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TweetWidgetComponent } from './widgets/tweet/tweet-widget.component';
import { NgxTwitterWidgetsModule } from 'ngx-twitter-widgets';
import { WidgetOverlayComponent } from './widgets/widget-overlay.component';
import { AbstractWidgetComponent } from './widgets/abstract-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    AbstractWidgetComponent,
    WidgetOverlayComponent,
    TweetWidgetComponent,
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