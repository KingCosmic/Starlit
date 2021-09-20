import { BaseCommand } from '../types';
class Command extends BaseCommand {
    constructor() {
        super(...arguments);
        this.name = 'test';
        this.description = 'just testing shit';
    }
    execute(msg, args) {
        var _a;
        (_a = msg.channel) === null || _a === void 0 ? void 0 : _a.send('testing');
    }
}
export default new Command();
