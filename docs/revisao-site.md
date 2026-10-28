# Revisão do site Fios da Ria

## Melhorias técnicas de 27 de outubro de 2026

- As fichas recebem o produto na renderização estática, em vez de publicar
  inicialmente «Produto não encontrado». Os IDs inexistentes usam `notFound()`.
  O componente interativo mantém a atualização de disponibilidade pelo Sanity.
- A homepage tem canonical, alternates PT/EN e x-default, metadados por idioma
  e um único título principal h1 no primeiro destaque. Os restantes são h2.
- O sitemap inclui ambas as línguas, com barras finais consistentes. Não atribui
  a todos os conteúdos uma data de modificação artificial a cada build.
- O menu móvel usa botões nomeados, diálogo nativo, controlo de foco, fecho por
  Escape e bloqueio do scroll enquanto está aberto.
- Fotografias usadas convertidas para WebP com dimensões adequadas: Anya,
  Catarina, mercadinho, Toy Story (fallback) e Branca de Neve (showcase).
  Total destas cinco imagens: 6.216.290 para 907.502 bytes, cerca de 85% menos.
  Os JPEG antigos foram substituídos; Woody e catarina2, sem uso real,
  foram removidos. O histórico Git conserva os ficheiros anteriores.

As alterações técnicas não resolvem a informação profissional em falta nem a
avaliação de conformidade das peças. A morada profissional válida continua por
definir, e a política de privacidade depende de confirmar os tratamentos e prazos
de conservação descritos abaixo. Não foram publicadas páginas com dados inventados.

## Alterações preparadas em 23 de outubro de 2026

O site continua a ser uma montra com compra na Wallapop e pedidos por mensagem.
O stock continua a depender de um link de compra. Os novos campos `wallapopUrl`
têm prioridade sobre `vintedUrl`, que se mantém como compatibilidade com os
documentos existentes. O catálogo foi atualizado no Sanity com os dados
confirmados pela Catarina em português e inglês: 21 produtos e 75 variantes,
correspondentes a 78 entradas individuais. A leitura pública confirmou medidas,
materiais, cuidados e conteúdo do preço em todas as entradas e nas duas línguas.

O fantasma com chapéu de bruxa foi também atualizado e verificado no Sanity:
7 cm de altura incluindo o chapéu, olhos com travas, enchimento antialérgico,
chapéu incluído e fixo e possibilidade de pedido por contacto quando esgotar.
A limpeza foi confirmada e publicada: lavar à mão, não torcer e secar à sombra.
Preço, fotografias e link de compra foram preservados.

Porta-chaves de Halloween atualizados e verificados no produto e nas quatro
variantes (Abóbora, Jack Skellington, Drácula e Frankenstein): cerca de 3 cm de
diâmetro, argola incluída no preço por unidade, olhos bordados, enchimento,
lavagem à mão sem torcer e secagem à sombra. Aceita pedidos para nova confeção
quando esgotarem. A informação foi publicada em português e inglês, preservando
preços, imagens e links de compra.

Bolas de Natal: dados comuns publicados e verificados nas 14 variantes, em PT/EN:
fio de algodão, olhos com travas, fio para pendurar incluído, lavagem à mão sem
torcer e secagem à sombra, aceitação de pedidos de nova confeção. Enchimento
antialérgico e preço por uma bola confirmados e publicados. Alturas sem fio confirmadas,
publicadas e verificadas em todas as 14 variantes: duendes 7,5 cm; Mãe Natal
5,5 cm; Pai Natal 9 cm; urso e pinguim 6 cm; boneco de neve 7 cm; Grinch 9,9 cm;
anjo 6,5 cm; capivara 7,6 cm; gato 5 cm; Bolacha cerca de 5 cm; Cachorro cerca de
7 cm; Rena cerca de 7 cm.

K-Pop Demon Hunters: Rumi, Mira e Zoe com cerca de 10 cm de altura. A sessão foi
restabelecida pela Catarina; a medida está publicada e verificada em PT/EN.

