import { Component, enableProdMode } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

enableProdMode();

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public log(text: string): void {
        console.log(text);
    }

    public parseDimensionParam(text: string): number {
        if (!text) {
            return 1;
        }
        return parseInt(text);
    }
    // GcMask start
    public gcMaskAutoConvert = true;
    public gcMaskValue;
    public gcMaskFormatPattern;
    public gcMaskPromptChar;
    public gcMaskShowLiterals = "Always";
    public gcMaskTabAction = "Field";
    public gcMaskText;
    public gcMaskClipContent = "IncludeLiterals";
    public gcMaskAllowSpin = true;
    public gcMaskExitOnLastChar = true;
    public gcMaskHighlightText = "Field";
    public gcMaskVisible = true;
    public gcMaskEnabled = true;
    public gcMaskReadOnly = false;
    public gcMaskExitOnLeftRightKey = "Both";
    public gcMaskEditMode = "Insert";
    public gcMaskWatermarkDisplayNullText = "WaterDisplayNullText";
    public gcMaskWatermarkNullText = "WatermarkNullText";
    public gcMaskAcceptsCrlf = "NoControl";
    public gcMaskUseClipboard = true;
    public gcMaskExitOnEnterKey = "Both";
    // GcMask end

    // GcCalendar start
    public gcCalendarVisible = true;
    public gcCalendarMaxSelectionCount = 7;
    public gcCalendarSelectionMode = '0';
    public gcCalendarSelectedDate = new Date();
    public gcCalendarEnabled = true;
    public gcCalendarWeekTitleSelect;
    public gcCalendarWeekNumberSelect;
    public gcCalendarFocusDate = new Date();
    public gcCalendarMaxDate = new Date("12/13/2020");
    public gcCalendarMinDate = new Date("12/13/2000");
    public gcCalendarAllowSelection = '0';
    public gcCalendarEmptyRows = '0';
    public gcCalendarFirstDayOfWeek = '0x00';
    public gcCalendarFirstFiscalMonth = '0';
    public gcCalendarFirstMonthInView = '0';
    public gcCalendarYearMonthFormat;
    public gcCalendarHeaderFormat;
    public gcCalendarShowZoomButton;
    public gcCalendarShowRokuyou = '0x00';
    public gcCalendarShowHeader;
    public gcCalendarShowToday;
    public gcCalendarShowWeekNumber;
    public gcCalendarShowTrailing;
    public gcCalendarYear = '0';
    public gcCalendarShowNavigator = '1';
    public gcCalendarNavigatorOrientation = '1';
    public gcCalendarOverrideTipText;
    public gcCalendarType = 'monthday';
    public gcCalenarDimensions = [1, 1];
    public gcCalenarDimensionWidth = 1;
    public gcCalenarDimensionHeight = 1;

    // GcCalendar end

    // GcDateTime start
    public gcDateTimeText = "2018/11/28 10:11:50";
    public gcDateTimeMaxDate = new Date("2019-11-17T06:56:12.670");
    public gcDateTimeMinDate = new Date("2010-11-17T06:56:12.670");
    public gcDateTimeFormatPattern = 'yyyy/MM/dd HH:mm:ss';
    public gcDateTimeSpinIncrement = 1;
    public gcDateTimeSpinOnKeys;
    public gcDateTimeSpinWrap = true;
    public gcDateTimeAllowSpin;
    public gcDateTimeDisplayFormatPattern = 'yyy/M/d H:mm:ss';
    public gcDateTimeWatermarkEmptyEraText;
    public gcDateTimePromptChar = '_';
    public gcDateTimeAMDesignator = 'AM';
    public gcDateTimePMDesignator = 'PM';
    public gcDateTimeTwoDigitYearMax = 2050;
    public gcDateTimeHour12Mode = 'Hour0As12';
    public gcDateTimeTabAction = 'Control';
    public gcDateTimeMaxMinBehavior = 'adjusttomaxmin';
    public gcDateTimeMidnightAs24;
    public gcDateTimeShowLiterals = 'always';
    public gcDateTimeAdjustValueOnFocus;
    public gcDateTimeUseTwoDigitYearMax;
    public gcDateTimeValidateMode="validateex";
    public gcDateTimeClipContent = 'IncludeLiterals';
    public gcDateTimeValue = new Date();
    public gcDateTimeWatermarkDisplayEmptyEraText;
    public gcDateTimeDropDownConfig;
    public gcDateTimeExitOnLastChar = true;
    public gcDateTimeHighlightText = 'Field';
    public gcDateTimeVisible = true;
    public gcDateTimeEnabled = true;
    public gcDateTimeReadOnly = false;
    public gcDateTimeExitOnLeftRightKey = "Both";
    public gcDateTimeEditMode = "Insert";
    public gcDateTimeWatermarkDisplayNullText = "WaterDisplayNullText";
    public gcDateTimeWatermarkNullText = "WatermarkNullText";
    public gcDateTimeAcceptsCrlf = "NoControl";
    public gcDateTimeUseClipboard = true;
    public gcDateTimeExitOnEnterKey = "Both";
    // GcDateTime end

    // GcNumber start
    public gcNumberValue;
    public gcNumberText;
    public gcNumberWatermarkZeroText;
    public gcNumberFormatDigit = '##0.0';
    public gcNumberDisplayPositivePrefix;
    public gcNumberDisplayFormatDigit = '##0.00';
    public gcNumberMaxValue = 999999;
    public gcNumberMinValue = -999999;
    public gcNumberPositivePrefix;
    public gcNumberPositiveSuffix;
    public gcNumberDisplayPositiveSuffix;
    public gcNumberNegativePrefix;
    public gcNumberDisplayNegativePrefix;
    public gcNumberNegativeSuffix;
    public gcNumberDisplayNegativeSuffix;
    public gcNumberValueSign = 'NoControl';
    public gcNumberAdjustValueOnFocus;
    public gcNumberAllowDeleteToNull = false;
    public gcNumberClearAction = 'Zero';
    public gcNumberAcceptsDecimal = 'Filter';
    public gcNumberCurrencySymbol;
    public gcNumberDecimalPoint;
    public gcNumberMaxMinBehavior = 'AdjustToMaxMin';
    public gcNumberSeparator;
    public gcNumberWatermarkDisplayZeroText;
    public gcNumberHighlightText;
    public gcNumberAllowSpin;
    public gcNumberVisible = true;
    public gcNumberEnabled = true;
    public gcNumberReadOnly = false;
    public gcNumberExitOnLeftRightKey = "Both";
    public gcNumberEditMode = "Insert";
    public gcNumberWatermarkDisplayNullText = "WaterDisplayNullText";
    public gcNumberWatermarkNullText = "WatermarkNullText";
    public gcNumberAcceptsCrlf = "NoControl";
    public gcNumberUseClipboard = true;
    public gcNumberExitOnEnterKey = "Both";
    // GcNumber end

    // GcTextBox start
    public gcTextBoxAutoConvert = true;
    public gcTextBoxEllipsis;
    public gcTextBoxEllipsisString;
    public gcTextBoxFormat;
    public gcTextBoxLengthAsByte;
    public gcTextBoxMaxLength;
    public gcTextBoxPasswordChar;
    public gcTextBoxText;
    public gcTextBoxUseSystemPasswordChar;
    public gcTextBoxIMEReadingStringAppend = true;
    public gcTextBoxIMEReadingStringKanaMode = 'KatakanaHalf';
    public gcTextBoxIMEReadingStringEnableAlphabetReadingMapping = true;
    public gcTextBoxExitOnLastChar = true;
    public gcTextBoxHighlightText = true;
    public gcTextBoxVisible = true;
    public gcTextBoxEnabled = true;
    public gcTextBoxReadOnly = false;
    public gcTextBoxExitOnLeftRightKey = "Both";
    public gcTextBoxEditMode = "Insert";
    public gcTextBoxWatermarkDisplayNullText = "WaterDisplayNullText";
    public gcTextBoxWatermarkNullText = "WatermarkNullText";
    public gcTextBoxAcceptsCrlf = "NoControl";
    public gcTextBoxUseClipboard = true;
    public gcTextBoxExitOnEnterKey = "Both";
    public gcTextBoxIMEReadingString = "";
    // GcTextBox end


    //ListBox start 
    public listbox_items: Array<any> = [
        { name: 'aaa', age: 12, sex: 'male' },
        { name: 'bbb', age: 12, sex: 'female' },
        { name: 'ccc', age: 22, sex: 'male' },
        { name: 'ddd', age: 42, sex: 'female' },
        { name: 'eee', age: 32, sex: 'male' },
        { name: 'fff', age: 17, sex: 'male' },
        { name: 'ggg', age: 19, sex: 'female' },
        { name: 'hhh', age: 28, sex: 'male' },
        { name: 'kkk', age: 24, sex: 'female' },
        { name: 'jjj', age: 29, sex: 'male' },
    ];
    public listbox_virtualMode: boolean = false;
    public listbox_allowResize: boolean = false;
    public listbox_selectionMode: string = 'Single';
    public listbox_selectedIndex: number = 0;
    public listbox_checkedIndex: number = 0;
    public listbox_selectedIndices: number[] = [];
    public listbox_checkedIndices: number[] = [];
    public listbox_allowColumnResize: boolean = true;
    public listbox_overflow: string = 'Both';
    public listbox_width: number = 300;
    public listbox_height: number = 150;
    public listbox_itemHeight: number = 30;
    public listbox_checkOnClick: boolean = true;
    public listbox_visibleItemsCount: number = 5;
    public listbox_showCheckBox: boolean = true;
    public listbox_visible: boolean = true;
    public listbox_enable: boolean = true;
    //ListBox end

    //ComboBox start 
    public combobox_items: Array<any> = [
        { id: 1, name: "aaa", gender: "male", age: 90, longtext: 'samkceenskrvvv' },
        { id: 2, name: "bbb", gender: "female", age: 90, longtext: 'samkceenskrvvv' },
        { id: 3, name: "ccc", gender: "male", age: 90, longtext: 'samkceenskrvvv' },
        { id: 4, name: "ddd", gender: "female", age: 90, longtext: 'samkceenskrvvv' },
        { id: 5, name: "eee", gender: "male", age: 90, longtext: 'samkceenskrvvv' },
        { id: 6, name: "fff", gender: "male", age: 90, longtext: 'samkceenskrvvv' },
        { id: 7, name: "ggg", gender: "female", age: 90, longtext: 'samkceenskrvvv' },
        { id: 8, name: "hhh", gender: "male", age: 90, longtext: 'samkceenskrvvv' },
    ];
    public combobox_selectedValue: object = null;
    public combobox_canResizeDropDown: boolean = true;
    public combobox_ReadOnly: boolean = false;
    public combobox_autoSelect: boolean = true;
    public combobox_selectedIndex: number = 0;
    public combobox_autoFilter: string = 'None';
    public combobox_visible: boolean = true;
    public combobox_enabled: boolean = true;
    public combobox_editable: boolean = true;
    public combobox_watermarkDisplayNullText: string;
    public combobox_watermarkNullText: string;
    public combobox_highlightText: boolean = false;
    public combobox_exitOnEnterKey: string = 'None';
    public combobox_useClipboard: boolean = true;
    public combobox_acceptsCrlf: string = 'NoControl';
    public combobox_ellipsis: string = 'None';
    public combobox_ellipsisString: string;
    public combobox_exitOnLeftRightKey: string = 'None';
    public combobox_editMode: string = 'Insert';
    public combobox_isMultiSelect: boolean = true;
    public combobox_valueMemberPath: string = 'name';
    public combobox_displayMemberPath: string = 'name';
    public combobox_checkedIndices: Array<number> = [];
    public combobox_checkedValues: Array<string> = [];
    public combobox_selectedValues: string = 'aaa';
    public combobox_selectedItem: object = { id: 5, name: "eee", gender: "male", age: 90, longtext: 'samkceenskrvvv' };

    public single_combobox_items: Array<any> = [
        "aaa",
        "bbb",
        "ccc",
        "ddd",
        "eee",
        '123aaa',
        '123aaa456',
        'a123'
    ];
    public single_combobox_selectedValue: string = '';
    public single_combobox_autoSelect: boolean = true;
    public single_combobox_selectedIndex: number = 0;
    public single_combobox_autoFilter: string = 'none';
    //ComboBox end

    //GcDateTimePicker start 
    public gcdatetimepicker_selectedDate: object = new Date();
    public gcdatetimepicker_maxDate: Date = new Date(2030, 0, 1);
    public gcdatetimepicker_minDate: Date = new Date(2010, 0, 1);
    public gcdatetimepicker_pickerType: string = 'DateTime';
    public gcdatetimepicker_minuteInterval: number = 10;
    public gcdatetimepicker_secondsInterval: number = 10;
    public gcdatetimepicker_gcDateTimePickerVisible: boolean = true;
    public gcdatetimepicker_showSeconds: boolean = true;
    public gcdatetimepicker_showMidnightAs24: boolean = true;
    //ComboBox end

    //GcTipNotifier start 
    public gctipnotifier_direction: string = 'right';
    public gctipnotifier_position: string = 'balanced';
    public gctipnotifier_template: string;
    public gctipnotifier_directionPriority: Array<string>;
    public gctipnotifier_successMessage: string;
    public gctipnotifier_failMessage: string;

    //GcTipNotifier end

    //GcIconNotifier start 
    public gciconnotifier_direction: string = 'outside';
    public gciconnotifier_failMessage: string;
    public gciconnotifier_successMessage: string;
    //GcIconNotifier end

    //GcMultiLineTextBox start
    public gcmultilinetextbox_text: string = "MultilineTextBox";
    public gcmultilinetextbox_countWrappedLine: boolean = false;
    public gcmultilinetextbox_lengthAsByte: boolean = false;
    public gcmultilinetextbox_maxLength: number = 300;
    public gcmultilinetextbox_maxLineCount: number = 3;
    public gcmultilinetextbox_IMEReadingStringKanaMode: string = 'KatakanaHalf';
    public gcmultilinetextbox_scrollBarMode: string = 'Automatic';
    public gcmultilinetextbox_scrollBars: string = 'Both';
    public gcmultilinetextbox_wordWrap: boolean = true;
    public gcmultilinetextbox_acceptsReturn: boolean = true;
    public gcmultilinetextbox_acceptsTab: boolean = true;
    public gcmultilinetextbox_IMEReadingStringAppend: boolean = true;
    public gcmultilinetextbox_height: number = 200;
    public gcmultilinetextbox_IMEReadingStringEnableAlphabetReadingMapping: boolean = true;
    public gcmultilinetextbox_exitOnLastChar: boolean = true;
    public gcmultilinetextbox_highlightText: boolean = true;
    public gcmultilinetextbox_exitOnLeftRightKey: string = 'None';
    public gcmultilinetextbox_editMode: string = 'Insert';
    public gcmultilinetextbox_enabled: boolean = true;
    public gcmultilinetextbox_visible: boolean = true;
    public gcmultilinetextbox_readOnly: boolean = false;
    public gcmultilinetextbox_watermarkNullText: string = "watermarkNullText";
    public gcmultilinetextbox_watermarkDisplayNullText: string = 'watermarkDisplayNullText';
    public gcmultilinetextbox_format: string = '';
    public gcmultilinetextbox_autoConvert: boolean = true;
    public gcmultilinetextbox_useClipboard: boolean = true;
    public gcmultilinetextbox_IMEReadingString: string = '';
    public gcmultilinetextbox_exitOnEnterKey: string = 'None';
    public gcmultilinetextbox_lines: string[] = [];
    //GcMultilineTextBox end

    public toggleFlagEnumChecked(propertyName: string, enumValue: number, isChecked: boolean): void {
        if (isChecked) {
            this[propertyName] |= enumValue;
        } else {
            this[propertyName] &= (~enumValue);
        }
    }
}



