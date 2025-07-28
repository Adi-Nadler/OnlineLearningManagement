import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrolmentService } from '../../services/enrolment.service';
import { Enrolment } from '../../../../models/enrolment.model';
import { Signal } from '@angular/core';
import { EnrolmentsListComponent } from '../../components/enrolments-list/enrolments-list.component';
import { EnrolmentFormComponent } from '../../components/enrolment-form/enrolment-form.component';

@Component({
  selector: 'app-enrolments-page',
  imports: [CommonModule, EnrolmentsListComponent, EnrolmentFormComponent],
  templateUrl: './enrolments-page.component.html',
  styleUrl: './enrolments-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnrolmentsPageComponent {
  enrolments: Signal<Enrolment[]>;
  selectedEnrolment: Enrolment | null = null;
  showForm = false;
  private isSubmitting = false;

  constructor(private enrolmentService: EnrolmentService) {
    this.enrolments = this.enrolmentService.enrolments;
  }

  onAddEnrolment() {
    this.selectedEnrolment = null;
    this.showForm = true;
  }

  onEditEnrolment(enrolment: Enrolment) {
    this.selectedEnrolment = enrolment;
    this.showForm = true;
  }

  onDeleteEnrolment(id: string) {
    this.enrolmentService.delete(id);
  }

  onFormSubmit(enrolment: Enrolment) {
    if (this.isSubmitting) {
      return; // Prevent double execution
    }
    
    this.isSubmitting = true;
    
    try {
      if (enrolment.enrolmentId) {
        this.enrolmentService.update(enrolment);
      } else {
        this.enrolmentService.add(enrolment);
      }
      
      this.showForm = false;
      this.selectedEnrolment = null;
    } finally {
      // Reset immediately after the operation
      this.isSubmitting = false;
    }
  }

  onFormCancel() {
    this.showForm = false;
    this.selectedEnrolment = null;
  }
}
