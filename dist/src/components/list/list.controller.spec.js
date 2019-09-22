"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const list_controller_1 = require("./list.controller");
describe('List Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [list_controller_1.ListController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(list_controller_1.ListController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=list.controller.spec.js.map