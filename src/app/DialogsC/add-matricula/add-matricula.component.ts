import {Component, Inject, OnInit} from '@angular/core';
import {formatDate} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConexionService} from '../../Servicios/conexion.service';
import {MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialogConfig, MatDialogRef, MatSelectChange} from '@angular/material';
import {Tipos} from '../../Data/Tipos';
import {AddPadreComponent} from '../add-padre/add-padre.component';
import {TiposT} from '../../Data/TiposT';
import {Turnos} from '../../Data/Turnos';
import {UsuarioService} from '../../Servicios/usuario.service';


@Component({
  selector: 'app-add-matricula',
  templateUrl: './add-matricula.component.html',
  styleUrls: ['./add-matricula.component.css']
})
export class AddMatriculaComponent implements OnInit {
  now = Date.now();
  form: FormGroup;
  private formSubmitAttempt: boolean;
  turnos: Turnos[];
  almuerzos: TiposT[];
  refrigerios: TiposT[];
  anios: Tipos[];
  comprobantes: Tipos[];
  keydatae = 'selest';
  keyerror = 'error';
  keymensa = 'mensaje';
  keydatat = 'turnos';
  keydataa = 'selmaxanios';
  keydataal = 'almuerzos';
  keydatar = 'refrigerios';
  keydatac = 'comprobantes';
  totalme1 = 0;
  totalma1 = 0;
  totala = 0;
  totalr = 0;
  suma = 0;
  idcosturn = 0;
  idalmuer = 0;
  idrefri = 0;
  fecha = new Date();
  sumasinmatricula = 0;
  dni = '';
  diasmes = 0;

  constructor(private conexion: ConexionService,
              public dialogRef: MatDialogRef<AddMatriculaComponent>,
              private fb: FormBuilder,
              private usuarioservicio: UsuarioService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dni = data.dni;
  }

