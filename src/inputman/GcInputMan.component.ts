import { OnChanges, SimpleChanges, ElementRef, OnInit, SimpleChange, Input, AfterContentInit, Component, Output, EventEmitter, ContentChildren, QueryList } from "@angular/core";
//import * as GC from "@grapecity/inputman";

const GC: any = (window as any).GC;
export function Property(setter?: string, getter?: string, isPramArr?: boolean, supportWithinConfig?: boolean, order?: number): Function {
    return (target: any, propertyName: string) => {
        var methods = <PropertyMethod>{
            setter: setter,
            getter: getter,
            isPramArr: isPramArr,
            supportWithinConfig: (typeof supportWithinConfig === "boolean") ? supportWithinConfig : true,
            order: (typeof order === "number") ? order : -1
        };
        if (!target.propDic) {
            target.propDic = {};
        }
        target.propDic[propertyName] = methods;
    };
}

const isEmpty = function (value: any): boolean {
    return value === undefined || value === null || value === "";
}

const getMethodPrefix = function (type: MethodType): string {
    if (type === MethodType.getter) {
        return "get";
    } else if (type === MethodType.setter) {
        return "set";
    }
}

export interface PropertyDictionary {
    [propertyName: string]: PropertyMethod
}

export interface PropertyMethod {
    getter: string;
    setter: string;
    isPramArr: boolean;
    supportWithinConfig: boolean;
    order: number;
}

export enum MethodType {
    getter,
    setter
}

export abstract class GcComponents implements OnChanges, AfterContentInit {
    protected _container: Element;
    protected _imCtrl: any;
    public propDic: PropertyDictionary;

    constructor(ref: ElementRef) {
        this._container = ref.nativeElement;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!this._imCtrl) {
            return;
        }

        Object.keys(changes).forEach((key: string) => {
            var currentValue = changes[key].currentValue;
            this.setValueToIMControl(key, currentValue);
        });
    }

    private setValueToIMControl(key: string, value: any): void {
        if (value === undefined) {
            return;
        }

        var setter = this.tryGetPropertyOperator(key, MethodType.setter);
        if (this.hasRealMethod(setter)) {
            if (this.propDic && this.propDic[key] && this.propDic[key].isPramArr === true) {
                this._imCtrl[setter].apply(this._imCtrl, value);
            } else {
                this._imCtrl[setter](value);
            }
        }
    }

    public ngAfterContentInit(): void {
        this.initGcComponent();
        this.onInitialized.emit(this._imCtrl);
        this.bindEvent();
        if (this.propDic) {
            var unSupportWithinConfigProps = Object.keys(this.propDic).filter(p => this.propDic[p] && this.propDic[p].supportWithinConfig === false);
            unSupportWithinConfigProps.sort((p1, p2) => {
                return this.propDic[p1].order - this.propDic[p2].order;
            });

            unSupportWithinConfigProps.forEach(p => {
                this.setValueToIMControl(p, this[p]);
            });
        }
    }

    protected abstract initGcComponent();

    protected abstract bindEvent();

    private tryGetPropertyOperator(propertyName: string, methodType: MethodType): string {
        var method: string = "";
        if (this.propDic && this.propDic[propertyName]) {
            method = methodType === MethodType.getter ? this.propDic[propertyName].getter : this.propDic[propertyName].setter;
            if (!isEmpty(method)) {
                return method;
            }
        }
        return getMethodPrefix(methodType) + propertyName[0].toUpperCase() + propertyName.slice(1);
    }

    private hasRealMethod(methodName: string): boolean {
        return this._imCtrl && typeof this._imCtrl[methodName] === "function";
    }

    @Output()
    public onInitialized: EventEmitter<object> = new EventEmitter();
}

export abstract class GcInputManBaseComponent extends GcComponents {

    @Input()
    public visible: boolean;
    @Input()
    public enabled: boolean;
    @Input()
    public readOnly: boolean;
    @Input()
    public exitOnLeftRightKey: string;
    @Input()
    public editMode: string;
    @Input()
    public watermarkDisplayNullText: string;
    @Input()
    public watermarkNullText: string;
    @Input()
    public acceptsCrlf: string;
    @Input()
    public useClipboard: boolean;
    @Input()
    public exitOnEnterKey: string;

    @Output()
    public onEditStatusChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public onInvalidInput: EventEmitter<object> = new EventEmitter();
    @Output()
    public onKeyExit: EventEmitter<object> = new EventEmitter();
    @Output()
    public onTextChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public onInput: EventEmitter<object> = new EventEmitter();
    @Output()
    public onFocusOut: EventEmitter<object> = new EventEmitter();
    @Output()
    public onKeyDown: EventEmitter<object> = new EventEmitter();
    @Output()
    public onKeyUp: EventEmitter<object> = new EventEmitter();
    @Output()
    public onSyncValueToOriginalInput:EventEmitter<object> = new EventEmitter();
    // For V2.1 Compatibility, we have to keep this property or event
    @Output()
    public textChange: EventEmitter<object> = new EventEmitter();

