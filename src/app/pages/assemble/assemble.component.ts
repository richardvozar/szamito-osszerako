import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Case } from 'src/app/models/Case';
import { Cpu } from 'src/app/models/Cpu';
import { Gpu } from 'src/app/models/Gpu';
import { Ram } from 'src/app/models/Ram';
import { SzamitoService } from 'src/app/service/szamito.service';

@Component({
  selector: 'app-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.scss']
})
export class AssembleComponent implements OnInit, OnDestroy {

  constructor(private szamitoService: SzamitoService) { }

  observable_cpu : any;
  observable_case : any;
  observable_ram : any;
  observable_gpu : any;

  cpu_list : Cpu[] = [];
  case_list : Case[] = [];
  ram_list : Ram[] = [];
  gpu_list : Gpu[] = [];

  selectedCpu : any;
  selectedCase : any;
  selectedRam : any;
  selectedGpu : any;

  assemble_list : any[] = [];
  assemble_button_clicked : boolean = false;
  displayedColumns: string[] = ['component', 'name', 'price_huf'];
  price_sum : number = 0;

  text_to_write : string = '';

  

  ngOnInit(): void {

    console.log("assemble onInit running...");

    // get all cpu
    this.observable_cpu = this.szamitoService.getAllCpu().subscribe((response: any) => {
      this.cpu_list = response;
      console.log("response : " + response);
    });

    // get all case
    this.observable_case = this.szamitoService.getAllCase().subscribe((response: any) => {
      this.case_list = response;
      console.log("response : " + response);
    });

    // get all ram
    this.observable_ram = this.szamitoService.getAllRam().subscribe((response: any) => {
      this.ram_list = response;
      console.log("response : " + response);
    });

    // get all gpu
    this.observable_gpu = this.szamitoService.getAllGpu().subscribe((response: any) => {
      this.gpu_list = response;
      console.log("response : " + response);
    });

  }

  ngOnDestroy(): void {
    this.observable_cpu.unsubscribe();
    this.observable_case.unsubscribe();
    this.observable_ram.unsubscribe();
    this.observable_gpu.unsubscribe();
  }

  assemble_button() {
    if (this.selectedCase !== undefined &&
        this.selectedCpu !== undefined &&
        this.selectedGpu !== undefined &&
        this.selectedRam !== undefined) {

        // set the cpu
        this.cpu_list.forEach( (cpu) => {
            if (cpu['product_name'] === this.selectedCpu) {
                this.selectedCpu = cpu;
                this.selectedCpu['component'] = 'Processzor';
                this.assemble_list.push(this.selectedCpu);
                this.price_sum += this.selectedCpu['price_huf'];
            }
        });

        // set the case
        this.case_list.forEach( (_case) => {
            if (_case['name'] === this.selectedCase) {
                this.selectedCase = _case;
                this.selectedCase['component'] = 'Számítógépház';
                this.assemble_list.push(this.selectedCase);
                this.price_sum += this.selectedCase['price_huf'];
            }
        });

        // set the ram
        this.ram_list.forEach( (ram) => {
            if (ram['name'] === this.selectedRam) {
                this.selectedRam = ram;
                this.selectedRam['component'] = 'RAM';
                this.assemble_list.push(this.selectedRam);
                this.price_sum += this.selectedRam['price_huf'];
            }
        });

        // set the gpu
        this.gpu_list.forEach( (gpu) => {
            if (gpu['name'] === this.selectedGpu) {
                this.selectedGpu = gpu;
                this.selectedGpu['component'] = 'Videókártya';
                this.assemble_list.push(this.selectedGpu);
                this.price_sum += this.selectedGpu['price_huf'];
            }
        });

        console.log(this.selectedCpu)
        console.log(this.selectedCase)
        console.log(this.selectedRam)
        console.log(this.selectedGpu)


        this.text_to_write += 'Remek összeállítás, kiváló áron! Szép munka!'

        

        this.assemble_button_clicked = true;

        

    } else {
        console.log("Minden alkatrészhez válassz ki valamit!");
    }
    
    
  }

}
