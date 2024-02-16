import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const fulano = await prisma.user.upsert({
    where: { email: 'fulano@email.com' },
    update: {},
    create: {
      email: 'fulano@email.com',
      name: 'Fulano',
      password: "abcd1234",
    },
  })

  const mustang = await prisma.auction.create({
    data: {
      creatorId: fulano.id,
      startingBid: 20,
      actualBid: 20,
      brand: "Ford",
      auctionEndDate: new Date(),
      auctionStartDate: new Date(),
      model: "Mustang",
      year: 1978,
    }
  })

  const fusca = await prisma.auction.create({
    data: {
      creatorId: fulano.id,
      startingBid: 10,
      actualBid: 10,
      brand: "Volkswagen",
      auctionEndDate: new Date(),
      auctionStartDate: new Date(),
      model: "Fusca",
      year: 1976,
    }
  })

  const beltrano = await prisma.user.upsert({
    where: { email: 'beltrano@email.com' },
    update: {},
    create: {
      email: 'beltrano@email.com',
      name: 'Beltrano',
      password: "abcd1234",
    },
  });

  const bids = await prisma.bid.create({
    data: {
      userId: beltrano.id,
      auctionId: fusca.id,
      amount: 11,
    }
  })
  console.log({ user1: fulano, user2: beltrano, mustang, fusca, bids });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });