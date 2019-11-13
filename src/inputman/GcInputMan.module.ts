/*Import from angular */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
/**
 * Import from InputManJS
 */
import {
  GcCalendarComponent,
  GcMaskComponent,
  GcTextBoxComponent,
  GcNumberComponent,
  GcDateTimeComponent,
  GcListBoxComponent,
  GcComboBoxComponent,
  GcDateTimePickerComponent,
  GcTipNotifierComponent,
  GcIconNotifierComponent,
  GcMultilineTextBoxComponent,
  GcComboBoxColumnComponent,
  GcListBoxColumnComponent
} from "./GcInputMan.component";

/**
 *  Declare & add export modules
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    GcMaskComponent,
    GcTextBoxComponent,
    GcCalendarComponent,
    GcNumberComponent,
    GcDateTimeComponent,
    GcListBoxComponent,
    GcComboBoxComponent,
    GcDateTimePickerComponent,
    GcTipNotifierComponent,
    GcIconNotifierComponent,
    GcMultilineTextBoxComponent,
    GcComboBoxColumnComponent,
    GcListBoxColumnComponent
  ],
  exports: [
    GcMaskComponent,
    GcTextBoxComponent,
    GcCalendarComponent,
    GcNumberComponent,
    GcDateTimeComponent,
    GcListBoxComponent,
    GcComboBoxComponent,
    GcDateTimePickerComponent,
    GcTipNotifierComponent,
    GcIconNotifierComponent,
    GcMultilineTextBoxComponent,
    GcComboBoxColumnComponent,
    GcListBoxColumnComponent
  ]
})
export class InputManModule {
}