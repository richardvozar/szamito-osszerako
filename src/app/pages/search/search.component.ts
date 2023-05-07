import { Component, OnInit, OnDestroy } from '@angular/core';
import { Case } from 'src/app/models/Case';
import { Cpu } from 'src/app/models/Cpu';
import { SzamitoService } from 'src/app/service/szamito.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  constructor(private szamitoService: SzamitoService) { }

  displayedColumns: string[] = [
    'ID', 'product_name', 'product_family', 'price_huf', 'clock_base', 'clock_boost',
    'cpu_cores', 'cpu_threads', 'cpu_socket', 'tdp'
  ];
  cpu_list : Cpu[] = [];
  cpu_list2 : Cpu[] = [];
  case_list : Case[] = [];
  observable : any;
  observable2 : any = undefined;
  observable3 : any = undefined;
  search_cpu_input_value : string | any;
  search_case_input_value : string | any;
  list_all_cpu_boolean: boolean = false;
  search_cpu_by_name_boolean: boolean = false;
  search_case_by_name_boolean: boolean = false;

  ngOnInit(): void {
    console.log("onInit running...");
    this.observable = this.szamitoService.getAllCpu().subscribe((response: any) => {
      this.cpu_list = response;
      console.log("response : " + response);
    });
  }

  ngOnDestroy(): void {
    this.observable.unsubscribe();
    if (this.observable2 !== undefined) {
        this.observable2.unsubscribe();
    }
    if (this.observable3 !== undefined) {
      this.observable3.unsubscribe();
    }
  }

  list_all_cpu() {
    this.list_all_cpu_boolean = !this.list_all_cpu_boolean;
    console.log("Minden CPU listázása button clicked!")
    console.log(this.cpu_list[0]);
  }

  search_cpu_by_name() {
    if (this.search_cpu_input_value !== undefined) {
      this.search_cpu_by_name_boolean = true;
      console.log("Searching for: " + this.search_cpu_input_value);

      if (this.observable2 !== undefined) {
        this.observable2.unsubscribe();
      }

      this.observable2 = this.szamitoService.searchCpuByName(this.search_cpu_input_value).subscribe((response: any) => {
        this.cpu_list2 = response;
        console.log("response : " + response);
      });

    } else {
      console.log("Undefined! Nothing's happened.")
    }
  }

  search_case_by_name() {
    if (this.search_case_input_value !== undefined) {
      this.search_case_by_name_boolean = true;
      console.log("Searching for: " + this.search_case_input_value);

      if (this.observable3 !== undefined) {
        this.observable3.unsubscribe();
      }

      this.observable3 = this.szamitoService.searchCaseByName(this.search_case_input_value).subscribe((response: any) => {
        this.case_list = response;
        console.log("response : " + response);
      });

    } else {
      console.log("Undefined! Nothing's happened.")
    }
  }

}
