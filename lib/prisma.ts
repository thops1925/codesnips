// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;



// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient();
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
// }

// export default prisma;


// import { PrismaClient } from '@prisma/client'

// // PrismaClient is attached to the `global` object in development to prevent
// // exhausting your database connection limit.
// //
// // Learn more:
// // https://pris.ly/d/help/next-js-best-practices

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma = globalForPrisma.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// export default prisma


// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined
// }

// export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as {
//     prisma: PrismaClient | undefined
// }

// export const prisma =
//     globalForPrisma.prisma ??
//     new PrismaClient({
//         log: ['query'],
//     })

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


// declare global {
//     var prisma: PrismaClient; // This must be a `var` and not a `let / const`
// }

// import { PrismaClient } from "@prisma/client";
// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient();
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
// }

// export default prisma;




import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
