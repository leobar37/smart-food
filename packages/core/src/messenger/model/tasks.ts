import { Task } from './Session';
import { Option } from '../../common/types';
export class SelectBuildeableProductTask extends Task {
  avalailableOptions: Record<string, string>;
  constructor(avalailableOptions: Record<string, string>) {
    super('Select a product to build');
    this.avalailableOptions = avalailableOptions;
  }
}

export class SelectBuildeableOptionTask extends Task {
  avalailableOptions: Record<string, string>;
  options: Option[];
  prevOption: Option;
  selection: Option[];
  confirmed: boolean;

  constructor(avalailableOptions: Record<string, string>, options: Option[]) {
    super('Select an option to build');
    this.avalailableOptions = avalailableOptions;
    this.prevOption = options.shift();
    this.options = options;
    this.selection = [];
  }
  getPrevOption() {
    return this.prevOption;
  }
  getNextOption() {
    return this.options[0];
  }
  hasNextOption() {
    return this.options.length > 0;
  }
  addSelection(option: Option) {
    this.selection.push(option);
  }
  confirm() {
    this.confirmed = true;
  }
  isConfirmed() {
    return this.confirmed;
  }
  reset() {
    this.selection = [];
    this.confirmed = false;
    this.completed = false;
  }
}
