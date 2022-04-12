import { EventEmitter, ElementRef, NgZone, Renderer2, OnInit, OnDestroy } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class KeydownEnterDirective implements OnInit, OnDestroy {
    private host;
    private ngZone;
    private renderer;
    keydown: EventEmitter<any>;
    private keydownListener;
    constructor(host: ElementRef<HTMLElement>, ngZone: NgZone, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<KeydownEnterDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<KeydownEnterDirective, "[mwlKeydownEnter]", never, {}, { "keydown": "mwlKeydownEnter"; }, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZG93bi1lbnRlci5kaXJlY3RpdmUuZC50cyIsInNvdXJjZXMiOlsia2V5ZG93bi1lbnRlci5kaXJlY3RpdmUuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBOZ1pvbmUsIFJlbmRlcmVyMiwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEtleWRvd25FbnRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIGhvc3Q7XG4gICAgcHJpdmF0ZSBuZ1pvbmU7XG4gICAgcHJpdmF0ZSByZW5kZXJlcjtcbiAgICBrZXlkb3duOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgICBwcml2YXRlIGtleWRvd25MaXN0ZW5lcjtcbiAgICBjb25zdHJ1Y3Rvcihob3N0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Piwgbmdab25lOiBOZ1pvbmUsIHJlbmRlcmVyOiBSZW5kZXJlcjIpO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcbn1cbiJdfQ==