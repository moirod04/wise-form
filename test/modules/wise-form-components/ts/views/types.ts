import { InputTrafficLight } from './components/sgs/traffic-ligth';
import { Totalizer } from './components/sgs/totalizer';
import { AlertModal } from './components/sgs/alert-modal';
import { CurrencyInput } from './components/sgs/currency-input';
import { DependentCollapsible } from './components/sgs/dependent-collapsible';
import { Modal } from './components/sgs/modal';
import { PercentageInput } from './components/sgs/percentage-input';
import { Select } from './components/sgs/select';
import { Div } from './components/utils/div';
import { Button } from './components/utils/button';

export const types = {
    trafficLight: InputTrafficLight,
    alertModal: AlertModal,
    currency: CurrencyInput,
    totalizer: Totalizer,
    dependentCollapsible: DependentCollapsible,
    select: Select,
    modal: Modal,
    percentage: PercentageInput,
    div: Div,
    button: Button,
    submit: Button,
};