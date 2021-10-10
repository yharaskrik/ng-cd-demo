import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from "@angular/core";

@Component({
    selector: 'lazy',
    styles: [],
    template: `{{_prop1}} {{_prop2}}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponent {
    @Input() set prop1(prop1: string) {
        this._prop1 = prop1;

        // If prop 1 changes then marking this component for check does work when
        // CD is set ot OnPush, the mark for check is not needed when CD is Default
        // this.cdRef.markForCheck();
    }

    _prop1: string;

    @Input() set prop2(prop2: string) {
        this._prop2 = prop2;
    }

    _prop2: string;

    constructor(private cdRef: ChangeDetectorRef) {
    }
}