    protected bindEvent() {
        if (!this._imCtrl) {
            return;
        }

        this._imCtrl.onEditStatusChanged((s) => { this.onEditStatusChanged.emit(s); });
        this._imCtrl.onInvalidInput((s) => { this.onInvalidInput.emit(s); });
        this._imCtrl.onKeyExit((s) => { this.onKeyExit.emit(s); });
        this._imCtrl.onTextChanged((s) => { this.onTextChanged.emit(s);this.textChange.emit(s.getText()); });
        this._imCtrl.onInput((s) => { this.onInput.emit(s); });
        this._imCtrl.onFocusOut((s, e) => { this.onFocusOut.emit({ sender: s, eArgs: e }); });
        this._imCtrl.onKeyDown((s, e) => { this.onKeyDown.emit({ sender: s, eArgs: e }); });
        this._imCtrl.onKeyUp((s, e) => { this.onKeyUp.emit({ sender: s, eArgs: e }); });
        this._imCtrl.onSyncValueToOriginalInput((v, e) => { this.onSyncValueToOriginalInput.emit({ value: v, element: e }); });
    }
}

@Component({
    selector: 'gc-text-box',
    template: ``,
})
export class GcTextBoxComponent extends GcInputManBaseComponent {

    constructor(ref: ElementRef) {
        super(ref);
    }

    @Input()
    public autoConvert: boolean;
    @Input()
    public ellipsisString: string;
    @Input()
    public ellipsis: string;
    @Input()
    public format: string;
    @Input()
    public lengthAsByte: boolean;
    @Input()
    public maxLength: number;
    @Input()
    public passwordChar: string;
    @Input()
    public text: string;
    @Input()
    public useSystemPasswordChar: boolean;
    @Input()
    @Property("setIMEReadingStringAppend")
    public imeReadingStringAppend: boolean;
    @Input()
    @Property("setIMEReadingStringKanaMode")
    public imeReadingStringKanaMode: string;
    @Input()
    @Property("setIMEReadingStringEnableAlphabetReadingMapping")
    public imeReadingStringEnableAlphabetReadingMapping: boolean;
    @Input()
    public exitOnLastChar: boolean;
    @Input()
    public highlightText: boolean;
    // For V2.1 Compatibility, we have to keep this property or event
    @Input()
    public imeReadingString: string;
    @Output()
    public onIMEReadingStringOutput: EventEmitter<object> = new EventEmitter();
    // For V2.1 Compatibility, we have to keep this property or event
    @Output()
    public imeReadingStringChange: EventEmitter<object> = new EventEmitter();

    protected initGcComponent() {
        var input = document.createElement("input");
        this._container.appendChild(input);

        this["IMEReadingStringAppend"] = this.imeReadingStringAppend;
        this["IMEReadingStringKanaMode"] = this.imeReadingStringKanaMode;
        this["IMEReadingStringEnableAlphabetReadingMapping"] = this.imeReadingStringEnableAlphabetReadingMapping;

        this._imCtrl = new GC.InputMan.GcTextBox(input, this as any);
    }

    protected bindEvent() {
        if (!this._imCtrl) {
            return;
        }

        super.bindEvent();
        this._imCtrl.onIMEReadingStringOutput((s, e) => { 
            this.onIMEReadingStringOutput.emit({ sender: s, eArgs: e });
            this.imeReadingStringChange.emit(s.getIMEReadingString());
        });
    }
}

@Component({
    selector: 'gc-number',
    template: ``
})
export class GcNumberComponent extends GcInputManBaseComponent {

    constructor(ref: ElementRef) {
        super(ref);
    }

