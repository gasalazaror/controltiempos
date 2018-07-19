import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ChartsModule } from '../../../node_modules/ng2-charts';




const routes: Routes = [{
	path: '',
	data: {
		title: 'Panel de control',
		urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Panel de control' }]
	},
	component: StarterComponent
}];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [StarterComponent]
})
export class StarterModule {


	
	

}

