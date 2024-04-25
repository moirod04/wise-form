import { InputTrafficLight } from './components/traffic-ligth';
import { Totalizer } from './components/totalizer';
import { AlertModal } from './components/alert-modal';
import { CurrencyInput } from './components/currency-input';
import { DependentCollapsible } from './components/dependent-collapsible';
import { Modal } from './components/modal';
import { PercentageInput } from './components/percentage-input';
import { Select } from './components/select';
import { Div } from './components/div';

export const types = {
    trafficLight: InputTrafficLight,
    alertModal: AlertModal,
    currency: CurrencyInput,
    totalizer: Totalizer,
    dependentCollapsible: DependentCollapsible,
    select: Select,
    modal: Modal,
    percentage: PercentageInput,
    div: Div
};