    @Input()
    public value: number;
    @Input()
    public text: string;
    @Input()
    public watermarkZeroText: string;
    @Input()
    public formatDigit: string;
    @Input()
    public displayPositivePrefix: string;
    @Input()
    public displayFormatDigit: string;
    @Input()
    public maxValue: number | string;
    @Input()
    public minValue: number | string;
    @Input()
    public positivePrefix: string;
    @Input()
    public positiveSuffix: string;
    @Input()
    public displayPositiveSuffix: string;
    @Input()
    public negativePrefix: string;
    @Input()
    public displayNegativePrefix: string;
    @Input()
    public negativeSuffix: string;
    @Input()
    public displayNegativeSuffix: string;
    @Input()
    public valueSign: string;
    @Input()
    public adjustValueOnFocus: boolean;
    @Input()
    public allowDeleteToNull: boolean;
    @Input()
    public clearAction: string;
    @Input()
    public acceptsDecimal: string;
    @Input()
    public currencySymbol: string;
    @Input()
    public decimalPoint: string;
    @Input()
    public maxMinBehavior: string;
    @Input()
    public separator: string;
    @Input()
    public watermarkDisplayZeroText: string;
    @Input()
    public highlightText: boolean;
    @Input()
    public allowSpin: boolean;
    @Input()
    public showSpinButton: boolean;
    @Input()
    public spinButtonPosition: string;
    @Input()
    public showNumericPad: boolean;
    @Input()
    public numericPadPosition: string;
    @Output()
    public onSpinDown: EventEmitter<object> = new EventEmitter();
    @Output()
    public onSpinUp: EventEmitter<object> = new EventEmitter();
    @Output()
    public onInvalidRange: EventEmitter<object> = new EventEmitter();
    @Output()
    public onValueChanged: EventEmitter<object> = new EventEmitter();
    // For V2.1 Compatibility, we have to keep this property or event
    @Output()
    public valueChange: EventEmitter<object> = new EventEmitter();

    protected initGcComponent() {
        var element = document.createElement('input');
        this._container.appendChild(element);
        this._imCtrl = new GC.InputMan.GcNumber(element, this as any);
    }

    protected bindEvent() {
        if (!this._imCtrl) {
            return;
        }

        super.bindEvent();
        this._imCtrl.onSpinDown((s) => { this.onSpinDown.emit(s); });
        this._imCtrl.onSpinUp((s) => { this.onSpinUp.emit(s); });
        this._imCtrl.onInvalidRange((s) => { this.onInvalidRange.emit(s); });
        this._imCtrl.onValueChanged((s) => { 
            this.onValueChanged.emit(s);
            this.valueChange.emit(s.getValue());
        });
    }

    public clear(): void {
        return this._imCtrl.clear();
    }
}

@Component({
    selector: 'gc-datetime',
    template: ``
})
export class GcDateTimeComponent extends GcInputManBaseComponent {
    constructor(ref: ElementRef) {
        super(ref);
    }

    protected initGcComponent() {
        var element = document.createElement('input');
        this._container.appendChild(element);
        this._imCtrl = new GC.InputMan.GcDateTime(element, this as any);
    }

    @Input()
    public text: string;
    @Property("", "", false, false)
    @Input()
    public number: boolean;
    @Input()
    public maxDate: Date | string;
    @Input()
    public minDate: Date | string;
    @Input()
    public formatPattern: string;
    @Input()
    public spinIncrement: number;
    @Input()
    public spinOnKeys: boolean;
    @Input()
    public spinWrap: boolean;
    @Input()
    public allowSpin: boolean;
    @Input()
    public displayFormatPattern: string;
    @Input()
    public watermarkEmptyEraText: string;
    @Input()
    public promptChar: string;
    @Input()
    public AMDesignator: string;
    @Input()
    public PMDesignator: string;
    @Input()
    public twoDigitYearMax: number;
    @Input()
    public hour12Mode: string;
    @Input()
    public tabAction: string;
    @Input()
    public maxMinBehavior: string;
    @Input()
    public midnightAs24: boolean;
    @Input()
    public showLiterals: string;
    @Input()
    public adjustValueOnFocus: boolean;
    @Input()
    public useTwoDigitYearMax: boolean;
    @Input()
    public validateMode: string;
    @Input()
    public clipContent: string;
    @Input()
    public value: Date | string;
    @Input()
    public watermarkDisplayEmptyEraText: string;
    @Input()
    public dropDownConfig: object;
    @Input()
    public exitOnLastChar: boolean;
    @Input()
    public highlightText: string;
    @Input()
    public showSpinButton: boolean;
    @Input()
    public spinButtonPosition: string;
    @Input()
    public showDropDownButton: boolean;
    @Input()
    public dropDownButtonAlignment: string;
    @Output()
    public onSpinDown: EventEmitter<object> = new EventEmitter();
    @Output()
    public onSpinUp: EventEmitter<object> = new EventEmitter();
    @Output()
    public onInvalidRange: EventEmitter<object> = new EventEmitter();
    @Output()
    public onInvalidValue: EventEmitter<object> = new EventEmitter();
    @Output()
    public onNumberChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public onValueChanged: EventEmitter<object> = new EventEmitter();
    // For V2.1 Compatibility, we have to keep this property or event
    @Output()
    public numberChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public valueChange: EventEmitter<object> = new EventEmitter();

