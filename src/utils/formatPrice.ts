export default function formatPrice(price: number) {
  const opcoesDeFormatacao: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'BRL',
  }

  const formatador = new Intl.NumberFormat('pt-BR', opcoesDeFormatacao)
  return formatador.format(price as number)
}
