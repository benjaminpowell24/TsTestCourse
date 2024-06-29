import { OtherStringUtils } from '../app/OtherUtils'

describe.only('OtherStringUtils', () => {
  let sut: OtherStringUtils

  beforeEach(() => {
    sut = new OtherStringUtils()
  })

  it('OtherStringUtils test with spies', () => {
    const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase')
    sut.toUpperCase('hello')
    expect(toUpperCaseSpy).toHaveBeenCalledWith('hello')
  })

  it('Console spy test', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    sut.logString('hello')
    expect(consoleSpy).toHaveBeenCalledWith('hello')
  })

  it('Replace external service call with spy', () => {
    const externalServiceSpy = jest.spyOn(sut, 'callExtenalService').mockImplementation(() => {
      console.log('Mocked external service call')
      })
})
})