    protected bindEvent() {
        if (!this._imCtrl) {
            return;
        }

        super.bindEvent();
        this._imCtrl.onSpinDown((s) => { this.onSpinDown.emit(s); });
        this._imCtrl.onSpinUp((s) => { this.onSpinUp.emit(s); });
        this._imCtrl.onInvalidRange((s) => { this.onInvalidRange.emit(s); });
        this._imCtrl.onInvalidValue((s) => { this.onInvalidValue.emit(s); });
        this._imCtrl.onNumberChanged((s) => { 
            this.onNumberChanged.emit(s);
            this.numberChange.emit(s.getNumber()); 
        });
        this._imCtrl.onValueChanged((s) => { 
            this.onValueChanged.emit(s);
            this.valueChange.emit(s.getValue());
        });
    }

}

interface Dimensions {
    width: number;
    height: number;
}

@Component({
    selector: 'gc-calendar',
    template: ``
})
export class GcCalendarComponent extends GcComponents {
    constructor(ref: ElementRef) {
        super(ref);
    }

    protected initGcComponent() {
        var element = document.createElement('div');
        this._container.appendChild(element);
        if (Array.isArray((this as any).calendarDimensions)) {
            (this as any).calendarDimensions = <Dimensions>{
                width: (this as any).calendarDimensions[0],
                height: (this as any).calendarDimensions[1]
            }
        }
        this._imCtrl = new GC.InputMan.GcCalendar(element, this as any);
    }

    @Input()
    public visible: boolean;
    @Input()
    public maxSelectionCount: number;
    @Input()
    public selectionMode: string;
    @Input()
    public selectedDate: Date;
    @Input()
    public enabled: boolean;
    @Input()
    public weekTitleSelect: boolean;
    @Input()
    public weekNumberSelect: boolean;
    @Input()
    public focusDate: Date;
    @Input()
    public maxDate: Date;
    @Input()
    public minDate: Date;
    @Input()
    public allowSelection: string;
    @Input()
    public emptyRows: number;
    @Input()
    public firstDayOfWeek: number;
    @Input()
    public firstFiscalMonth: number;
    @Input()
    public firstMonthInView: string;
    @Input()
    public yearMonthFormat: string;
    @Input()
    public headerFormat: string;
    @Input()
    public showZoomButton: boolean;
    @Input()
    public showRokuyou: number;
    @Input()
    public showHeader: boolean;
    @Input()
    public showToday: boolean;
    @Input()
    public showWeekNumber: boolean;
    @Input()
    public showTrailing: boolean;
    @Input()
    public calendarYear: string;
    @Input()
    public showNavigator: boolean;
    @Input()
    public navigatorOrientation: string;
    @Input()
    public overrideTipText: string;
    @Input()
    public calendarType: string;
    @Property("setCalendarDimensions", "", true)
    @Input()
    public calendarDimensions: Array<number>;
    @Output()
    public onClickDate: EventEmitter<object> = new EventEmitter();
    @Output()
    public onScrolled: EventEmitter<object> = new EventEmitter();
    @Output()
    public onFocusDateChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public onSelectedDateChanged: EventEmitter<object> = new EventEmitter();
    // For V2.1 Compatibility, we have to keep this property or event
    @Output()
    public focusDateChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public selectedDateChange: EventEmitter<object> = new EventEmitter();


    protected bindEvent() {
        if (!this._imCtrl) {
            return;
        }

        this._imCtrl.onClickDate((s) => { this.onClickDate.emit(s) });
        this._imCtrl.onScrolled((s) => { this.onScrolled.emit(s) });
        this._imCtrl.onFocusDateChanged((s) => { 
            this.onFocusDateChanged.emit(s);
            this.focusDateChange.emit(s.getFocusDate());
        });
        this._imCtrl.onSelectedDateChanged((s) => { 
            this.onSelectedDateChanged.emit(s);
            this.selectedDateChange.emit(s.getSelectedDate());
        });
    }
}

@Component({
    selector: 'gc-mask',
    template: ``
})
export class GcMaskComponent extends GcInputManBaseComponent {

    constructor(ref: ElementRef) {
        super(ref);
    }

    @Input()
    public autoConvert: boolean;
    @Input()
    public value: any;
    @Input()
    public formatPattern: string;
    @Input()
    public promptChar: string;
    @Input()
    public showLiterals: string;
    @Input()
    public tabAction: string;
    @Input()
    public text: string;
    @Input()
    public clipContent: string;
    @Input()
    public allowSpin: boolean;
    @Input()
    public exitOnLastChar: boolean;
    @Input()
    public highlightText: string;
    @Input()
    public showSpinButton: boolean;
    @Input()
    public spinButtonPosition: string;
    @Input()
    // For V2.1 Compatibility, we have to keep this property or event
    public valueIsFull: boolean;
    @Output()
    public onTextChanging: EventEmitter<object> = new EventEmitter();
    @Output()
    public onSpinDown: EventEmitter<object> = new EventEmitter();
    @Output()
    public onSpinUp: EventEmitter<object> = new EventEmitter();
    @Output()
    public onValueChanged: EventEmitter<object> = new EventEmitter();
    // For V2.1 Compatibility, we have to keep this property or event
    @Output()
    public valueChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public valueIsFullChange: EventEmitter<object> = new EventEmitter();

