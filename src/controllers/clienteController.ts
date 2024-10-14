// import { PrismaClient, Prisma } from '@prisma/client';
// import { Request, Response } from 'express';

// const prisma = new PrismaClient();

// export const criarCliente = async function (req: Request, res: Response) {
//     try {
//         const {contatos, dependentes, ...clienteData } = req.body;

//         const data : Prisma.ClienteCreateInput = {
//             ...clienteData,
//             contatos : {
//                 create: contatos as Prisma.ContatoCreateInput[],
//             },
//             dependentes: {
//                 create: dependentes as Prisma.DependenteCreateInput[], 
//             },
//         }

//         const novoCliente = await prisma.cliente.create({
//             data,
//         });

//         res.status(201).json(novoCliente);
//     } catch (error) {
//         console.error("Houve um erro ao criar o cliente:", error);
//         res.status(500).json({ error: 'Houve um erro ao criar o cliente' });
//     }
// };

import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const criarCliente = async function (req: Request, res: Response) {
    try {
        console.log("teste")
        const { contatos, dependentes, apolice, corretorId, ...clienteData } = req.body;

        // Primeiro, crie a apólice, se ela não existir
        const novaApolice = await prisma.apolice.create({
            data: {
                nome: apolice.nome,
                obs: apolice.obs,
            },
        });

        const data: Prisma.ClienteCreateInput = {
            ...clienteData,
            operadora: clienteData.operadora,
            corretor: { connect: { id: corretorId } }, // Conectar o corretor existente
            contatos: {
                create: contatos as Prisma.ContatoCreateInput[],
            },
            dependentes: {
                create: dependentes as Prisma.DependenteCreateInput[],
            },
            apoliceCliente: {
                create: {
                    apiliceId: novaApolice.id, // Conectar a nova apólice criada
                },
            },
        };

        const novoCliente = await prisma.cliente.create({
            data,
        });

        res.status(201).json(novoCliente);
    } catch (error) {
        console.error("Houve um erro ao criar o cliente:", error);
        res.status(500).json({ error: 'Houve um erro ao criar o cliente' });
    }
};


// import { PrismaClient, Prisma } from '@prisma/client';
// import { Request, Response } from 'express';

// const prisma = new PrismaClient();

// export const criarCliente = async function (req: Request, res: Response) {
//     try {
//         const { contatos, dependentes, ...clienteData } = req.body;

//         const data: Prisma.ClienteCreateInput = {
//             ...clienteData,
//             operadora :{

//             },
//             corretorId:{
                
//             },
//             contatos: {
//                 create: contatos as Prisma.ContatoCreateInput[], // Certifique-se de que ContatoCreateInput esteja correto
//             },
//             dependentes: {
//                 create: dependentes as Prisma.DependenteCreateInput[], // Certifique-se de que DependenteCreateInput esteja correto
//             },
//         };

//         const novoCliente = await prisma.cliente.create({
//             data,
//         });

//         res.status(201).json(novoCliente);
//     } catch (error) {
//         console.error("Houve um erro ao criar o cliente:", error);
//         res.status(500).json({ error: 'Houve um erro ao criar o cliente' });
//     }
// };
