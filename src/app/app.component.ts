import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {LazyComponent} from "./lazy.component";
import {Injector} from "./injector";

@Component({
    selector: 'app-root',
    template: `
        <div #outlet></div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

    @ViewChild('outlet', {read: ViewContainerRef}) outlet: ViewContainerRef;

    component: ComponentRef<LazyComponent>;

    constructor(private injector: Injector, private cdRef: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        this.component = this.outlet.createComponent(this.injector.getFactory());

        Object.assign(this.component.instance, {prop1: 'prop1', prop2: 'prop2'});

        this.cdRef.detectChanges();

        // After 3 seconds set the components props to new values
        setTimeout(() => {
            Object.assign(this.component.instance, {prop1: 'prop3', prop2: 'prop4'});

            // these have no effect, even though calling markForCheck in the components prop setter does work
            // this.component.changeDetectorRef.markForCheck();
            // this.component.changeDetectorRef.detectChanges();
        }, 3000)
    }
}