@Pipe({
    name: 'numberConvertor',
    pure: true
})
export class NumberConvertorPipe implements PipeTransform {

    transform(value: any, args?: any): number {
        if (!value) {
            return 0;
        }

        var newValue = parseInt(value.toString());
        if (isNaN(newValue)) {
            return 0;
        } else {
            return newValue;
        }
    }
}

@Pipe({
    name: 'stringArrayConvertor',
    pure: true
})
export class StringArrayConvertorPipe implements PipeTransform {

    transform(value: any, args?: any): Array<string> {
        if (!value) {
            return [];
        }
        return String(value).split(',').filter((t) => { return t != undefined && t !== '' });
    }
}

@Pipe({
    name: 'dateConvertor',
    pure: true
})
export class DateConvertorPipe implements PipeTransform {

    transform(value: any, args?: any): Date {
        return new Date(value);
    }
}

@Pipe({
    name: 'booleanConvertor',
    pure: true
})
export class BooleanConvertorPipe implements PipeTransform {

    transform(value: any, args?: any): boolean {
        return Boolean(value);
    }
}

@Pipe({
    name: 'numberArrayConvertor',
    pure: true
})
export class NumberArrayConvertorPipe implements PipeTransform {

    transform(value: any, args?: any): Array<number> {
        return String(value).split(',').filter((t) => { return t != undefined && t !== '' }).map((t) => { return Number(t); });
    }
}

@Pipe({
    name: 'flagEnumConvertor',
    pure: true
})
export class FlagEnumConvertorPipe implements PipeTransform {

    transform(value: any, enumValue: number): boolean {
        if ((enumValue & value) !== 0) {
            return true
        }
        return false;
    }
}