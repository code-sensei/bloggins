import { Component , ViewChild} from '@angular/core';

/*
  Generated class for the ElasticTextarea component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

//Snippet thanks to smukov: https://forum.ionicframework.com/t/elastic-ion-textarea/55671/3
@Component({
  selector: 'elastic-textarea',
  inputs: ['placeholder', 'lineHeight'],
  templateUrl: 'elastic-textarea.html',
  queries: {
    ionTxtArea: new ViewChild('ionTxtArea')
  }
})
export class ElasticTextarea {

  content: any;
  lineHeight: any;
  txtArea: any;
  ionTxtArea: any;

  constructor() {
    this.content = "";
    this.lineHeight = "22px";
  }

  ngAfterViewInit(){
    this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
    this.txtArea.style.height = this.lineHeight + "px";
  }

  onChange(newValue){
    this.txtArea.style.height = this.lineHeight + "px";
    this.txtArea.style.height =  this.txtArea.scrollHeight + "px";
  }

}