    protected initGcComponent() {
        var input = document.createElement('input');
        this._container.appendChild(input);
        this._imCtrl = new GC.InputMan.GcMask(input, this as any);
    }

    protected bindEvent() {
        if (!this._imCtrl) {
            return;
        }

        super.bindEvent();
        this._imCtrl.onInput((s) => {
            this.valueIsFullChange.emit(s.getValueIsFull());
        });
        this._imCtrl.onTextChanging((s, e) => { this.onTextChanging.emit({ sender: s, eArgs: e }) });
        this._imCtrl.onSpinDown((s) => { this.onSpinDown.emit(s) });
        this._imCtrl.onSpinUp((s) => { this.onSpinUp.emit(s) });
        this._imCtrl.onValueChanged((s) => { 
            this.onValueChanged.emit(s);
            this.valueChange.emit(s.getValue());
            this.valueIsFullChange.emit(s.getValueIsFull()); 
        });
    }
}

@Component({
    selector: 'gc-list-box-column',
    template: ``,
})
export class GcListBoxColumnComponent {


    @Input()
    public name: string;
    @Input()
    public label: string;
    @Input()
    public width: number;
    @Input()
    public isValuePath: boolean;
    @Input()
    public visible: boolean;
    @Input()
    public clickSort: boolean;
    @Input()
    public contentAlignment: string;
    @Input()
    public headerAlignment: string;
}

@Component({
    selector: 'gc-list-box',
    template: ``,
})
export class GcListBoxComponent extends GcComponents {

    constructor(ref: ElementRef) {
        super(ref);
    }

    @Input()
    public items: Array<object>;
    @Input()
    public columns: Array<object> = new Array();
    @Input()
    public virtualMode: boolean;
    @Input()
    public allowResize: boolean;
    @Input()
    public selectionMode: string;
    @Input()
    @Property("", "", false, false)
    public selectedIndex: number;
    @Input()
    @Property("", "", false, false)
    public checkedIndex: number;
    @Input()
    @Property("", "", false, false)
    public selectedIndices: number[];
    @Input()
    @Property("", "", false, false)
    public checkedIndices: number[];
    @Input()
    public allowColumnResize: boolean;
    @Input()
    public overflow: string;
    @Property("resizeWidth")
    @Input()
    public width: number;
    @Property("resizeHeight")
    @Input()
    public height: number;
    @Input()
    public itemHeight: number;
    @Input()
    public checkOnClick: boolean;
    @Property('setVisibleItemCount')
    @Input()
    public visibleItems: number;
    @Input()
    public visible: boolean;
    @Input()
    public enabled: boolean;
    @Input()
    public multiColumn: boolean;
    @Input()
    public colHeaderHeight: number;
    @Input()
    public showHeader: boolean;
    @Input()
    public valueMemberPath: string;
    @Input()
    public displayMemberPath: string;
    @Input()
    public showCheckBox: boolean;
    @Input()
    public itemTemplate: string | string[];
    @Input()
    public headerTemplate: string
    @Input()
    public footerTemplate: string;
    @Input()
    public load: Function;
    @Input()
    public pageSize: number;
    @Input()
    public generatingItem: Function;
    @Input()
    public selectTemplate: Function;
    @Input()
    public formatItem: Function;
    @Output()
    public checkedChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public selectedChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public focusedChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public itemClick: EventEmitter<object> = new EventEmitter();
    @Output()
    public loadComplete: EventEmitter<object> = new EventEmitter();
    @Output()
    public itemsChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public selectedIndexChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public checkedIndexChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public selectedIndicesChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public checkedIndicesChange: EventEmitter<object> = new EventEmitter();
    @ContentChildren(GcListBoxColumnComponent) 
    public columnComponents: QueryList<GcListBoxColumnComponent>;

    protected initGcComponent(): void {
        if (this.columnComponents) {
            this.columnComponents.forEach((column: GcListBoxColumnComponent) => {
                this.columns.push({
                    name: column.name,
                    label: column.label,
                    width: column.width,
                    isValuePath: column.isValuePath,
                    visible: column.visible,
                    clickSort: column.clickSort,
                    contentAlignment: column.contentAlignment,
                    headerAlignment: column.headerAlignment
                });
            });
        }
        var element = document.createElement('div');
        this._container.appendChild(element);
        this._imCtrl = new GC.InputMan.GcListBox(element, this as any);
        this.bindEvent();
    }


