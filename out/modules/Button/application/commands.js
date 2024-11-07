"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandService = void 0;
class CommandService {
    terminalRepository;
    constructor(terminalRepository) {
        this.terminalRepository = terminalRepository;
    }
    async runTestCommand() {
        await this.terminalRepository.createTerminal('TDD Terminal', 'npm run tdd-script');
    }
}
exports.CommandService = CommandService;
//# sourceMappingURL=commands.js.map