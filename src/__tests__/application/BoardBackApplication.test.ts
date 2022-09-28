import {setupApplication} from '../acceptance/test-helper'

describe('Board Back Application', () => {
  it('should start the application', async () => {
    await setupApplication()

  })

  //TODO write test for multiple apps with on different ports at the same time
})
