import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { AppSettings } from 'appsettings-json-reader';

const appSettings = AppSettings.readAppSettings();
firebase.initializeApp(appSettings.firebaseConfig)
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  
  storageRef = firebase.app().storage().ref();
  constructor() { }
  
  async subirImagen(nombre: string, imgBase64: any){
    try {
      let respuesta = await this.storageRef.child('images/'+nombre).putString(imgBase64,'data_url')
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async obtenerImagenes(carpeta: string): Promise<string[]> {
    const references = await this.storageRef.child(carpeta).listAll();
  
    const downloadURLPromises = references.items.map(async item => {
      return await item.getDownloadURL();
    });
  
    return Promise.all(downloadURLPromises);
  }
  
  async buscarImagen(carpeta: string) {
    const references = await this.storageRef.child(carpeta).listAll();

    const promises =  references.items.map(async item => {
      return (await item.getMetadata()).name;
    });

    const nombres = await Promise.all(promises);

    return nombres.filter(Boolean);
  }
  
  async eliminarImagenPorURL(carpeta: string, nombreImagen: string) {
    const ref = this.storageRef.child(`${carpeta}/${nombreImagen}`);
    return ref.delete().then(item =>{
      return item
    })
  }
  
  
}
