import { PrismaClient } from "@prisma/client";
import {

  City,
  PropertyType,
  Bhk,
  Purpose,
  Timeline,
  Source,
  Status,
} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 1. Create an admin/demo user (you can adapt this if you have a User model)
  const adminId = "demo-admin-123";
    const buyersData = [
      {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    city: City.Chandigarh,          // ✅ Use enum
    propertyType: PropertyType.Apartment,
    bhk: Bhk.One,
    purpose: Purpose.Buy,
    budgetMin: 3000000,
    budgetMax: 5000000,
    timeline: Timeline.GT6,
    source: Source.Website,
    status: Status.Converted,
    ownerId: 'demo-admin-123',
    tags: ['hot', 'priority'],
  },
      {
    fullName: 'Shravan  kumar',
    email: 'shravan@example.com',
    phone: '8184926683',
    city: City.Mohali,          // ✅ Use enum
    propertyType: PropertyType.Office,
    bhk: Bhk.Two,
    purpose: Purpose.Buy,
    budgetMin: 3000000,
    budgetMax: 5000000,
    timeline: Timeline.M3_6,
    source: Source.Referral,
    status: Status.Dropped,
    ownerId: 'demo-admin-123',
    tags: ['hot', 'priority'],
  },
      {
    fullName: 'ramu Doe',
    email: 'ramu@example.com',
    phone: '9876543240',
    city: City.Other,          // ✅ Use enum
    propertyType: PropertyType.Apartment,
    bhk: Bhk.Three,
    purpose: Purpose.Rent,
    budgetMin: 3000000,
    budgetMax: 5000000,
    timeline: Timeline.M3_6,
    source: Source.Other,
    status: Status.Qualified,
    ownerId: 'demo-admin-123',
    tags: ['hot', 'priority'],
  },
      {
    fullName: 'suj Doe',
    email: 'suj@example.com',
    phone: '9876543212',
    city: City.Panchkula,          // ✅ Use enum
    propertyType: PropertyType.Retail,
    bhk: Bhk.Four,
    purpose: Purpose.Buy,
    budgetMin: 3000000,
    budgetMax: 5000000,
    timeline: Timeline.M0_3,
    source: Source.Walk_in,
    status: Status.Visited,
    ownerId: 'demo-admin-123',
    tags: ['hot', 'priority'],
  },
     {
    fullName: 'venkey Doe',
    email: 'venkey@example.com',
    phone: '9876543211',
    city: City.Zirakpur,          // ✅ Use enum
    propertyType: PropertyType.Plot,
    bhk: Bhk.Studio,
    purpose: Purpose.Rent,
    budgetMin: 3000000,
    budgetMax: 5000000,
    timeline: Timeline.GT6,
    source: Source.Referral,
    status: Status.Visited,
    ownerId: 'demo-admin-123',
    tags: ['hot', 'priority'],
  }
    ];
  // 2. Seed sample buyers
 
 const buyers = [];
 for (const data of buyersData) {
   const buyer = await prisma.buyer.create({ data });
   buyers.push(buyer);
 }



 for (const buyer of buyers) {
   await prisma.buyerHistory.create({
     data: {
       buyerId: buyer.id,
       changedBy: adminId,
       diff: {
         status: { old: null, new: buyer.status },
         budget: { old: null, new: [buyer.budgetMin, buyer.budgetMax] },
       },
     },
   });

   // Optionally, add 1–2 more history events per buyer for testing
 }

 console.log("Seed complete ✅");

}


main()
  .then(async () => {
    console.log("✅ Seed data inserted");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
