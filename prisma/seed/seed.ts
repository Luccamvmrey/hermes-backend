import { PrismaClient } from '@prisma/client';
import { authentication, random } from '../../utils/helpers';

const prisma = new PrismaClient();

async function main() {
  const rootASalt = random();
  const rootAPassword = authentication(rootASalt, '123465');

  // Usuarios
  const rootA = await prisma.usuario.create({
    data: {
      nome: 'rootA',
      senha: rootAPassword,
      salt: rootASalt,
    },
  });

  const rootBSalt = random();
  const rootBPassword = authentication(rootBSalt, '123465');

  const rootB = await prisma.usuario.create({
    data: {
      nome: 'rootB',
      senha: rootBPassword,
      salt: rootBSalt,
    },
  });

  // Empresas
  const premiumIguatu = await prisma.empresa.create({
    data: {
      fantasia: 'PREMIUM CEARA DISTRIBUIDORA DE BEBIDAS',
      razao: 'PREMIUM CEARA DISTRIBUIDORA DE BEBIDAS',
      cnpj: '40974807000140',
      endereco: 'Rua Quinze de Novembro',
      numero: '947',
      bairro: '7 de Setembro',
      cidade: 'Iguatu',
      uf: 'CE',
      cep: '63504015',
      fone: '8821432911',
      fundacao: '2024-11-18T18:06:41.674Z',
      email: 'contato@premiumceara.com.br',
      apelido: 'Premium - Iguatu',
      Usuario: {
        connect: {
          id: rootA.id,
        },
      },
    },
  });

  const premiumTeresina = await prisma.empresa.create({
    data: {
      fantasia: 'PREMIUM TERESINA DISTRIBUIDORA DE BEBIDAS LTDA',
      razao: 'PREMIUM TERESINA DISTRIBUIDORA DE BEBIDAS LTDA',
      cnpj: '06878634000128',
      endereco: 'Quadra Parque Piauí',
      numero: '645',
      bairro: 'Parque Piauí',
      cidade: 'Teresina',
      uf: 'PI',
      cep: '64025050',
      fone: '8688251087',
      fundacao: '2024-11-19T17:34:43.490Z',
      email: 'eveline@premiumteresina.com.br',
      apelido: 'Premium - Teresina',
      Usuario: {
        connect: {
          id: rootA.id,
        },
      },
    },
  });

  const premiumJuazeiroNorte = await prisma.empresa.create({
    data: {
      fantasia: 'PREMIUM CEARA DISTRIBUIDORA DE BEBIDAS LTDA',
      razao: 'PREMIUM CEARA DISTRIBUIDORA DE BEBIDAS LTDA',
      cnpj: '40974807000220',
      endereco: 'Rua Carlos Alberto Mendonça Bezerra',
      numero: '164',
      bairro: 'Antônio Vieira',
      cidade: 'Juazeiro do Norte',
      uf: 'CE',
      cep: '63022040',
      fone: '8821314837',
      fundacao: '2024-11-19T17:34:43.490Z',
      email: 'contato@premiumceara.com.br',
      apelido: 'Premium - Juazeiro do Norte',
      Usuario: {
        connect: {
          id: rootA.id,
        },
      },
    },
  });

  // EmpresaUsuario
  await prisma.empresaUsuario.create({
    data: {
      Usuario: {
        connect: {
          id: rootA.id,
        },
      },
      Empresa: {
        connect: {
          id: premiumIguatu.id,
        },
      },
    },
  });

  await prisma.empresaUsuario.create({
    data: {
      Usuario: {
        connect: {
          id: rootA.id,
        },
      },
      Empresa: {
        connect: {
          id: premiumTeresina.id,
        },
      },
    },
  });

  await prisma.empresaUsuario.create({
    data: {
      Usuario: {
        connect: {
          id: rootA.id,
        },
      },
      Empresa: {
        connect: {
          id: premiumJuazeiroNorte.id,
        },
      },
    },
  });

  await prisma.empresaUsuario.create({
    data: {
      Usuario: {
        connect: {
          id: rootB.id,
        },
      },
      Empresa: {
        connect: {
          id: premiumIguatu.id,
        },
      },
    },
  });

  await prisma.empresaUsuario.create({
    data: {
      Usuario: {
        connect: {
          id: rootB.id,
        },
      },
      Empresa: {
        connect: {
          id: premiumTeresina.id,
        },
      },
    },
  });

  await prisma.empresaUsuario.create({
    data: {
      Usuario: {
        connect: {
          id: rootB.id,
        },
      },
      Empresa: {
        connect: {
          id: premiumJuazeiroNorte.id,
        },
      },
    },
  });

  //Pessoas
  await prisma.pessoa.create({
    data: {
      razao: 'APOLLO TECNOLOGIA E SISTEMAS',
      cnpj: '35147165000175',
      endereco: 'Avenida Eixo Urbano Central',
      numero: '735',
      bairro: 'Centro',
      cidade: 'Camaçari',
      uf: 'BA',
      cep: '42800057',
      email: 'michelapolloerp@gmail.com',
      telefone: '71999376423',
      Empresa: {
        connect: {
          id: premiumIguatu.id,
        },
      },
    },
  });

  // FormasPagamento
  await prisma.formaPagamento.create({
    data: {
      descricao: 'Boleto 15/30/45',
      parcelas: 3,
      intervalo: 15,
      taxa: 0,
      entrada: 0,
      tipo: 'B',
    },
  });

  // ContaContábil
  const contaSoftware = await prisma.contaContabil.create({
    data: {
      nome: 'Software',
    },
  });

  // SubConta
  await prisma.subConta.create({
    data: {
      nome: 'Desenvolvimento',
      ContaContabil: {
        connect: {
          id: contaSoftware.id,
        },
      },
    },
  });

  // Bancos
  await prisma.banco.create({
    data: {
      nome: 'Banco do Brasil',
    },
  });

  await prisma.banco.create({
    data: {
      nome: 'Bradesco',
    },
  });

  await prisma.banco.create({
    data: {
      nome: 'Caixa Econômica Federal',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
