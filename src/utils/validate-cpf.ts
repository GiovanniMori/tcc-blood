export function validateCPF(cpf: string): boolean {
  // Remover caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, "")

  // Verificar se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false
  }

  // Verificar se todos os dígitos são iguais (caso inválido, mas não verificamos aqui)
  const areAllDigitsEqual = Array.from(cpf).every((digit) => digit === cpf[0])
  if (areAllDigitsEqual) {
    return false
  }

  // Calcular os dígitos verificadores
  const cpfArray = Array.from(cpf, Number)
  const firstVerifier = calculateVerifier(cpfArray.slice(0, 9))
  const secondVerifier = calculateVerifier([
    ...cpfArray.slice(0, 9),
    firstVerifier,
  ])

  // Verificar se os dígitos verificadores coincidem
  if (cpfArray[9] !== firstVerifier || cpfArray[10] !== secondVerifier) {
    return false
  }

  return true
}

function calculateVerifier(digits: number[]): number {
  const weights = [10, 9, 8, 7, 6, 5, 4, 3, 2]
  const sum = digits.reduce(
    (acc, digit, index) => acc + digit * weights[index],
    0
  )
  const remainder = sum % 11
  return remainder < 2 ? 0 : 11 - remainder
}
