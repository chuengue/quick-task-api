function handlingErrorMessage(code, text) {
  return {
    sucess: false,
    error: {
      code,
      message: {
        text,
      },
    },
  };
}

module.exports = {
  ERROR_1001: handlingErrorMessage(
    1001,
    "Prioridade fora do intervalo válido (de 1 a 4).",
  ),
  ERROR_1002: handlingErrorMessage(1002, "Erro ao criar tarefa."),
  ERROR_1003: handlingErrorMessage(1003, "Tarefa não encontrada."),
  ERROR_1004: handlingErrorMessage(
    1004,
    "O campo 'Nome' é obrigatório e não pode estar vazio.",
  ),
  ERROR_1005: handlingErrorMessage(1005, "Erro ao atualizar tarefa."),
  ERROR_1006: handlingErrorMessage(1006, "Critério de pesquisa inválido."),
  ERROR_1007: handlingErrorMessage(1007, "Erro ao excluir a tarefa."),
  ERROR_1008: handlingErrorMessage(1008, "Erro ao buscar a tarefa."),
};
