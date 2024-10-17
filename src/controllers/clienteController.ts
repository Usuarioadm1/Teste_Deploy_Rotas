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
        const { contatos, dependentes, apoliceId, corretorId, ...clienteData } = req.body;

        const data: Prisma.ClienteCreateInput = {
            ...clienteData,
            corretor: { connect: { id: corretorId } }, 
            contatos: {
                create: contatos as Prisma.ContatoCreateInput[],
            },
            dependentes: {
                create: dependentes as Prisma.DependenteCreateInput[],
            },
            apoliceCliente: {
                create: [
                    {
                        apolice: { connect: { id: apoliceId } }
                    }
                ]
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
