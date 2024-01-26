import { Test, TestingModule } from '@nestjs/testing'
import { PrescriptionsController } from './prescriptions.controller'
import { PrescriptionsService } from './prescriptions.service'

describe('PrescriptionsController', () => {
  let controller: PrescriptionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionsController],
      providers: [PrescriptionsService],
    }).compile()

    controller = module.get<PrescriptionsController>(PrescriptionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
