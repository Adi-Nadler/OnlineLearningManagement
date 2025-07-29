import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  
  // Expose as readonly signal
  toasts = this.toastsSignal.asReadonly();

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private addToast(toast: Omit<Toast, 'id' | 'timestamp'>): void {
    const newToast: Toast = {
      ...toast,
      id: this.generateId(),
      timestamp: new Date(),
      duration: toast.duration || 5000
    };

    this.toastsSignal.update(toasts => [...toasts, newToast]);

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.removeToast(newToast.id);
      }, newToast.duration);
    }
  }

  success(message: string, title?: string, duration?: number): void {
    this.addToast({
      type: 'success',
      message,
      title: title || 'Success',
      duration
    });
  }

  error(message: string, title?: string, duration?: number): void {
    this.addToast({
      type: 'error',
      message,
      title: title || 'Error',
      duration: duration || 7000 // Errors stay longer
    });
  }

  info(message: string, title?: string, duration?: number): void {
    this.addToast({
      type: 'info',
      message,
      title: title || 'Info',
      duration
    });
  }

  warning(message: string, title?: string, duration?: number): void {
    this.addToast({
      type: 'warning',
      message,
      title: title || 'Warning',
      duration: duration || 6000
    });
  }

  removeToast(id: string): void {
    this.toastsSignal.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  clearAll(): void {
    this.toastsSignal.set([]);
  }
}
