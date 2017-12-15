import { Component, NgModule} from '@angular/core';
import { LoadingController} from 'ionic-angular';


@NgModule({
  imports:      [],
  declarations: []
})

 export class Modal{
    loading;

   constructor(public loadingCtrl: LoadingController) {
   }

   showModal(time){
     if(time<=0){
       this.loading = this.loadingCtrl.create({
       spinner: 'hide',
       content: `<div class="loader">
       <div class="droid">
      <div class="head">
      <span></span>
      <span></span>
      <span></span>
      <span class="eye"></span>
      <span class="small-eye"></span>
      </div>
      <div class="wheel">
      <span></span>
      <span></span>
      <span></span>
      </div>
      </div>
      <h1>LOADING.... PLEASE WAIT</h1>

      </div>`
      });
     }
     else{
       this.loading = this.loadingCtrl.create({
       spinner: 'hide',
       content: `<div class="loader">
       <div class="droid">
    <div class="head">
      <span></span>
      <span></span>
      <span></span>
      <span class="eye"></span>
      <span class="small-eye"></span>
    </div>
    <div class="wheel">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <h1>LOADING.... PLEASE WAIT</h1>

  </div>`,
  duration: time*1000
     });
     }
   this.loading.present();
   }

   hideModal(){
      this.loading.dismiss();
   }

 }
