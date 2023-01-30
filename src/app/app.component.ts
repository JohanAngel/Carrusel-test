import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbCarouselConfig]
})

export class AppComponent {
  title = 'Carrusel';

  public imagenes:any = [];
  public cargadas:any;
  public id:any;

  getImage(file:any){
    const Imagen  = file.target.files[0]
    this.id       = Imagen.name
    this.base64(Imagen).then(imagen =>{
      this.cargadas = imagen
    })
  };

  base64 = async (file:any) => new Promise((resolve, rejects) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      } 

    }
    catch{

    }
  });

  deleteImage(image:any){
    for(var x in this.imagenes){
      console.log("Antes ");
      console.log(this.imagenes);
      if (image == this.imagenes[x].id){
        console.log("im_1" + image + "in_w" + this.imagenes[x].id)
        this.imagenes.pop(x)
        console.log("Despues");
        console.log(this.imagenes)
      }
    }
  };

  addImage(){
    if(this.cargadas != undefined){
      this.imagenes.push({id:this.id, src:this.cargadas});
    }else{
      console.log("No se selecciono nada")
    }
  }
  

  constructor(config: NgbCarouselConfig, private sanitizer: DomSanitizer){
    config.animation = false;
    config.showNavigationArrows = false;
    config.interval = 3000;
  }
}

