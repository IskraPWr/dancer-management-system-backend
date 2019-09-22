"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const installment_controller_1 = require("./installment.controller");
describe('Installment Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [installment_controller_1.InstallmentController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(installment_controller_1.InstallmentController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=installment.controller.spec.js.map