  ngOnInit() {
    const fecha = formatDate(this.now, 'dd/MM/yyyy', 'en-US', '-0500');
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechains: ['', Validators.required],
      fechaini: ['', Validators.required],
      turno: ['', Validators.required],
      refrigerio: ['', Validators.required],
      almuerzo: ['', Validators.required],
      anio: ['', Validators.required],
      comprobante: ['', Validators.required],
      boleta: ['', Validators.required],
      totala: ['', Validators.required],
      totalr: ['', Validators.required],
      totalma: ['', Validators.required],
      totalme: ['', Validators.required],
      total: ['', Validators.required],
      descuento: ['', Validators.required],
      diasrestantes: ['', Validators.required],
      subtotalme: ['', Validators.required],
      subtotala: ['', Validators.required],
      subtotalr: ['', Validators.required],
    });
    this.form.get('nombres').disable();
    this.form.get('apellidos').disable();
    this.form.get('fechains').disable();
    this.form.get('totala').disable();
    this.form.get('totalr').disable();
    this.form.get('totalma').disable();
    this.form.get('totalme').disable();
    this.form.get('total').disable();
    this.form.get('diasrestantes').disable();
    this.form.get('subtotala').disable();
    this.form.get('subtotalr').disable();
    this.form.get('subtotalme').disable();
    this.form.patchValue({
      codigo: this.dni,
      fechains: fecha,
      descuento: 0
    });
    if (this.dni !== undefined) {
      this.Controlar(this.dni);
      this.form.get('codigo').disable();
    }
    this.LlenarTurnos();
    this.LLenarRefrigerios();
    this.LlenarAlmuerzos();
    this.LlenarAnios();
    this.LlenarComprobantes();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  AgregarMatricula() {
    const formData = new FormData();
    const aniomes = formatDate(this.fecha, 'yyyy-MM', 'en-US', '-0500');
    const fechaini0 = new Date(this.form.get('fechaini').value);
    const fechaini = formatDate(fechaini0, 'yyyy-MM-dd', 'en-US', '-0500');
    const fechains = formatDate(this.fecha, 'yyyy-MM-dd', 'en-US', '-0500');
    const usu = this.usuarioservicio.getUsuarioLogeadoen()[0].usu;
    const totalali = parseFloat(this.form.get('totala').value) + parseFloat(this.form.get('totalr').value);
    const total = parseFloat(this.sumasinmatricula.toString());
    const totalma = parseFloat(this.form.get('totalma').value);
    const descuento = parseFloat(this.form.get('descuento').value);
    let dma = 0.00;
    let pma = 0.00;
    let dme = 0.00;
    let pme = 0.00;
    let D1 = 0.00;
    if (totalma >= descuento) {
      dma = descuento;
      pma = totalma - descuento;
    } else {
      dma = totalma;
      D1 = descuento - totalma;
    }
    if (D1 <= total) {
      dme = D1;
      pme = total - D1;
    }
    formData.append('accion', 'addmatri');
    formData.append('fechains', fechains);
    formData.append('fechaini', fechaini);
    formData.append('idcostotur', this.idcosturn.toString());
    formData.append('idalmuer', this.idalmuer.toString());
    formData.append('idrefri', this.idrefri.toString());
    formData.append('estudiante', this.form.get('codigo').value);
    formData.append('anio', this.form.get('anio').value);
    formData.append('comprobante', this.form.get('comprobante').value);
    formData.append('boleta', this.form.get('boleta').value);
    formData.append('total', total.toString());
    formData.append('totalma', totalma.toString());
    formData.append('totalme', this.form.get('totalme').value);
    formData.append('totalali', totalali.toString());
    formData.append('dma', dma.toString());
    formData.append('dme', dme.toString());
    formData.append('pma', pma.toString());
    formData.append('pme', pme.toString());
    formData.append('aniomes', aniomes);
    formData.append('idusu', usu);
    this.conexion.servicio(formData).subscribe(
      respuesta => {
        Object.keys(respuesta).map(() => {
          // alert(respuesta[this.keymens]);
          if (respuesta[this.keyerror] === false) {
            this.dialogRef.close(respuesta[this.keymensa]);
          } else {
            alert(respuesta[this.keymensa]);
          }
        });
      }
    );
  }

  Cerrar() {
    this.dialogRef.close('Cancelado');
  }

  Controlar(value: any) {
    const formData = new FormData();
    formData.append('accion', this.keydatae);
    formData.append('id', value);
    this.conexion.servicio(formData).subscribe(
      estudiante => {
        Object.keys(estudiante).map(() => {
          if (estudiante[this.keyerror] === false) {
            this.form.patchValue({
              nombres: estudiante[this.keydatae][0].nombres,
              apellidos: estudiante[this.keydatae][0].apellidos
            });
          } else {
            this.form.patchValue({
              nombres: ['NO ENCONTRADO'],
              apellidos: ['NO ENCONTRADO']
            });
          }
        });
      }
    );
  }

  private LlenarTurnos() {
    const formData = new FormData();
    formData.append('accion', this.keydatat);
    this.conexion.servicio(formData).subscribe(
      turnos => {
        Object.keys(turnos).map(() => {
          this.turnos = turnos[this.keydatat];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  private LlenarAnios() {
    const formData = new FormData();
    formData.append('accion', this.keydataa);
    this.conexion.servicio(formData).subscribe(
      anios => {
        Object.keys(anios).map(() => {
          this.anios = anios[this.keydataa];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  private LLenarRefrigerios() {
    const formData = new FormData();
    formData.append('accion', this.keydatar);
    this.conexion.servicio(formData).subscribe(
      turnos => {
        Object.keys(turnos).map(() => {
          this.refrigerios = turnos[this.keydatar];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  private LlenarAlmuerzos() {
    const formData = new FormData();
    formData.append('accion', this.keydataal);
    this.conexion.servicio(formData).subscribe(
      turnos => {
        Object.keys(turnos).map(() => {
          this.almuerzos = turnos[this.keydataal];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  private LlenarComprobantes() {
    const formData = new FormData();
    formData.append('accion', this.keydatac);
    this.conexion.servicio(formData).subscribe(
      comprobantes => {
        // console.log(comprobantes[this.keydatac]);
        Object.keys(comprobantes).map(() => {
          this.comprobantes = comprobantes[this.keydatac];
          // console.log(key);
          // console.log(usuario[key]);
        });
      }
    );
  }

  Descontar(event: any) {
    const desc = event.target.value;
    const resta = this.suma - desc;
    this.form.patchValue({total: resta});
  }

  private Sumar() {
    const diasrestantes: number = this.form.get('diasrestantes').value;
    const totalmensu = this.financial((this.totalme1 * diasrestantes) / this.diasmes);
    const totalalmue = this.financial((this.totala * diasrestantes) / this.diasmes);
    const totalrefri = this.financial((this.totalr * diasrestantes) / this.diasmes);
    // this.suma = +this.totala + +this.totalr + +this.totalma1 + +this.totalme1;
    // this.sumasinmatricula = +this.totala + +this.totalr + +this.totalme1;
    this.suma = +totalalmue + +totalrefri + +this.totalma1 + +totalmensu;
    this.sumasinmatricula = +totalmensu + +totalrefri + +totalalmue;
    this.form.patchValue({
      total: this.suma, descuento: 0, totalme: totalmensu,
      totala: totalalmue, totalr: totalrefri
    });
  }

  financial(x) {
    return Number.parseFloat(x).toFixed(1);
  }

  Selecionar($event: MatSelectChange) {
    // console.log($event.value);
    this.form.patchValue({
      totalma: $event.value.totalma,
      subtotalme: $event.value.totalme
    });
    this.idcosturn = $event.value.id;
    this.totalma1 = $event.value.totalma;
    this.totalme1 = $event.value.totalme;
    this.suma = 0;
    this.Sumar();
  }

  SelecTotalAlmuerzo($event: MatSelectChange) {
    this.form.patchValue({subtotala: $event.value.total});
    this.suma = 0;
    this.idalmuer = $event.value.id;
    this.totala = $event.value.total;
    this.Sumar();
  }

  SelecTotalRefrigerio($event: MatSelectChange) {
    this.form.patchValue({subtotalr: $event.value.total});
    this.suma = 0;
    this.idrefri = $event.value.id;
    this.totalr = $event.value.total;
    this.Sumar();
  }

  diasEnUnMes(mes, anio) {
    return new Date(anio, mes, 0).getDate();
  }

  ObtenerDias($event: MatDatepickerInputEvent<never>) {
    const fecha = new Date($event.value);
    const anio = formatDate(fecha, 'yyyy', 'en-US', '-0500');
    const mes = formatDate(fecha, 'MM', 'en-US', '-0500');
    const dias1 = fecha.getDate();
    this.diasmes = this.diasEnUnMes(mes, anio);
    const diasrestantes1 = this.diasmes - dias1;
    this.form.patchValue({diasrestantes: diasrestantes1});
    this.Sumar();
  }
}
