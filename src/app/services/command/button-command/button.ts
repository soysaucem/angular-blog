import { Command } from '../command.model';

export class Button {

  private command: Command;
  private type: any;

  constructor() { }

  setCommand(command: Command): void {
    this.command = command;
  }

  setType(type: any): void {
    this.type = type;
  }

  async press(params: any): Promise<any> {
    return await this.command.execute(this.type, params);
  }
}