    protected bindEvent(): void {
        if (!this._imCtrl) {
            return;
        }

        this._imCtrl.addEventListener('checkedchanged', (eventArgs) => {
            this.checkedChanged.emit(eventArgs);
            this.checkedIndexChange.emit(this._imCtrl.getCheckedIndices()[0]);
            this.checkedIndicesChange.emit(this._imCtrl.getCheckedIndices());
        });
        this._imCtrl.addEventListener('selectedchanged', (eventArgs) => {
            this.selectedChanged.emit(eventArgs);
            this.selectedIndexChange.emit(this._imCtrl.getSelectedIndex());
            this.selectedIndicesChange.emit(this._imCtrl.getSelectedIndices());
        });
        this._imCtrl.addEventListener('focusedchanged', (eventArgs) => {
            this.focusedChanged.emit(eventArgs);
        });
        this._imCtrl.addEventListener('itemclick', (sender, eventArgs) => {
            this.itemClick.emit({ sender: sender, eArgs: eventArgs });
        });
        this._imCtrl.addEventListener('loadcomplete', (eventArgs) => {
            this.loadComplete.emit(eventArgs);
        });
        this._imCtrl.addEventListener('itemschanged', (eventArgs) => {
            this.itemsChanged.emit(eventArgs);
        });


    }

}

@Component({
    selector: 'gc-combo-box-column',
    template: ``,
})
export class GcComboBoxColumnComponent {
    @Input()
    public name: string;
    @Input()
    public label: string;
    @Input()
    public width: number;
    @Input()
    public isValuePath: boolean;
    @Input()
    public visible: boolean;
    @Input()
    public clickSort: boolean;
    @Input()
    public contentAlignment: string;
    @Input()
    public headerAlignment: string;
}

@Component({
    selector: 'gc-combo-box',
    template: ``,
})
export class GcComboBoxComponent extends GcComponents {

    constructor(ref: ElementRef) {
        super(ref);
    }

    @Input()
    public items: Array<object>;
    @Input()
    @Property("", "", false, false)
    public selectedValue: object;
    @Input()
    public allowDropDownResize: boolean;
    @Input()
    public readOnly: boolean;
    @Input()
    public autoSelect: boolean;
    @Input()
    @Property("", "", false, false)
    public selectedIndex: number;
    @Input()
    public autoFilter: string;
    @Input()
    public visible: boolean;
    @Input()
    public enabled: boolean;
    @Property("setEditable")
    @Input()
    public isEditable: boolean;
    @Input()
    public watermarkDisplayNullText: string;
    @Input()
    public watermarkNullText: string;
    @Input()
    public highlightText: boolean;
    @Input()
    public exitOnEnterKey: string;
    @Input()
    public useClipboard: boolean;
    @Input()
    public acceptsCrlf: string;
    @Input()
    public ellipsis: string;
    @Input()
    public ellipsisString: string;
    @Input()
    public exitOnLeftRightKey: string;
    
    @Input()
    public editMode: string;
    @Input()
    @Property("", "", false, false)
    public checkedValues: any[];
    @Input()
    @Property("", "", false, false)
    public selectedItem: any;
    @Input()
    @Property("", "", false, false)
    public checkedItems: any[];
    @Input()
    @Property("", "", false, false)
    public checkedIndices: any[];
    @Input()
    public showDropDownButton: boolean;
    @Input()
    public dropDownButtonPosition: string;
    @Input()
    public showSpinButton: boolean;
    @Input()
    public spinButtonPosition: string;
    @Input()
    public dropDownWidth: number;
    @Input()
    public dropDownHeight: number;
    @Input()
    public minPrefixLength: number;
    @Input()
    public isMultiSelect: boolean;
    @Input()
    public dropDownOverflow: string;
    @Input()
    public visibleItems: number;
    @Input()
    public itemHeight: number;
    @Input()
    public columns: object[] = new Array();
    @Input()
    public showHeader: boolean;
    @Input()
    public valueMemberPath: string;
    @Input()
    public displayMemberPath: string;
    @Input()
    public checkOnClick: boolean;
    @Input()
    public itemTemplate: string | string[];
    @Input()
    public headerTemplate: string;
    @Input()
    public footerTemplate: string;
    @Input()
    public load: Function;
    @Input()
    public pageSize: number;
    @Input()
    public virtualMode: boolean;
    @Input()
    public generatingItem: Function;
    @Input()
    public selectTemplate: Function;
    @Input()
    public formatItem: Function;
    @Input()
    public allowColumnResize: boolean;
    @Input()
    public colHeaderHeight: number;
    @Output()
    public selectedChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public checkedChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public dropDownClosed: EventEmitter<object> = new EventEmitter();
    @Output()
    public dropDownOpened: EventEmitter<object> = new EventEmitter();
    @Output()
    public textChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public spinDown: EventEmitter<object> = new EventEmitter();
    @Output()
    public spinUp: EventEmitter<object> = new EventEmitter();
    @Output()
    public itemsChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public itemsChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public selectedValueChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public selectedIndexChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public checkedValuesChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public selectedItemChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public checkedItemsChange: EventEmitter<object> = new EventEmitter();
    @Output()
    public checkedIndicesChange: EventEmitter<object> = new EventEmitter();

