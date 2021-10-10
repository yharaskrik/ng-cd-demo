import {ComponentFactoryResolver, Injectable} from "@angular/core";
import {LazyComponent} from "./lazy.component";

@Injectable({
    providedIn: 'root'
})
export class Injector {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    getFactory() {
        return this.componentFactoryResolver.resolveComponentFactory(LazyComponent)
    }
}