# Arquitetura Salesforce — Associação Cultural de Forró (Porto)
### Documento de referência para o projeto académico

---

## PARTE 1 — Objetos e o que cada um guarda

### `Account` (Organizações)
Record Types para distinguir o tipo de relação:
| Record Type | Uso |
|---|---|
| Parceiro (Espaço) | Locais que cedem espaço para eventos/aulas |
| Artista / Coletivo | Bandas, DJs, professores de dança, convidados |
| Outra Associação | Entidades parceiras/colaboradoras |
| Patrocinador | Empresas que apoiam financeiramente |

Campos-chave: Tipo de parceria, Morada/localização, Capacidade (para espaços), Género musical/artístico (para artistas).

### `Contact` (Pessoas)
Associados, participantes, professores, artistas a título individual. Com NPSP instalado, liga-se automaticamente a `Household` e a `Account` via `Affiliation` (ex. um artista membro de um coletivo).

Campos-chave: É associado (checkbox/fórmula), Data de adesão, Instrumento/especialidade (se relevante).

### `Campaign` (Eventos, Workshops, Aulas, Conteúdos culturais)
Objeto central para tudo o que é "atividade com data". Record Types:
| Record Type | Exemplos |
|---|---|
| Evento Gratuito | Roda de forró, encontro social |
| Evento Pago | Baile com entrada paga |
| Festival | Festival anual |
| Workshop / Aula de Dança | Curso de forró para iniciantes |
| Mesa Redonda | Debate/palestra |
| Filme | Sessão de cinema brasileiro |
| Apresentação | Espetáculo, showcase |
| Podcast | Episódio/gravação |

Campos-chave: Preço, Espaço (lookup a Account "Parceiro"), Artista(s) envolvido(s), Capacidade máxima, Estado (Planeado/Confirmado/Realizado/Cancelado).

### `Turma__c` (custom) — só para Workshops/Aulas de dança
Porque uma aula de dança não é um evento único — é uma série de sessões recorrentes.
- Lookup/Master-Detail a `Campaign` (Record Type "Workshop/Aula de Dança")
- Campos: Nível (iniciante/intermédio/avançado), Professor (lookup a Account/Contact "Artista"), Dia da semana, Duração do curso, Nº de vagas

### `Sessao__c` (custom) — sessões individuais de uma turma
- Master-Detail a `Turma__c`
- Campos: Data, Hora, Sala/espaço, Estado (Realizada/Cancelada)

### `Presenca__c` (custom) — controlo de presenças
- Lookup a `CampaignMember` (o inscrito) + Lookup a `Sessao__c`
- Campo: Presente (checkbox)
- Permite relatórios de assiduidade por aluno/turma — bom exemplo de relação muitos-para-muitos.

### `CampaignMember`
Inscrição de uma pessoa num evento, workshop ou turma. Status customizado: Inscrito / Confirmado / Presente / Cancelado / Lista de espera.

### `Lead`
Pessoas ou entidades ainda não qualificadas: candidatos a associado, propostas de parceria de espaços, artistas a proporem colaboração, associações a proporem colaborar. Convertidos em `Contact` + `Account` (com o Record Type certo) quando confirmados.

### `Opportunity`
- Parcerias/patrocínios em negociação (fase até fecharem)
- Donativos pontuais para causas específicas (mapeado automaticamente pelo NPSP)
- Vendas de merchandise (com `OpportunityLineItem` ligado a `Product2`)

### `npe03__Recurring_Donation__c` (NPSP)
Cotas de associado — pagamento recorrente ligado ao `Contact`.

### `Product2` + `PricebookEntry`
Catálogo de merchandise (t-shirts, discos, etc.) para venda via Opportunity.

### `Case`
Dois usos distintos, com Record Types separados e OWD Private:
| Record Type | Uso |
|---|---|
| Queixa de Assédio | Portal público, sharing restrito, fluxo de encaminhamento |
| Pedido de Divulgação de Evento | Submetido por parceiros/artistas via formulário público, segue para aprovação |

### `Parceria__c` (custom, objeto de junção)
Lookup a `Account` + Lookup a `Campaign` — regista "este espaço cedeu-nos este evento" ou "este artista atuou nesta apresentação", de forma mais flexível do que campos fixos na Account.

---

## PARTE 2 — Processos como Fluxos (Flow)

