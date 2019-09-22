"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const archives_controller_1 = require("./archives.controller");
describe('Archives Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [archives_controller_1.ArchivesController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(archives_controller_1.ArchivesController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=archives.controller.spec.js.map