One Piece: Luffy, Luffy Gear 5, Chopper, Nami, Zoro e Usopp entre 11 e 13 cm de
altura. Intervalo comum publicado e verificado, sem inventar valores por
personagem. Acessórios e outros dados não confirmados nestas duas coleções não
foram alterados.

Wednesday e Enid: altura aproximada de 13 cm publicada e verificada nas duas
variantes, em PT/EN.

Harry Potter: Harry, Hermione e Ron com cerca de 7 cm na versão Mini e 13 cm na
versão maior. Medidas publicadas e verificadas nos dois produtos e nas seis
variantes, em PT/EN.

Princesas Disney: intervalo aproximado de 12–13 cm de altura publicado e
verificado em Cinderela, Branca de Neve, Bela, Rapunzel, Jasmine, Merida e Moana,
em PT/EN. Restantes campos preservados em todas estas atualizações de medidas.

Spy × Family: intervalo aproximado de 12–13 cm de altura publicado e verificado
em Anya, Yor e Loid, em PT/EN. Preços, imagens e links preservados.

Toy Story: intervalo aproximado de 12–13 cm de altura publicado e verificado em
Woody, Jessie e Buzz Lightyear, em PT/EN. Preços, imagens e links preservados.

Heated Rivalry: intervalo aproximado de 6–7 cm de altura publicado e verificado
em Ilya Rozanov e Shane Hollander, em PT/EN. Preços, imagens e links preservados.

Divertida-Mente: intervalo aproximado de 8–10 cm de altura publicado e verificado
nas oito variantes, em PT/EN. Preços, imagens e links preservados.

Shrek: altura aproximada de 12 cm publicada e verificada em Shrek, Fiona, Burro
e Gato das Botas, em PT/EN. Preços, imagens e links preservados.

Lilo & Stitch: cerca de 7 cm na coleção pequena (Stitch, Angel e Lilo) e 13 cm na
coleção Big (Stitch e a variante identificada como Mini Lilo). Medidas publicadas
e verificadas em PT/EN, com os restantes campos preservados.

Super Mario: medidas esclarecidas, publicadas e verificadas em PT/EN. Mini:
Mario e Luigi com cerca de 7 cm. Versão maior: Mario, Luigi e Peach com cerca de
15–17 cm; Yoshi com cerca de 20 cm. Foi usada uma medida específica por variante
na versão maior; o intervalo anterior de 15–18 cm foi substituído pela confirmação.

Wicked: Glinda e Elphaba com cerca de 14 cm de altura. Presépio: Maria com
9 cm de altura, José com 10,6 cm de altura e Menino Jesus com 9 cm de largura.
O preço do presépio inclui Maria, José, Menino Jesus e berço. Dados publicados
e verificados em PT/EN.

A confirmação comum de algodão 100%, olhos com travas, enchimento antialérgico,
lavagem à mão sem torcer e secagem à sombra foi publicada nos restantes bonecos
e bolas de Natal. O preço é por uma personagem/bola, exceto o conjunto do presépio.
As exceções dos fantasmas e porta-chaves foram preservadas, tal como preços,
imagens e links de compra.

No Sanity, manter medidas aproximadas, conteúdo do preço (unidade ou conjunto),
materiais, cuidados e avisos por produto e, quando diferem, por variante. Confirmar que os
links antigos já apontam para anúncios Wallapop antes de publicar o novo botão.
As descrições existentes, incluindo bolas de Natal, precisam de revisão pela
artesã; não foram inventadas medidas, personagens ou dados de segurança.

`acceptsOrders` permite retirar o convite a encomendar uma peça. O pedido continua
sujeito a avaliação de viabilidade, preço, prazo e disponibilidade. Não se presume
a aceitação de uma encomenda por uma peça estar visível no catálogo.

## Condições comerciais