### 1. Inscrição pública em Evento/Workshop
**Tipo:** Screen Flow, publicado num site Experience Cloud
1. Ecrã de pesquisa/seleção do evento ou turma (lista de Campaigns ativas)
2. Ecrã de dados pessoais (cria ou atualiza `Contact` — Get Records + Create/Update condicional)
3. Se for evento pago → redireciona para pagamento (ou regista intenção e cria `Opportunity`)
4. Cria `CampaignMember` com status "Inscrito"
5. Se a turma estiver cheia → status "Lista de espera" (Decision element a comparar inscritos vs. vagas)
6. Email de confirmação automático

### 2. Submissão de evento por parceiro/artista (formulário automático de divulgação)
**Tipo:** Screen Flow público → Approval Process → Record-Triggered Flow
1. Parceiro/artista preenche formulário (nome do evento, data, tipo, espaço, contacto)
2. Cria `Case` (Record Type "Pedido de Divulgação") com status "Pendente"
3. Approval Process: equipa da associação aprova ou rejeita
4. Se aprovado → Record-Triggered Flow cria automaticamente a `Campaign` correspondente e associa o `Parceria__c`
5. Email automático ao submissor com o resultado

### 3. Conversão de Lead (associado, parceiro, artista, associação)
**Tipo:** Flow de conversão + critérios de qualificação
1. Lead entra (via formulário, evento ou contacto direto)
2. Campo "Tipo de Interesse" define o caminho: Associado / Parceiro / Artista / Colaboração
3. Após qualificação manual ou automática, conversão para `Contact`
4. Se aplicável, cria/associa `Account` com o Record Type correto
5. Se for parceria/patrocínio, cria `Opportunity` em fase inicial

### 4. Adesão e renovação de cota de associado
**Tipo:** Recurring Donation (NPSP) + Flow de lembrete
1. Pessoa confirma adesão → cria `Recurring Donation` (Record Type Membership) ligada ao `Contact`
2. Flow agendado (Scheduled-Triggered) corre mensalmente: identifica cotas a vencer nos próximos 30 dias
3. Envia email de lembrete de renovação
4. Se não renovar em X dias → atualiza campo "Estado de Associado" para Inativo

### 5. Donativo específico
**Tipo:** Screen Flow público (site) + automação NPSP
1. Doador escolhe a causa específica (picklist ou lookup a um "Projeto/Causa")
2. Cria `Opportunity` com o campo de finalidade preenchido
3. NPSP faz o rollup automático para o `Contact`/`Household`
4. Email de agradecimento automático (Email Alert)

### 6. Venda de merchandise
**Tipo:** Flow simples (loja no site ou registo manual)
1. Escolha de produto (`Product2`) e quantidade
2. Cria `Opportunity` (Record Type "Venda Merch") + `OpportunityLineItem`
3. Atualiza stock (campo custom em `Product2`, com Validation Rule a impedir vender sem stock)
4. Email de confirmação com resumo da compra

### 7. Portal de queixas de assédio
**Tipo:** Screen Flow público (com opção anónima) + roteamento restrito
1. Ecrã de submissão (com opção de não preencher nome/contacto)
2. Cria `Case` (Record Type "Queixa de Assédio"), atribuído a uma Queue reduzida (não à fila geral)
3. Sharing Rules garantem que só a Queue definida vê o registo (OWD Private)
4. Notificação automática (email interno) à equipa responsável
5. Approval Process ou simples mudança de status para acompanhar a resolução

### 8. Gestão de turmas de dança (recorrência)
**Tipo:** Flow de criação em série + controlo de presenças
1. Ao criar uma `Turma__c`, um Flow gera automaticamente as `Sessao__c` seguintes com base no dia da semana e duração definidos (loop a criar registos)
2. Em cada sessão, cria-se um `Presenca__c` por `CampaignMember` inscrito, pronto a marcar presença
3. Flow de aviso automático caso um aluno falte a X sessões seguidas (útil para engagement)

---

## Notas para o relatório do projeto

- **Automação de ponta a ponta**: os fluxos 2 e 8 são os que melhor demonstram Flow + Approval Process + criação automática de registos relacionados — vale a pena aprofundá-los na apresentação.
- **Segurança**: o fluxo 7 é o exemplo ideal para falares de OWD, Sharing Rules e Queues.
- **NPSP**: os fluxos 4 e 5 mostram o valor de usar um pacote gratuito e especializado em vez de reinventar a gestão de doações.
- **Limitações do Developer Edition** a mencionar no relatório: sem Salesforce Shield (encriptação avançada), licenças de Experience Cloud limitadas, sem integração nativa gratuita com WhatsApp/Instagram (documentar como trabalho futuro/arquitetura proposta).
