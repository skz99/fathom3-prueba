import { ComponentFactoryResolver, Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appModalHost]'
})
export class ModalHostDirective {

  constructor(public viewContainerRef: ViewContainerRef,
    public componentFactoryResolver: ComponentFactoryResolver) { }

  createComponent(component: any, data: any): any {
    const viewContainerRef = this.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(component);
    if (data) {
      Object.keys(data).forEach(key => {
        const obj = componentRef.instance as any;
        obj[key] = data[key];
      });
    }
    return componentRef.instance;
  }

}