    @ContentChildren(GcComboBoxColumnComponent) 
    public columnComponents: QueryList<GcComboBoxColumnComponent>;

    protected initGcComponent(): void {
        if (this.columnComponents) {
            this.columnComponents.forEach((column: GcComboBoxColumnComponent) => {
                this.columns.push({
                    name: column.name,
                    label: column.label,
                    width: column.width,
                    isValuePath: column.isValuePath,
                    visible: column.visible,
                    clickSort: column.clickSort,
                    contentAlignment: column.contentAlignment,
                    headerAlignment: column.headerAlignment
                });
            });
        }
        var element = document.createElement('select');
        this._container.appendChild(element);
        this._imCtrl = new GC.InputMan.GcComboBox(element, this as any);
        this.bindEvent();
    }
    protected bindEvent(): void {
        if (!this._imCtrl) {
            return;
        }

        this._imCtrl.addEventListener('selectedchanged', (eventArgs) => {
            this.selectedChanged.emit(eventArgs);
            this.selectedValueChange.emit(this._imCtrl.getSelectedValue());
            this.selectedIndexChange.emit(this._imCtrl.getSelectedIndex());
            this.selectedItemChange.emit(this._imCtrl.getSelectedItem());
        });
        this._imCtrl.addEventListener('checkedchanged', (eventArgs) => {
            this.checkedChanged.emit(eventArgs);
            this.checkedValuesChange.emit(this._imCtrl.getCheckedValues());
            this.checkedItemsChange.emit(this._imCtrl.getCheckedItems());
            this.checkedIndicesChange.emit(this._imCtrl.getCheckedIndices());
        });
        this._imCtrl.addEventListener('dropDownClosed', (eventArgs) => {
            this.dropDownClosed.emit(eventArgs);
        });
        this._imCtrl.addEventListener('dropDownOpened', (eventArgs) => {
            this.dropDownOpened.emit(eventArgs);
        });
        this._imCtrl.addEventListener('textChanged', (eventArgs) => {
            this.textChanged.emit(eventArgs);
        });
        this._imCtrl.addEventListener('spinDown', (eventArgs) => {
            this.spinDown.emit(eventArgs);
        });
        this._imCtrl.addEventListener('spinUp', (eventArgs) => {
            this.spinUp.emit(eventArgs);
        });
        this._imCtrl.addEventListener('itemsChanged', (eventArgs) => {
            this.itemsChanged.emit(eventArgs);
            this.itemsChange.emit(this._imCtrl.getItems());
        });
    }
}

@Component({
    selector: 'gc-datetime-picker',
    template: ``,
})
export class GcDateTimePickerComponent extends GcComponents {
    constructor(ref: ElementRef) {
        super(ref);
    }

    @Property("setValue")
    @Input()
    public selectedValue: Date;
    @Input()
    public maxDate: object;
    @Input()
    public minDate: boolean;
    @Property('setPickerType')
    @Input()
    public type: string;
    @Input()
    public minuteInterval: string;
    @Input()
    public secondsInterval: string;
    @Input()
    public visible: boolean;
    @Property('showSeconds', "", false, false)
    @Input()
    public hasSeconds: string;
    @Property('showMidnightAs24', "", false, false)
    @Input()
    public showMidnightAs24: string;
    @Input()
    public yearFormat: Function;
    @Input()
    public monthFormat: Function;
    @Input()
    public dayFormat: Function;
    @Output()
    public selectedDateChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public selectedValueChange: EventEmitter<object> = new EventEmitter();

    protected initGcComponent(): void {

        var element = document.createElement('div');
        this._container.appendChild(element);
        this._imCtrl = new GC.InputMan.GcDateTimePicker(element, this as any);
        this.bindEvent();
    }

    protected bindEvent(): void {
        if (!this._imCtrl) {
            return;
        }

        this._imCtrl.addEventListener('selecteddatechanged', (sender, eventArgs) => {
            this.selectedDateChanged.emit({ sender: sender, eArgs: eventArgs });
            this.selectedValueChange.emit(this._imCtrl.getValue());
        });
    }

}

@Component({
    selector: 'gc-tip-notifier',
    template: ``,
})
export class GcTipNotifierComponent extends GcComponents {

