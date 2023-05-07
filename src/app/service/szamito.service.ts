import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cpu } from '../models/Cpu';
import { Case } from '../models/Case';
import { Ram } from '../models/Ram';
import { Gpu } from '../models/Gpu';

@Injectable({
  providedIn: 'root'
})
export class SzamitoService {

  constructor(private afs: AngularFirestore) { }

  getAllCpu() {
    return this.afs.collection<Cpu>("cpu").valueChanges({ idField: 'docID' });
  }

  getAllCase() {
    return this.afs.collection<Case>("case").valueChanges({ idField: 'docID' });
  }

  getAllRam() {
    return this.afs.collection<Ram>("ram").valueChanges({ idField: 'docID' });
  }

  getAllGpu() {
    return this.afs.collection<Gpu>("gpu").valueChanges({ idField: 'docID' });
  }

  searchCpuByName(search_value: string) {
    return this.afs.collection<Cpu>("cpu", ref => ref
    .where('product_name', '>=', search_value)
    .where('product_name', '<', search_value + '\uffff'))
    .valueChanges({ idField: 'docID' });
  }

  searchCaseByName(search_value: string) {
    return this.afs.collection<Case>("case", ref => ref
    .where('name', '>=', search_value)
    .where('name', '<', search_value + '\uffff'))
    .valueChanges({ idField: 'docID' });
  }

}


