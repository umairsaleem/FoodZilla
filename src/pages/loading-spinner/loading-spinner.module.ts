import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadingSpinnerPage } from './loading-spinner';

@NgModule({
  declarations: [
    LoadingSpinnerPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadingSpinnerPage),
  ],
})
export class LoadingSpinnerPageModule {}
