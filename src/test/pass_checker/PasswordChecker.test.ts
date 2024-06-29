import { PasswordChecker } from '../../app/pass_checker/PasswordChecker'

describe('Password checker test suite', () => {
  let sut: PasswordChecker

  beforeEach(() => {
    sut = new PasswordChecker()
  })

  it('Password with less than 8 characters should be invalid', () => {
    const actual = sut.checkPassword('1234567')

    expect(actual).toBe(false)
  })

  it('Password with 8 or more characters should be valid', () => {
    const actual = sut.checkPassword('12345678A')

    expect(actual).toBe(true)
  })

  it('Should have at least one uppercase letter', () => {
    const actual = sut.checkPassword('123456A7B')
    expect(actual).toBe(true)
  })

  it('Should be invalid if no uppercase letter', () => {
    const actual = sut.checkPassword('123456a7b')

    expect(actual).toBe(false)
  })
})