    protected bindEvent() { }
    constructor(ref: ElementRef) {
        super(ref);
    }

    @Input()
    public direction: string;
    @Input()
    public position: string;
    @Input()
    public directionPriority: Array<string>;
    @Input()
    public template: string;
    @Input()
    public failMessage: string;
    @Input()
    public successMessage: string;
    @Input()
    public tipState: string;

    private _gcTextBox: any;

    protected initGcComponent(): void {
        var element = document.createElement('input');
        this._container.appendChild(element);
        this._gcTextBox = new GC.InputMan.GcTextBox(element);
        this._imCtrl = new GC.InputMan.GcTipNotifier(this._gcTextBox, this as any);
    }

    public onFail(): void {
        return this._imCtrl.onFail();
    }

    public onSuccess(): void {
        return this._imCtrl.onSuccess();
    }

    public onClear(): void {
        return this._imCtrl.onClear();
    }

}

@Component({
    selector: 'gc-icon-notifier',
    template: ``,
})
export class GcIconNotifierComponent extends GcComponents {

    protected bindEvent() {}
    constructor(ref: ElementRef) {
        super(ref);
    }

    @Input()
    public direction: string;
    @Property('setFailIconSrc')
    @Input()
    public failIcon: string;
    @Property('setSuccessIconSrc')
    @Input()
    public successIcon: string;
    @Input()
    public failMessage: string;
    @Input()
    public successMessage: string;

    private _gcTextBox: any;

    protected initGcComponent(): void {
        var element = document.createElement('input');
        this._container.appendChild(element);
        this._gcTextBox = new GC.InputMan.GcTextBox(element);
        this._imCtrl = new GC.InputMan.GcIconNotifier(this._gcTextBox, this as any);
    }

    public onFail(): void {
        return this._imCtrl.onFail();
    }

    public onSuccess(): void {
        return this._imCtrl.onSuccess();
    }

    public onClear(): void {
        return this._imCtrl.onClear();
    }

}

@Component({
    selector: 'gc-multiline-textbox',
    template: ``,
})
export class GcMultilineTextBoxComponent extends GcInputManBaseComponent {

    constructor(ref: ElementRef) {
        super(ref);
    }

    @Input()
    public countWrappedLine;
    @Input()
    public lengthAsByte;
    @Input()
    public maxLength;
    @Input()
    public maxLineCount;
    @Input()
    @Property("setIMEReadingStringKanaMode")
    public imeReadingStringKanaMode;
    @Input()
    public scrollBarMode;
    @Input()
    public scrollBars;
    @Input()
    public wordWrap;
    @Input()
    public acceptsReturn;
    @Input()
    public acceptsTab;
    @Input()
    @Property("setIMEReadingStringAppend")
    public imeReadingStringAppend;
    @Input()
    public height;
    @Input()
    @Property("setIMEReadingStringEnableAlphabetReadingMapping")    
    public imeReadingStringEnableAlphabetReadingMapping;
    @Input()
    public exitOnLastChar;
    @Input()
    public highlightText;
    @Input()
    public format: string;
    @Input()
    public autoConvert: boolean;
    @Input()
    public text: string;
    @Input()
    public lines: Array<string>;
    // For V2.1 Compatibility, we have to keep this property or event
    @Input()
    public imeReadingString: string;
    @Output()
    public onEditStatusChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public onInvalidInput: EventEmitter<object> = new EventEmitter();
    @Output()
    public onKeyExit: EventEmitter<object> = new EventEmitter();
    @Output()
    public onTextChanged: EventEmitter<object> = new EventEmitter();
    @Output()
    public onIMEReadingStringOutput: EventEmitter<object> = new EventEmitter();
    @Output()
    public textChange: EventEmitter<object> = new EventEmitter();
    // For V2.1 Compatibility, we have to keep this property or event
    @Output()
    public imeReadingStringChange: EventEmitter<object> = new EventEmitter();

    protected initGcComponent(): void {
        var element = document.createElement('textarea');
        this._container.appendChild(element);
        
        this["IMEReadingStringAppend"] = this.imeReadingStringAppend;
        this["IMEReadingStringKanaMode"] = this.imeReadingStringKanaMode;
        this["IMEReadingStringEnableAlphabetReadingMapping"] = this.imeReadingStringEnableAlphabetReadingMapping;

        this._imCtrl = new GC.InputMan.GcMultiLineTextBox(element, this as any);
        this.bindEvent();
    }

    protected bindEvent(): void {
        if (!this._imCtrl) {
            return;
        }

        super.bindEvent();
        this._imCtrl.onIMEReadingStringOutput((eventArgs) => {
            this.onIMEReadingStringOutput.emit(eventArgs);
            this.imeReadingStringChange.emit(this._imCtrl.getIMEReadingString());
        });
    }

}