Pagamento inicial: 50%, MB WAY ou em mãos. Restante: no encontro, para entrega em
mãos em Faro/Olhão; antes de envio CTT, acrescido dos portes previamente acordados.
Para conclusão pela Wallapop depois de um pagamento inicial, confirmar primeiro
as regras da plataforma e a contabilização do montante já pago. Não criar anúncios
fictícios nem prometer proteção da plataforma sobre pagamentos feitos fora dela.

Cancelamento nas 24 horas desde o pagamento inicial: reembolso do adiantamento.
A política de retenção após esse prazo não deve ser aplicada automaticamente a
peças de catálogo encomendadas à distância. A redação restringe essa condição a
peças realmente personalizadas, quando legalmente aplicável e acordada antes da
confirmação. Validar juridicamente a cláusula antes de a usar nos contratos.
O incumprimento do prazo de confeção acordado permite pedir o cancelamento e o
reembolso inicial, sem excluir outros direitos legais. A personalização não
elimina os direitos por falta de conformidade.

Fonte: https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2014-73222992

## Segurança das peças destinadas a brincar

A Catarina confirmou que ainda não dispõe de avaliação de conformidade,
documentação técnica e marcação CE do produto final. Não publicar uma garantia
geral de adequação a crianças a partir dos 4 anos. O destino real da peça importa;
chamar-lhe decoração não resolve a classificação se for destinada a brincar.

Próximos passos:

1. Descrever os modelos, uso previsto, faixas etárias, dimensões e componentes.
2. Reunir especificações, fichas técnicas e evidências dos fornecedores do fio,
   enchimento, olhos e outros acessórios; guardar referências e lotes.
3. Pedir orientação à ASAE e apoio técnico a um laboratório com experiência em
   brinquedos sobre avaliação, normas harmonizadas aplicáveis e ensaios do
   produto final (por exemplo, riscos mecânicos, inflamabilidade e substâncias).
4. Definir o procedimento de avaliação adequado. Nem todos os brinquedos exigem
   exame por organismo notificado; depende da aplicação das normas e do caso.
5. Reunir a documentação técnica, emitir a declaração CE de conformidade e aplicar
   a marcação, rastreabilidade, identificação do fabricante e avisos exigidos.
6. Só então confirmar e publicar as indicações de idade de cada modelo.

`safetyReviewed` no CMS apenas controla a publicação da idade; não certifica a
peça nem substitui qualquer avaliação. Não assinalar esse campo sem a documentação.
Não é possível concluir que a peça é segura com base apenas em algodão, olhos
com travas ou enchimento antialérgico.

Fontes:

- https://single-market-economy.ec.europa.eu/sectors/toys/placing-toys-eu-market_en
- https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2011-67485266
- https://www.asae.gov.pt/a-asae/contactos.aspx

## Informação legal e privacidade por completar

Informação recebida entretanto: faturação pelo Portal das Finanças com a menção
«IVA — regime de isenção — artigo 53.º», confirmada pela Catarina em 23/10/2026.
O fundamento da isenção deixou de estar pendente; esta confirmação regista a
menção utilizada nas faturas, sem constituir uma avaliação fiscal independente.
Livro de Reclamações Eletrónico confirmado sob a marca e o NIF da responsável.
Foi acrescentada ao rodapé uma ligação à plataforma oficial, sem depender de uma
ligação individual. A Catarina confirmou que não tem adesão voluntária a um
centro RAL. Em 27/10/2026, foi explicitado esse facto na página Como comprar,
em PT/EN, preservando a informação sobre arbitragem necessária, por opção
expressa do consumidor, para conflitos de consumo até 5.000 € num centro
autorizado competente. Não é necessária uma integração técnica ou conta RAL.
A antiga plataforma europeia RLL/ODR encerrou em 20/07/2025; não foi acrescentada
uma ligação para esse serviço. A página Como comprar passa
a indicar o CIMAAL para conflitos abrangidos pela sua competência no Algarve e
a lista oficial de centros autorizados para os restantes casos; não declara adesão
da Fios da Ria. A competência deve ser apreciada também nas vendas à distância,
atendendo ao domicílio do consumidor e ao local do contrato, segundo o regulamento
harmonizado de 2026. A informação no site não substitui as menções aplicáveis nos
contratos e noutros suportes duradouros.

