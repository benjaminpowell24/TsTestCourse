export class PasswordChecker {
  public checkPassword(password: string): boolean {
    if (password.length < 8) {
      return false
    }

    const hasUpperCase = password !== password.toLowerCase()
    // const hasLowerCase = password !== password.toUpperCase()

    if (!hasUpperCase) {
      return false
    }

    console.log('password array', hasUpperCase)

    return true
  }
}
