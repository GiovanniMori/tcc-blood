import { PrismaClient } from "@prisma/client";
import { fakerPT_BR } from "@faker-js/faker";

const prisma = new PrismaClient();

function generateCPF() {
  let cpf = "";
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  if (remainder < 2) {
    remainder = 0;
  } else {
    remainder = 11 - remainder;
  }
  cpf += remainder;
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  if (remainder < 2) {
    remainder = 0;
  } else {
    remainder = 11 - remainder;
  }
  cpf += remainder;
  return cpf;
}
async function main() {
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        email: fakerPT_BR.internet.email(),
        id: fakerPT_BR.string.uuid(),
        name: fakerPT_BR.person.firstName(),
        donor: {
          create: {
            nickname: fakerPT_BR.person.firstName(),
            gender: i % 3 ? "FEMALE" : "MALE",
            cpf: generateCPF(),
            points: Number(fakerPT_BR.finance.amount(0, 1000)),
          },
        },
      },
    });
    await prisma.reward.create({
      data: {
        description: fakerPT_BR.lorem.paragraph(),
        name: fakerPT_BR.commerce.productName(),
        points: Number(fakerPT_BR.finance.amount(0, 1000)),
        imageUrl: fakerPT_BR.image.url(),
      },
    });
    await prisma.hemocenter.create({
      data: {
        address: fakerPT_BR.location.streetAddress(),
        name: fakerPT_BR.company.name(),
        endHour: fakerPT_BR.date.future(),
        startHour: fakerPT_BR.date.past(),
        interval: 30,
        maxCapacity: Number(fakerPT_BR.finance.amount(0, 1000)),
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
