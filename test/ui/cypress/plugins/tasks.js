const { PrismaClient, truncate, seed } = require('@common-packages/data-access-layer');

let prisma;

const initDb = async () => {
  try {
    prisma = new PrismaClient();
  } catch(error){
    console.error(error);
  }

  return null;
}

const resetDbData = async () => {
  try {
    await truncate(prisma);
    await seed(prisma);
  } catch(error){
    console.error(error)
  }

  return null;
}

const tearDownDb = async () => {
  if(prisma){
    try{
      await prisma.$disconnect();
    } catch(error){
      console.error(error);
    }
  }

  return null;
}

module.exports = {
  initDb,
  resetDbData,
  tearDownDb,
}
