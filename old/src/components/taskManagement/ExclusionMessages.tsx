import React, { useEffect, useMemo, useState } from "react";

export const ExclusionMessages = React.memo(() => {
  const [i, setI] = useState(0);
  const messages = useMemo(
    () => [
      "Solicitacao recebida.",
      "Conectando com a API...",
      "Server response: 200",
      "Banco de dados encontrado!",
      "Confirmando a autorizacao...",
      "User authorized",
      "Localizando conteudo...",
      "Entrada localizada",
      "Conteudo sendo excluido...",
      "Content erased. Bye!",
    ],
    []
  );
  useEffect(() => {
    setInterval(() => {
      setI((i) => {
        if (i < messages.length - 1) {
          return i + 1;
        } else {
          return messages.length - 1;
        }
      });
    }, 2500);
  }, [messages]);
  return <>{messages[i]}</>;
});
