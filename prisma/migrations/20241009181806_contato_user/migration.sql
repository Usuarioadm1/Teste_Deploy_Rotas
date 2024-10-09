-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "idade" INTEGER,
    "criado_em" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContatoUser" (
    "id" SERIAL NOT NULL,
    "telefone" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "ContatoUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNasc" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,
    "nomeMae" TEXT,
    "nomePai" TEXT,
    "cns" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "acomodacao" TEXT NOT NULL,
    "valorPlano" DOUBLE PRECISION,
    "valorTxCadastro" DOUBLE PRECISION,
    "vigencia" TIMESTAMP(3) NOT NULL,
    "operadora" TEXT NOT NULL,
    "corretorId" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNasc" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,
    "nomeMae" TEXT,
    "nomePai" TEXT,
    "cns" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "parentesco" TEXT NOT NULL,
    "valorPlano" DOUBLE PRECISION,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Dependente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complemento" TEXT,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apolice" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "obs" TEXT NOT NULL,

    CONSTRAINT "Apolice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApoliceCliente" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "apiliceId" INTEGER NOT NULL,

    CONSTRAINT "ApoliceCliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corretor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNasc" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "grupoId" INTEGER NOT NULL,

    CONSTRAINT "Corretor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoCorretor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "dono" TEXT NOT NULL,

    CONSTRAINT "GrupoCorretor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boletos" (
    "id" SERIAL NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "emailEnviado" BOOLEAN NOT NULL,
    "telefoneEnviado" BOOLEAN NOT NULL,

    CONSTRAINT "boletos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boletos_clientes" (
    "id" SERIAL NOT NULL,
    "boletoId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "boletos_clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntrevistaMedica" (
    "id" SERIAL NOT NULL,
    "aprovadoDeclinado" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "EntrevistaMedica_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Dependente_cpf_key" ON "Dependente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_cpf_key" ON "Corretor"("cpf");

-- AddForeignKey
ALTER TABLE "ContatoUser" ADD CONSTRAINT "ContatoUser_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_corretorId_fkey" FOREIGN KEY ("corretorId") REFERENCES "Corretor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependente" ADD CONSTRAINT "Dependente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApoliceCliente" ADD CONSTRAINT "ApoliceCliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApoliceCliente" ADD CONSTRAINT "ApoliceCliente_apiliceId_fkey" FOREIGN KEY ("apiliceId") REFERENCES "Apolice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corretor" ADD CONSTRAINT "Corretor_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoCorretor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boletos_clientes" ADD CONSTRAINT "boletos_clientes_boletoId_fkey" FOREIGN KEY ("boletoId") REFERENCES "boletos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boletos_clientes" ADD CONSTRAINT "boletos_clientes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntrevistaMedica" ADD CONSTRAINT "EntrevistaMedica_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