Mensagens conservadas no Instagram, sem lista
separada de clientes declarada. Nome e NIF foram recebidos na conversa e não
foram copiados para este repositório. A responsável não autorizou publicar a
morada pessoal; confirmar uma solução válida para o endereço profissional.

Não publicar páginas legais com dados fictícios ou campos por preencher. Recolher:

- Endereço profissional aplicável à atividade; nome legal e NIF já recebidos
  em privado.
- Enquadramento do Livro de Reclamações na atividade em mercados; modalidade
  eletrónica e registo já confirmados.
- Validar a informação RAL nos diferentes canais de venda e registar eventual
  adesão futura. Não presumir adesão voluntária.
- Serviços de email, faturação e armazenamento de mensagens; dados efetivamente
  recebidos da Wallapop/CTT e prazos de conservação aplicáveis.
- Regras completas para entregas, devoluções, despesas de devolução e garantias,
  ajustadas ao enquadramento e comunicadas antes do pagamento.

Com esses dados, preparar páginas de identificação legal, privacidade e condições,
e ligações adequadas no rodapé. A página Como comprar é orientação comercial;
não constitui uma certificação de conformidade legal da atividade.

Fontes oficiais consultadas em 23/10/2026:

- https://www.asae.gov.pt/reclamacoes-e-denuncias/livro-de-reclamacoes.aspx
- https://www.livroreclamacoes.pt/Inicio/
- https://www.asae.gov.pt/perguntas-frequentes1/area-economica/resolucao-alternativa-de-litigios-de-consumo.aspx
- https://www.consumoalgarve.pt/index.php/pt/sobre-nos/constituicao-e-funcionamento
- https://dgpj.justica.gov.pt/Resolucao-de-Litigios/Arbitragem/Centros-de-Arbitragem-autorizados

## Inventário técnico inicial de privacidade

Inspeção do código: export estático no GitHub Pages; cliente Sanity no navegador
para produtos/imagens; links para Instagram, email e anúncios externos; Manrope
via `next/font` (fontes obtidas no build). Não foram encontrados scripts próprios
de analytics/publicidade no código inspecionado. Não há novo formulário nem
processador de pagamentos no site. O next-intl tem deteção automática de idioma
desativada; confirmar em navegador as cookies efetivamente criadas.

Este inventário é preliminar: validar pedidos de rede, cookies, localStorage e
sessionStorage no site publicado, incluindo mudanças de idioma, antes de decidir
se é necessário consentimento. Não foi acrescentado um banner genérico nem uma
política que prometa ausência de cookies sem essa verificação.

## Publicação

Validar build, testes e comportamento de variantes/stock. Publicar primeiro o
schema do Studio para disponibilizar os novos campos e rever o conteúdo existente.
O frontend suporta conteúdo antigo, sem exigir preenchimento imediato dos novos
campos. `pnpm run build` continua a preparar português na raiz e inglês em `/en/`.
O Studio e o schema foram publicados em 23 de outubro de 2026 em
https://fios-da-ria.sanity.studio/. Não foi alterado o Instagram nem publicado o
frontend no domínio. O fantasma decorativo sem chapéu
foi posteriormente atualizado e verificado: altura aproximada 6–7 cm, fio de
algodão, olhos colados, sem enchimento, sem fio para pendurar incluído, limpeza
apenas suave e possibilidade de confeção por encomenda. O novo campo `care`
permite substituir os cuidados genéricos, tal como `materials` substitui os
materiais genéricos nas fichas. Está disponível uma
pré-visualização local do frontend em http://localhost:3000/how-to-buy.
