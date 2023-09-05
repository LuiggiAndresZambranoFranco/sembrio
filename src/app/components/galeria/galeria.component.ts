import { Component, OnInit } from '@angular/core';
import { ImagenesService } from 'src/app/services/imagenes.service';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import 'firebase/storage'


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit{
  imagenes: any[] = [];
  imageReferences: any[] = [];
  eliminarActivo = false;

  constructor(
    private imagenesService: ImagenesService,
    // private storage: AngularFireStorage
    
  ) {}
  ngOnInit(): void {
    this.mostrarImagenes()
  }


  cargarImagen(event: any) {
    let archivos = event.target.files;

    for (let i = 0; i < archivos.length; i++) {
      let reader = new FileReader();

      reader.readAsDataURL(archivos[i]);
      reader.onloadend = () => {
        console.log(reader.result);
        this.imagenes.push(reader.result);
        this.imagenesService.subirImagen('sembrio_' + Date.now(), reader.result).then(urlImagen => {
          console.log(urlImagen);
          this.mostrarImagenes();
        });
      };
    }

    console.log(event.target.files);
  }
  
  async eliminarImagen(url: string) {
    const carpeta = 'images';
  
    try {
    const urls = await this.imagenesService.buscarImagen(carpeta)
    const nombreEncontrado = await urls.find(nombre => url.includes(nombre));
    
    if (nombreEncontrado) {
      console.log("Nombre de la imagen encontrada:", nombreEncontrado);
      const eliminada = await this.imagenesService.eliminarImagenPorURL(carpeta, nombreEncontrado)
      console.log(eliminada);
      this.mostrarImagenes()
    } else {
      console.log("La URL no coincide con ninguna imagen conocida.");
    }
    console.log(urls);
    
    } catch (error) {
      console.log(error);
    }  
  }

  // mostrarImagenes() {
  //   // Obtener la lista de referencias a los archivos en Firebase Storage
  //   const storageRef = this.img.ref('images'); // Cambia 'images' por la ruta donde tengas las imágenes
  //   storageRef.listAll().subscribe(response => {
  //     this.imageReferences = [];
  //     response.items.forEach(async item => {
  //       const url = await item.getDownloadURL();
  //       this.imageReferences.push(url);
  //     });
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  async mostrarImagenes() {
    const carpeta = 'images'; // Cambia 'images' por la carpeta que desees
    try {
      const urls = await this.imagenesService.obtenerImagenes(carpeta);
      console.log(urls);
      this.imageReferences = urls;
    } catch (error) {
      console.log(error);
    }
  }
}
